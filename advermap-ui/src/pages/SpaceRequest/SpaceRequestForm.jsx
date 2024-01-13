import Modal from "@mui/material/Modal";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { requiredError } from "constants/validation";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormMode, SpaceFormat, SpaceType } from "constants/types";
import Button from "@mui/material/Button";
import BasicSelect from "components/Select/BasicSelect";
import { formatFormat, plannedFormat, typeFormat } from "utils/format";
import BasicInput from "components/Input/BasicInput";
import ImageInput from "components/Input/ImageInput";
import { useState } from "react";
import { setLoading, setSnackbar } from "redux/appSlice";
import { uploadImgToFireBase } from "utils/firebase";
import Heading1 from "components/Text/Heading1";
import { SpaceService } from "services/space/SpaceService";
import { testParams } from "services/apis/constants";
import { fetchSpaceRequest } from "redux/spaceRequestSlice";
import { useNavigate } from "react-router-dom";
import { PAGE } from "components/constants";

const SpaceRequestForm = (props) => {
  const [mode, setMode] = useState(FormMode.CREATE);

  const { open, handleClose, existData } = props;

  const [images, setImages] = useState([]);

  // @ts-ignore
  const { token } = useSelector((state) => state.appState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    address: yup.string().required(requiredError.address),
    longitude: yup.number().required(requiredError.default),
    latitude: yup.number().required(requiredError.default),
    type: yup.string().required(requiredError.default),
    format: yup.string().required(requiredError.default),
    planned: yup.boolean().required(requiredError.default),
    wardId: yup.number().required(requiredError.default),
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

      const req = { ...data, imgUrl: [...urls] };
      let res;

      if (mode == FormMode.CREATE) {
        //handle Create
        // res = await SpaceService.create(req, token);
      } else {
        //handle request edit
        const { id } = existData;
        res = await SpaceService.requestEdit(id, req, token);
      }

      //handleSuccess
      dispatch(setSnackbar({ status: "success", message: res }));
      // @ts-ignore
      navigate(PAGE.SPACE_REQUEST.path);
      handleClose();
    } catch (error) {
      dispatch(setSnackbar({ status: "error", message: error }));
    } finally {
      dispatch(setLoading(false));
      reset(undefined, { keepDirtyValues: true });
    }
  };

  const setExistData = () => {
    setValue("address", existData.address);
    setValue("longitude", +existData.longitude);
    setValue("latitude", +existData.latitude);
    setValue("type", existData.type);
    setValue("format", existData.format);
    setValue("planned", !!existData.planned);
    setValue("wardId", +existData.ward?.id);
  };

  //handle Load data when edit
  useEffect(() => {
    if (existData) {
      setMode((prev) => FormMode.EDIT);
      setExistData();
    } else {
      setMode((prev) => FormMode.CREATE);
      reset(undefined, { keepDirtyValues: true });
    }
  }, [existData, setValue]);

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
            <Heading1 className="mb-4">Thông tin địa điểm</Heading1>
            <div className=" flex flex-row gap-2 justify-center">
              <div className="flex flex-col items-center gap-4">
                <BasicInput name="address" label="Địa chỉ" />
                <div className="w-full flex gap-2">
                  <BasicInput name="longitude" type="number" label="Kinh độ" />
                  <BasicInput name="latitude" type="number" label="Vĩ độ" />
                </div>
                <BasicSelect
                  label="Loại"
                  name="type"
                  choices={Object.values(SpaceType)}
                  format={typeFormat}
                />

                <BasicSelect
                  label="Hình thức"
                  name="format"
                  choices={Object.values(SpaceFormat)}
                  format={formatFormat}
                />

                <BasicInput name="wardId" type="number" label="Phường" />

                <BasicSelect
                  label="Trạng thái"
                  name="planned"
                  choices={[true, false]}
                  format={plannedFormat}
                />
              </div>

              <div className="flex flex-col items-center gap-4">
                <ImageInput
                  setImages={setImages}
                  existData={existData?.imgUrl || null}
                />
              </div>
            </div>
            <div className="flex flex-row justify-center mt-4">
              <Button variant="contained" type="submit">
                Request Edit
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

SpaceRequestForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  existData: PropTypes.object.isRequired,
};
SpaceRequestForm.defaultProps = {
  open: false,
  handleClose: () => {},
  existData: null,
};

export default SpaceRequestForm;
