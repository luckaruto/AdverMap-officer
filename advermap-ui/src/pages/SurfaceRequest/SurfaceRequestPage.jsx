import React from "react";
import DataTable from "../../components/DataTable";
import { useState, useEffect } from "react";
import { SpaceService } from "services/space/SpaceService";
import { PAGE } from "components/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSnackbar } from "redux/appSlice";
import { useNavigate } from "react-router-dom";
import Heading1 from "components/Text/Heading1";
import Button from "@mui/material/Button";
import ConfirmModal from "components/ConfirmModal/ConfirmModal";

import { testParams } from "services/apis/constants";
import {
  formatFormatUI,
  plannedFormatUI,
  stateFormatUI,
  typeFormatUI,
} from "utils/formatToUI";

import { fetchSurfaceRequest } from "redux/surfaceRequestSlice";

import ResponseForm from "../SpaceRequest/ResponseForm";
import { formatDateTime } from "utils/format";
import { SurfaceServices } from "services/surface/SurfaceService";

const columns = [
  { id: "id", label: "ID" },
  {
    id: "space",
    label: "Địa chỉ",
    minWidth: 100,
    format: (value) => value.address,
  },

  {
    id: "format",
    label: "Hình thức",
    minWidth: 170,
    format: formatFormatUI,
  },

  {
    id: "user",
    label: "Người yêu cầu",
    minWidth: 100,
    format: (value) => value?.name || "Không có",
  },

  {
    id: "state",
    label: "Trạng thái",
    minWidth: 170,
    format: stateFormatUI,
  },

  {
    id: "response",
    label: "Phản hồi",
    minWidth: 200,
    format: (value) => {
      if (value) return value;
      return "Chưa có";
    },
  },
  {
    id: "reportDate",
    label: "Ngày yêu cầu",
    minWidth: 200,
    format: (value) => {
      if (value) return formatDateTime(value);
    },
  },
];

const SurfaceRequestPage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openResponseForm, setOpenResponseForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // @ts-ignore
  const { token } = useSelector((state) => state.appState);

  // @ts-ignore
  const { entities, error, loading } = useSelector(
    // @ts-ignore
    (state) => state.surfaceRequest
  );

  const handleOpenResponseForm = () => setOpenResponseForm(true);
  const handleCloseResponseForm = () => setOpenResponseForm(false);

  // console.log(selectedRow);

  const handleClickResponse = () => {
    handleOpenResponseForm();
  };
  const handleClickDelete = () => {
    setOpenConfirm(true);
  };

  const handleClickNavigate = () => {
    const { surface } = selectedRow;
    navigate(PAGE.SURFACE.path, { state: surface });
  };

  const fetchData = () => {
    // @ts-ignore
    dispatch(fetchSurfaceRequest({ testParams, token }));
  };

  const handleClickRow = (row) => setSelectedRow(row);

  const handleDelete = async () => {
    const { id } = selectedRow;
    dispatch(setLoading(true));
    try {
      const res = await SurfaceServices.cancelRequest(id, token);
      dispatch(setSnackbar({ status: "success", message: res }));
      // @ts-ignore
      dispatch(fetchSurfaceRequest({ testParams, token }));
    } catch (error) {
      dispatch(setSnackbar({ status: "error", message: error }));
    } finally {
      setSelectedRow(null);
      dispatch(setLoading(false));
      setOpenConfirm(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);
  console.log(entities);

  return (
    <>
      <div className="max-w-[1400px] m-auto flex flex-col gap-4">
        <Heading1>Danh sách yêu cầu chỉnh sửa bảng quảng cáo</Heading1>
        <div className="flex gap-6 ml-auto">
          <Button
            variant="outlined"
            color="success"
            disabled={!selectedRow}
            onClick={handleClickNavigate}
          >
            Tới thông tin bảng quảng cáo
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={handleClickResponse}
            disabled={!selectedRow}
          >
            Phản hồi
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClickDelete}
            disabled={!selectedRow}
          >
            XÓa
          </Button>
        </div>

        {entities && entities.length > 0 ? (
          <DataTable
            columns={columns}
            rows={entities}
            onClickDetail={() => {}}
            onClickRow={handleClickRow}
            selectedRow={selectedRow}
          />
        ) : (
          <p className="text-center text-blue-400 text-lg font-bold">
            No data ...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 text-lg font-bold">{error}</p>
        )}
        {/* <SpaceRequestForm
          open={openRequestForm}
          handleClose={handleCloseRequestForm}
          existData={selectedRow}
        /> */}
        <ResponseForm
          open={openResponseForm}
          handleClose={handleCloseResponseForm}
          existData={selectedRow}
          updated={fetchData}
          responseService={SurfaceServices.responseRequest}
        />
        <ConfirmModal
          open={openConfirm}
          handleClose={() => setOpenConfirm(false)}
          handleSubmit={handleDelete}
          message="Xóa yêu cầu này"
        />
      </div>
    </>
  );
};

export default SurfaceRequestPage;
