import Modal from "@mui/material/Modal";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { requiredError } from "constants/validation";
import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormMode, SpaceFormat, SpaceType } from "constants/types";
import Button from "@mui/material/Button";
import BasicSelect from "components/Select/BasicSelect";
import { formatFormat, plannedFormat, typeFormat } from "utils/format";
import BasicInput from "components/Input/BasicInput";
import ImageInput from "components/Input/ImageInput";
import { useState } from "react";
import { setLoading } from "redux/appSlice";
import { uploadImgToFireBase } from "utils/firebase";
import Heading1 from "components/Text/Heading1";

const SpaceForm = (props) => {
  const [mode, setMode] = useState(FormMode.CREATE);
  const { open, handleClose, existData } = props;

  const toast = useToast();

  const [images, setImages] = useState([]);

  // @ts-ignore
  const { token } = useSelector((state) => state.appState);

  const dispatch = useDispatch();

  const spaceSchema = yup.object().shape({
    address: yup.string().required(requiredError.address),
    longitude: yup.number().required(requiredError.default),
    latitude: yup.number().required(requiredError.default),
    type: yup.string().required(requiredError.default),
    format: yup.string().required(requiredError.default),
    isPlanned: yup.boolean().required(requiredError.default),
    wardId: yup.number().required(requiredError.default),
  });

  const method = useForm({
    mode: "onSubmit",
    resolver: yupResolver(spaceSchema),
  });

  const { handleSubmit, setValue, reset } = method;

  const onSubmit = async (data) => {
    let urls = [];
    dispatch(setLoading(true));
    try {
      if (images.length <= 2 && images.length > 0) {
        const resUrls = await uploadImgToFireBase(images);
        urls = [...resUrls];
      }
    } catch (error) {
      toast({ status: "error", description: "Error when upload images" });
    } finally {
      console.log({ ...data, urls });
      dispatch(setLoading(false));
    }
  };

  const setExistData = () => {
    setValue("address", existData.address);
    setValue("longitude", +existData.longitude);
    setValue("latitude", +existData.latitude);
    setValue("type", existData.type);
    setValue("format", existData.format);
    setValue("isPlanned", !existData.isPlanned);
    setValue("wardId", +existData.ward?.id);
  };

  useEffect(() => {
    if (existData) {
      setMode((prev) => FormMode.EDIT);
      setExistData()
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
            <Heading1 className="mb-4">
              Thông tin địa điểm
            </Heading1>
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
                  name="isPlanned"
                  choices={[true, false]}
                  format={plannedFormat}
                />
              </div>

              <div className="flex flex-col items-center gap-4">
                <ImageInput setImages={setImages} existData={existData?.imgUrl||null} />
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

SpaceForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  existData: PropTypes.object,
};
SpaceForm.defaultProps = {
  open: false,
  handleClose: () => {},
  existData: null,
};

export default SpaceForm;
