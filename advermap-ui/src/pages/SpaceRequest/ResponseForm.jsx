import Modal from "@mui/material/Modal";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { requiredError } from "constants/validation";
import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormMode, RequestState, SpaceFormat, SpaceType } from "constants/types";
import Button from "@mui/material/Button";
import BasicSelect from "components/Select/BasicSelect";
import { formatFormat, plannedFormat, stateFormat, typeFormat } from "utils/format";
import BasicInput from "components/Input/BasicInput";
import ImageInput from "components/Input/ImageInput";
import { useState } from "react";
import { setLoading, setSnackbar } from "redux/appSlice";
import { uploadImgToFireBase } from "utils/firebase";
import Heading1 from "components/Text/Heading1";
import { SpaceService } from "services/space/SpaceService";
import { fetchSpaces } from "redux/spaceSlice";
import { testParams } from "services/apis/constants";

const ResponseForm = (props) => {
  const { open, handleClose, existData,updated,responseService } = props;

  // @ts-ignore
  const { token, snackbar } = useSelector((state) => state.appState);

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    response: yup.string(),
    state: yup.string().required(requiredError.default),
  });

  const method = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, setValue, reset } = method;

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    try {
      const req = { ...data };
	  const {id}=existData
      let res;

      //handle res
      res = await responseService(id,req, token);

      //handleSuccess
      dispatch(setSnackbar({ status: "success", message: res }));
      updated()
      handleClose();
    } catch (error) {
      dispatch(setSnackbar({ status: "error", message: error }));
    } finally {
      dispatch(setLoading(false));
      reset(undefined, { keepDirtyValues: true });
    }
  };

  const setExistData = () => {
    setValue("response", existData.response);
    setValue("state", existData.state);
  };

  //handle Load data when edit
  useEffect(() => {
    if (existData) {
      setExistData();
    } else {
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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] ">
        <FormProvider {...method}>
          <form
            className="p-6 rounded-lg bg-blue-200 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <Heading1 className="mb-4">Thông tin phản hồi</Heading1>
            <div className=" flex flex-row gap-2 justify-center">
              <div className="flex flex-col items-center gap-4">
                <BasicInput name="response" label="Nội dung phản hồi" />
                
                <BasicSelect
                  label="Ghi chú"
                  name="state"
                  choices={Object.values(RequestState)}
                  format={stateFormat}
                />

              </div>
              
            </div>
            <div className="flex flex-row justify-center mt-4">
              <Button variant="outlined" type="submit">
                Xác nhận
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

ResponseForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  updated: PropTypes.func.isRequired,
  responseService: PropTypes.func.isRequired,
  existData: PropTypes.object,
};
ResponseForm.defaultProps = {
  open: false,
  handleClose: () => {},
  updated: () => {},
  existData: null,
  responseService:SpaceService.responseRequest
};

export default ResponseForm;
