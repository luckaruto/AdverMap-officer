import Modal from "@mui/material/Modal";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { requiredError } from "constants/validation";
import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormMode, SpaceFormat, SpaceType, SurfaceFormat } from "constants/types";
import Button from "@mui/material/Button";
import BasicSelect from "components/Select/BasicSelect";
import { formatDateToUNIX, formatFormat, plannedFormat, typeFormat } from "utils/format";
import BasicInput from "components/Input/BasicInput";
import ImageInput from "components/Input/ImageInput";
import { useState } from "react";
import { setLoading, setSnackbar } from "redux/appSlice";
import { uploadImgToFireBase } from "utils/firebase";
import Heading1 from "components/Text/Heading1";
import { SpaceService } from "services/space/SpaceService";
import { fetchSpaces } from "redux/spaceSlice";
import { testParams } from "services/apis/constants";
import { SurfaceAllowanceService } from "services/surfaceAllowance/SurfaceAllowanceService";
import { useNavigate } from 'react-router-dom';
import { PAGE } from "components/constants";

const SurfaceAllowanceForm = (props) => {
  const { open, handleClose } = props;

  const [images, setImages] = useState([]);

  // @ts-ignore
  const { token, snackbar } = useSelector((state) => state.appState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    content: yup.string().required(requiredError.default),
    companyName: yup.string().required(requiredError.default),
    companyInfo: yup.string().required(requiredError.default),
    companyEmail: yup.string().email().required(requiredError.default),
    companyPhone: yup.string().required(requiredError.default),
    companyAddress: yup.string().required(requiredError.default),
    format: yup.string().required(requiredError.default),
    width: yup.number().required(requiredError.default),
    height: yup.number().required(requiredError.default),
    spaceId: yup.number().required(requiredError.default),
    startDate: yup.date().required(requiredError.default),
    endDate: yup.date().required(requiredError.default),
  });

  const method = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, setValue, reset } = method;

  const onSubmit = async (data) => {
    let urls = [];
    dispatch(setLoading(true));
    try {
      //handle upload imgs
      if (images.length <= 2 && images.length > 0) {
        const resUrls = await uploadImgToFireBase(images);
        urls = [...resUrls];
      }

      const req = { ...data, imgUrl: [...urls],startDate:formatDateToUNIX(data.startDate),endDate:formatDateToUNIX(data.endDate) };
	  console.log(req);
      let res;

      //handle Create
      res = await SurfaceAllowanceService.create(req, token);

      //handleSuccess
      dispatch(setSnackbar({ status: "success", message: res }));
      
	  navigate(PAGE.SURFACE_ALLOWANCE.path);
      handleClose();
    } catch (error) {
      dispatch(setSnackbar({ status: "error", message: error }));
    } finally {
      dispatch(setLoading(false));
      reset(undefined, { keepDirtyValues: true });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] ">
        <FormProvider {...method}>
          <form
            className="p-6 rounded-lg bg-blue-200 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <Heading1 className="mb-4">Thông tin cấp phép</Heading1>
            <div className=" flex flex-row gap-2 justify-center">
              <div className="flex flex-col items-center gap-4">
                <BasicInput name="companyName" label="Tên công ty" />
                <BasicInput name="companyInfo" label="Thông tin công ty" />
                <BasicInput name="companyEmail" label="Email công ty" />
                <BasicInput name="companyPhone" label="Số điện thoại công ty" />
                <BasicInput name="companyAddress" label="Địa chỉ công ty" />

                <BasicInput name="spaceId" type="number" label="Space" />
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-full flex gap-2">
                  <BasicInput name="width" type="number" label="Chiều rộng" />
                  <BasicInput name="height" type="number" label="Chiều dài" />
                </div>
                <BasicInput name="content" label="Nội dung" />
                <BasicInput type="date" name="startDate" label="Ngày bắt đầu" />
                <BasicInput type="date" name="endDate" label="Ngày kết thúc" />

                <BasicSelect
                  label="Hình thức"
                  name="format"
                  choices={Object.values(SurfaceFormat)}
                  format={formatFormat}
                />
                <ImageInput setImages={setImages} existData={null} />
              </div>
            </div>
            <div className="flex flex-row justify-center mt-4">
              <Button variant="outlined" type="submit">
                Yêu cầu cấp phép
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

SurfaceAllowanceForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
SurfaceAllowanceForm.defaultProps = {
  open: false,
  handleClose: () => {},
};

export default SurfaceAllowanceForm;
