import Modal from "@mui/material/Modal";
import React, {useEffect} from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import {requiredError} from "constants/validation";
import {FormProvider, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormMode, SpaceType, UserRole} from "constants/types";
import Button from "@mui/material/Button";
import BasicSelect from "components/Select/BasicSelect";
import {UserRoleFormat} from "utils/format";
import BasicInput from "components/Input/BasicInput";
import {useState} from "react";
import {setLoading, setSnackbar} from "redux/appSlice";
import Heading1 from "components/Text/Heading1";
import {testParams} from "services/apis/constants";
import {UserService} from "../../services/user/UserService";
import {fetchUser} from "../../redux/userSlice";
import WardsSelectBox from "./SelectArea";
import {WardService} from "../../services/ward/WardService";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Stack} from "@chakra-ui/react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";
import {DistrictService} from "../../services/district/DistrictService";
import DistrictsSelectBox from "./SelectDistrictArea";

const UserForm = (props) => {

    const [mode, setMode] = useState(FormMode.CREATE);
    const {open, handleClose, existData} = props;
    const [role, setRole] = useState(null);

    const managementWardIds = (existData?.managementWards && existData?.managementWards.length > 0) ? (existData.managementWards.map((data) => {
        return data.id
    })) : []
    const [wardIds, setWardIds] = React.useState(managementWardIds);

    const managementDistrictIds = (existData?.managementDistricts && existData?.managementDistricts.length > 0) ? (existData.managementDistricts.map((data) => {
        return data.id
    })) : []
    const [districtIds, setDistrictIds] = React.useState(managementDistrictIds);

    // @ts-ignore
    const {token, snackbar} = useSelector((state) => state.appState);

    const dispatch = useDispatch();

    const [wards, setWards] = React.useState([])
    const [districts, setDistricts] = React.useState([])

    useEffect(() => {
        if (!wards || wards.length == 0) {
            WardService.fetchWithParams(null, token).then(data => {
                setWards(data);
                setWardIds(data.map((d) => d.id))
            });
        }
        if (!districts || districts.length == 0) {
            DistrictService.fetchWithParams(null, token).then(data => {
                setDistricts(data);
                setDistrictIds(data.map((d) => d.id))
            });
        }

    }, []);


    const userSchema = yup.object().shape({
        name: yup.string().required(requiredError.default),
        role: yup.string().required(requiredError.default),
        email: yup.string().required(requiredError.email),
        phone: yup.string().required(requiredError.phone),
        birthday: yup.date().required(requiredError.default),
        password: yup.string(),
    });

    const method = useForm({
        mode: "onSubmit",
        resolver: yupResolver(userSchema),
    });

    const {handleSubmit, setValue, reset} = method;

    const onSubmit = async (data) => {
        dispatch(setLoading(true));
        try {
            var req = {...data};
            req.birthday = new Date(req.birthday).valueOf();
            req.managementWards = wardIds;
            req.managementDistricts = districtIds;

            console.log(req)

            let res;
            if (mode == FormMode.CREATE) {
                //handle Create
                res = await UserService.create(req, token);
            } else {
                //handle Edit
                const {id} = existData;
                res = await UserService.edit(id, req, token);
            }

            //handleSuccess
            dispatch(setSnackbar({status: "success", message: res}));
            // @ts-ignore
            dispatch(fetchUser({testParams, token}));
            handleClose();
        } catch (error) {
            dispatch(setSnackbar({status: "error", message: error}));
        } finally {
            dispatch(setLoading(false));
            reset(undefined, {keepDirtyValues: true});
        }
    };

    const setExistData = () => {
        setValue("name", existData?.name);
        setValue("role", existData?.role);
        setValue("email", existData?.email);
        setValue("phone", existData?.phone);
        setValue("birthday", existData?.birthday.substring(0, 10));
        setValue("password", existData?.password);
        setValue("managementWards", existData?.managementWards);
        setValue("managementDistricts", existData?.managementDistricts);
    };

    //handle Load data when edit
    useEffect(() => {
        if (existData) {
            setMode((prev) => FormMode.EDIT);
            setExistData();
        } else {
            setMode((prev) => FormMode.CREATE);
            reset(undefined, {keepDirtyValues: true});
        }
    }, [existData, setValue]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] ">
                <FormProvider {...method}>
                    <form
                        className="p-6 rounded-lg bg-blue-200 "
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Heading1 className="mb-4">Thông tin tài khoản</Heading1>
                        <div className=" flex flex-row gap-2 justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <BasicInput name="name" label="Họ tên"/>

                                <div className="w-full flex gap-2">
                                    <BasicInput name="email" label="Email" type="email"/>
                                    <BasicInput name="phone" label="Số điện thoại"/>
                                </div>

                                <BasicInput name="birthday" label="Ngày sinh" type="date"/>
                                <BasicInput name="password" label="Mật khẩu" type="password"/>
                                <BasicSelect
                                    label="Chức vụ"
                                    name="role"
                                    choices={Object.values(UserRole)}
                                    format={UserRoleFormat}
                                />

                                <WardsSelectBox name={"managementWards"} existWards={wardIds} setManagement={setWardIds}></WardsSelectBox>
                                <DistrictsSelectBox name={"managementDistricts"} existDistricts={districtIds} setManagement={setDistrictIds}></DistrictsSelectBox>

                            </div>
                        </div>
                        <div className="flex flex-row justify-center mt-4">
                            <Button variant="outlined" type="submit">
                                {mode}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </Modal>
    );
};

UserForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    existData: PropTypes.object,
};
UserForm.defaultProps = {
    open: false,
    handleClose: () => {
    },
    existData: null,
};

export default UserForm;
