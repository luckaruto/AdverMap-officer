import Modal from "@mui/material/Modal";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { requiredError } from "constants/validation";
import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormMode, SurfaceFormat } from "constants/types";
import Button from "@mui/material/Button";
import BasicSelect from "components/Select/BasicSelect";
import { formatFormat, plannedFormat, typeFormat } from "utils/format";
import BasicInput from "components/Input/BasicInput";
import ImageInput from "components/Input/ImageInput";
import { useState } from "react";
import { setLoading, setSnackbar } from "redux/appSlice";
import { uploadImgToFireBase } from "utils/firebase";
import Heading1 from "components/Text/Heading1";
import { SurfaceServices } from "services/surface/SurfaceService";
import { fetchSurfaces } from "redux/surfaceSlice";
import { testParams } from "services/apis/constants";
import { ReportService } from "services/report/ReportService";

const SurfaceForm = (props) => {
  const [mode, setMode] = useState(FormMode.CREATE);
  const { open, handleClose, existData } = props;

  const [images, setImages] = useState([]);

  // @ts-ignore
  const { token, snackbar } = useSelector((state) => state.appState);

  const dispatch = useDispatch();

  const surfaceSchema = yup.object().shape({
    // address: yup.string().required(requiredError.address),
    surface_id: yup.number().required(requiredError.default),
    address: yup.string().required(requiredError.default),
    userAddress: yup.string().required(requiredError.default),
    ward_id: yup.number().required(requiredError.default),
    longitude: yup.number().required(requiredError.default),
    latitude: yup.number().required(requiredError.default),
    email: yup.string().required(requiredError.default),
    content: yup.string().required(requiredError.default),
    space_id: yup.number().required(requiredError.default),
    phone: yup.string().required(requiredError.default),
    report_type_id: yup.number().required(requiredError.default),
    name: yup.string().required(requiredError.default),


  });

  const method = useForm({
    mode: "onSubmit",
    resolver: yupResolver(surfaceSchema),
  });


  const { handleSubmit, setValue, reset } = method;

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
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
      if (mode === FormMode.CREATE) {
        // handle Create
        console.log("Creating surface...");
        res = await ReportService.create(req, token);
      } else {
        // handle Edit
        console.log("Editing surface...");
        const { id } = existData;
        res = await ReportService.edit(id, req, token);
      }
  
      console.log("API Response:", res);
  
      // handleSuccess
      dispatch(setSnackbar({ status: "success", message: res }));
      // @ts-ignore
      dispatch(fetchSurfaces({ testParams, token }));
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      dispatch(setSnackbar({ status: "error", message: error }));
    } finally {
      dispatch(setLoading(false));
      reset(undefined, { keepDirtyValues: true });
    }
  };
  

  const setExistData = () => {
    setValue("address", existData.surface.space.address);
    setValue("content", existData.content);
    setValue("space_id", +existData.surface.space.id);
    setValue("surface_id", +existData.surface.id);
    setValue("ward_id", +existData.ward_id);
    setValue("email", existData.email);
    setValue("phone", existData.phone);
    setValue("userAddress", existData.userAddress);
    setValue("longitude", +existData.longitude);
    setValue("name", existData.name);
    setValue("latitude", +existData.latitude);
    setValue("report_type_id", +existData.report_type_id);
  };


  // handle Load data when editing
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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px]"
       style={{ maxHeight: '800px', overflowY: 'auto' }}>
        <FormProvider {...method}>
          <form
            className="p-4 rounded-lg bg-blue-200"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Heading1 className="mb-4">Thông tin địa điểm</Heading1>
            <div className="flex flex-row gap-2 justify-center">
              <div className="flex flex-col items-center gap-4">
                {/* <BasicInput name="address" label="Địa chỉ" /> */}
                <div className="w-full flex gap-2">
                  <BasicInput name="width" type="number" label="Kinh Độ" />
                  <BasicInput name="height" type="number" label="Vĩ Độ" />
                </div>
                <BasicInput name="userAddress" label="Địa Chi Người Gửi" />
                <BasicInput name="name" label="name" />
                <BasicInput name="address" label="Địa chỉ báo cáo" />
                <BasicInput name="content" label="Nội dung" />
                <BasicInput name="email" type="email" label="Email" />
                <BasicInput name="phone" label="phone" />
                <BasicInput name="surface_id" type="number" label="surface_id" />
                <BasicInput name="ward_id" type="number" label="ward_id" />
                <BasicInput name="space_id" type="number" label="space_id" />
                <BasicInput name="report_type_id" type="number" label="report_type_id" />

              </div>

              <div className="flex flex-col items-center gap-4">
                <ImageInput
                  setImages={setImages}
                  existData={existData?.imgUrl || null}
                />
              </div>
            </div>
            <div className="flex flex-row justify-center mt-4">
              <Button variant="outlined" type="submit">
                {mode === FormMode.CREATE ? "Create" : "Edit"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

SurfaceForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  existData: PropTypes.object,
};

SurfaceForm.defaultProps = {
  open: false,
  handleClose: () => {},
  existData: null,
};

export default SurfaceForm;
