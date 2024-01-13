// @ts-nocheck
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
import ReportForm from "./ReportForm";
import DropDownSort from "./DropDownSort";
import { ReportState } from "constants/types";
import { stateFormat } from "utils/format";
import ResponseForm from "pages/SpaceRequest/ResponseForm";

const columns = [
  { id: "id", label: "ID" },
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
  const [openResponseForm, setOpenResponseForm] = useState(false);

  // @ts-ignore
  const { token, params } = useSelector((state) => state.appState);
  // @ts-ignore
  const { entities, error, loading } = useSelector((state) => state.reports);

  const [listReport, setListReport] = useState(entities);

  var params;

  const handleClickDetail = (row) => navigate(PAGE.REPORT.path + `/${row.id}`);

  console.log(selectedRow);

  const handleOpenResponseForm = () => setOpenResponseForm(true);
  const handleCloseResponseForm = () => setOpenResponseForm(false);

  const handleClickRow = (row) => setSelectedRow(row);

  const handleClickResponse = () => {
    handleOpenResponseForm();
  };

  const fetchData = () => {
    console.log("fetch Data");
    const id = location.pathname.split("/")[2];
    let reqParams;
    if (id) {
      reqParams = { surfaceIds: id };
    } else reqParams = params.content;
    // @ts-ignore
    dispatch(fetchReports({ params: reqParams, token }));
  };
  const filterListReport = (type) => {
    if (stateFormat(ReportState.APPROVED) === type) {
      setListReport(
        entities.filter((entity) => entity.state === ReportState.APPROVED)
      );
    }
    if (stateFormat(ReportState.IN_PROGRESS) === type) {
      setListReport(
        entities.filter((entity) => entity.state === ReportState.IN_PROGRESS)
      );
    }
    if (stateFormat(ReportState.REJECTED) === type) {
      setListReport(
        entities.filter((entity) => entity.state === ReportState.REJECTED)
      );
    }
    if (type === "Tất cả") {
      setListReport(entities);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params, location]);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);

  return (
    <div className="max-w-[1400px] m-auto">
      {/* Report Infomation */}
      <div className="flex flex-col gap-[24px] mb-[32px]">
        <Heading1>Danh sách các báo cáo</Heading1>
        <div className="flex gap-6 ml-auto">
          <DropDownSort filterListReport={filterListReport}></DropDownSort>
          <Button
            variant="outlined"
            color="info"
            onClick={handleClickResponse}
            disabled={!selectedRow}
          >
            Phản hồi
          </Button>
        </div>
      </div>
      {listReport && listReport?.length > 0 ? (
        <DataTable
          columns={columns}
          rows={listReport}
          onClickDetail={handleClickDetail}
          onClickRow={handleClickRow}
          selectedRow={selectedRow}
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
      <ResponseForm
        open={openResponseForm}
        handleClose={handleCloseResponseForm}
        existData={selectedRow}
        updated={fetchData}
        responseService={ReportService.response}
      />
    </div>
  );
};

export default ReportPage;
