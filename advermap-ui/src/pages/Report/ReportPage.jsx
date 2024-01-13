import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSnackbar } from "redux/appSlice";
import { SurfaceServices } from "services/surface/SurfaceService";
import DataTable from "components/DataTable";
import { PAGE } from "components/constants";
import { useNavigate } from "react-router-dom";
import { ReportService } from "services/report/ReportService";
import Button from "@mui/material/Button";
import Heading1 from "components/Text/Heading1";
import { useLocation } from "react-router-dom";
import { fetchReports } from "redux/reportSlice";
import { stateFormatUI } from "utils/formatToUI";
import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import ReportForm from "./ReportForm"



const columns = [
  { id: "id", label: "ID"},
  {
    id: "address",
    label: "Địa chỉ",
    minWidth: 200,
  },
  {
    id: "ward",
    label: "Phường", 
    minWidth: 170,
    format: (value) => value?.name,
  },

  {
    id: "name",
    label: "Người báo cáo",
    minWidth: 100,
  },
  {
    id: "reportDate",
    label: "Ngày báo cáo",
    minWidth: 170,
  },
  {
    id: "state",
    label: "Trạng thái",
    minWidth: 100,
    format:stateFormatUI
  },
  {
    id: "detail",
    label: "",
    value: "Xem Chi tiết",
  },
];

const ReportPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRow, setSelectedRow] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  // @ts-ignore
  const { token } = useSelector((state) => state.appState);
  // @ts-ignore
  const { entities, error, loading } = useSelector((state) => state.reports);

  var params;

  const handleClickDetail = (row) => navigate(PAGE.REPORT.path + `/${row.id}`);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);
  const handleClickRow = (row) => setSelectedRow(row);
  const handleClickCreate = () => {
 
    setSelectedRow(null);
    setTimeout(() => {
      handleOpenForm();
    }, 0);
  };
  const handleClickEdit = () => {
    handleOpenForm();

  };
  const handleClickDelete = () => {
    setOpenConfirm(true);

  };

 
  const handleDelete = async () => {
    const { id } = selectedRow;
    dispatch(setLoading(true));
    try {
      const res = await ReportService.delete(id, token);
      dispatch(setSnackbar({ status: "success", message: res }));
      // @ts-ignore
      dispatch(fetchSpaceRequest({ testParams, token }));
    } catch (error) {
      dispatch(setSnackbar({ status: "error", message: error }));
    } finally {
      setSelectedRow(null);
      dispatch(setLoading(false));
      setOpenConfirm(false);
    }
   
  };
  useEffect(() => {
    const id = location.pathname.split("/")[2];
    if (id) {
      params = { surfaceIds: id };
    } else params = { wardIds: 1 };
    // @ts-ignore
    dispatch(fetchReports({ params, token }));
  }, [location]);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);

  return (
    <div className="max-w-[1400px] m-auto">
      {/* Report Infomation */}
      <div className="flex flex-col gap-[24px] mb-[32px]">
        <Heading1>Danh sách các báo cáo</Heading1>
        <div className="flex gap-6 ml-auto">
          <Button
            variant="outlined"
            color="success"
            onClick={handleClickCreate}
          >
            Tạo mới
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={handleClickEdit}
            disabled={!selectedRow}
          >
            Chỉnh Sửa
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClickDelete}
            disabled={!selectedRow}
          >
            Xóa
          </Button>
        </div>
      </div>
      {entities && entities.length > 0 ? (
        <DataTable
          columns={columns}
          rows={entities}
          onClickDetail={handleClickDetail}
          onClickRow={handleClickRow}
        />
      ) : (
        <p className="text-center text-blue-400 text-lg font-bold">
          No data ...
        </p>
      )}
       {error && (
        <p className="text-center text-red-500 text-lg font-bold">
          Error: {error.message} {/* Display a user-friendly error message */}
        </p>
      )}
      
      {error && (
        <p className="text-center text-red-500 text-lg font-bold">{error}</p>
      )}
        <ReportForm
          open={openForm}
          handleClose={handleCloseForm}
          existData={selectedRow}
        />
         <ConfirmModal
          open={openConfirm}
          handleClose={() => setOpenConfirm(false)}
          handleSubmit={handleDelete}
          message="Xác nhận xóa địa điểm được chọn?"
        />
    </div>
  );
};

export default ReportPage;
