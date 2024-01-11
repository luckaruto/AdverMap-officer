import Modal from "@mui/material/Modal";
import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { requiredError } from "constants/validation";
import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { SpaceFormat, SpaceType } from "constants/types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import BasicSelect from "components/Select/BasicSelect";
import { type } from "@testing-library/user-event/dist/type";
import { formatFormat, plannedFormat, typeFormat } from "utils/format";

const convertToArray = (object) => {
  var result = [];
};

const SpaceForm = (props) => {
  const { open, handleClose } = props;

  const toast = useToast();

  // @ts-ignore
  const { token } = useSelector((state) => state.appState);

  const dispatch = useDispatch();

  const spaceSchema = yup.object().shape({
    address: yup.string().required(requiredError.address),
    longitude: yup.number().required(requiredError.default),
    latitude: yup.number().required(requiredError.default),
    type: yup.string().required(requiredError.default),
    format: yup.string().required(requiredError.default),
    // imgUrl: yup.array(),
    isPlanned: yup.boolean().required(requiredError.default),
    wardId: yup.number().required(requiredError.default),
  });

  const method = useForm({
    // defaultValues: {
    //   address: "",
    //   longitude: null,
    //   latitude: null,
    //   type: SpaceType.BUS_SHELTER,
    //   format: SpaceFormat.COMMERCIAL_ADS,
    // //   imgUrl: [],
    //   isPlanned: false,
    //   wardId: null,
    // },
    mode: "onSubmit",
    resolver: yupResolver(spaceSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = method;

  const onSubmit = (data) => console.log(data);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="h-full w-full  flex justify-center items-center">
        <FormProvider {...method}>
          <form
            className="p-4 rounded-lg bg-blue-200 min-w-[50%] flex flex-col items-center gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              label="Địa chỉ"
              // defaultValue="Hello World"
              fullWidth
              {...register("address")}
            />
            {errors.address && <p>{errors.address.message}</p>}
            <TextField
              type="number"
              label="Kinh độ"
              fullWidth
              {...register("longitude")}
            />
            {errors.longitude && <p>{errors.longitude.message}</p>}
            <TextField
              type="number"
              label="Vĩ độ"
              fullWidth
              {...register("latitude")}
            />
            {errors.latitude && <p>{errors.latitude.message}</p>}
            <BasicSelect
              label="Loại"
              name="type"
              items={Object.values(SpaceType)}
              format={typeFormat}
            />

            <BasicSelect
              label="Hình thức"
              name="format"
              items={Object.values(SpaceFormat)}
              format={formatFormat}
            />

            <TextField
              label="Phường"
              type="number"
              fullWidth
              {...register("wardId")}
            />
            {errors.wardId && <p>{errors.wardId.message}</p>}

            <BasicSelect
              label="Trạng thái"
              {...register("isPlanned")}
              items={[true, false]}
              format={plannedFormat}
            />

            {/* <TextField
            label="Ảnh"
            // defaultValue="Hello World"
            fullWidth
            {...register("imgUrl")}
          /> */}
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

SpaceForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
SpaceForm.defaultProps = {
  open: false,
  handleClose: () => {},
};

export default SpaceForm;
