import Heading1 from "components/Text/Heading1";
import React from "react";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { fetchSurfaceAllowance } from "redux/surfaceAllowanceSlice";
import { setLoading, setSnackbar } from "redux/appSlice";
import DataTable from "components/DataTable";
import SurfaceInfo from "pages/Surface/SurfaceInfo";
import { formatFormatUI, stateFormatUI } from "utils/formatToUI";
import SurfaceAllowanceInfo from "./SurfaceAllowanceInfo";
import ResponseForm from "pages/SpaceRequest/ResponseForm";
import { SurfaceAllowanceService } from "services/surfaceAllowance/SurfaceAllowanceService";
import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { SurfaceServices } from "services/surface/SurfaceService";

const columns = [
  { id: "id", label: "ID" },
  {
    id: "space",
    label: "Địa chỉ",
    minWidth: 200,
    format: (value) => value.address,
  },

  {
    id: "height",
    label: "Chiều dài",
    minWidth: 150,
  },
  {
    id: "width",
    label: "Chiều rộng",
    minWidth: 150,
  },
  {
    id: "format",
    label: "Hình thức",
    minWidth: 170,
    format: formatFormatUI,
  },
  {
    id: "content",
    label: "Nội dung",
    minWidth: 200,
  },
  {
    id: "state",
    label: "Trạng thái",
    minWidth: 150,
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
];

const SurfaceAllowancePage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openResponseForm, setOpenResponseForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, snackbar, params, tokenPayload } = useSelector(
    // @ts-ignore
    (state) => state.appState
  );

  const { entities, error, loading } = useSelector(
    // @ts-ignore
    (state) => state.surfaceAllowances
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

  const handleClickRow = (row) => setSelectedRow(row);

  const handleDelete = async () => {
    const { id } = selectedRow;
    dispatch(setLoading(true));
    try {
      const res = await SurfaceAllowanceService.cancelRequest(id, token);
      dispatch(setSnackbar({ status: "success", message: res }));
      fetchData();
    } catch (error) {
      dispatch(setSnackbar({ status: "error", message: error }));
    } finally {
      setSelectedRow(null);
      dispatch(setLoading(false));
      setOpenConfirm(false);
    }
  };

  const fetchData = () => {
    const reqParams = params.content;
    // @ts-ignore
    dispatch(fetchSurfaceAllowance({ reqParams, token }));
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);

  return (
    <div className="max-w-[1400px] m-auto flex flex-col gap-4">
      <Heading1>Danh sách Cấp phép</Heading1>
      <div className="flex gap-6 ml-auto">
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
      {selectedRow && <SurfaceAllowanceInfo data={selectedRow} />}
      <ResponseForm
        open={openResponseForm}
        handleClose={handleCloseResponseForm}
        existData={selectedRow}
        updated={fetchData}
        responseService={SurfaceAllowanceService.responseRequest}
      />
      <ConfirmModal
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        handleSubmit={handleDelete}
        message="Xóa yêu cầu này"
      />
    </div>
  );
};

export default SurfaceAllowancePage;
