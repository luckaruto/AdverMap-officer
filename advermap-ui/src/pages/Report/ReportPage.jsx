import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "redux/appSlice";
import { SurfaceServices } from "services/surface/SurfaceService";
import DataTable from "components/DataTable";
import { PAGE } from "components/constants";
import { useNavigate } from "react-router-dom";
import { ReportService } from "services/report/ReportService";

import Heading1 from "components/Text/Heading1";
import { useLocation } from "react-router-dom";
import { fetchReports } from "redux/reportSlice";
import { stateFormatUI } from "utils/formatToUI";

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

  // @ts-ignore
  const { token } = useSelector((state) => state.appState);
  // @ts-ignore
  const { entities, error, loading } = useSelector((state) => state.reports);

  var params;

  const handleClickDetail = (row) => navigate(PAGE.REPORT.path + `/${row.id}`);

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
      </div>
      {entities && entities.length > 0 ? (
        <DataTable
          columns={columns}
          rows={entities}
          onClickDetail={handleClickDetail}
        />
      ) : (
        <p className="text-center text-blue-400 text-lg font-bold">
          No data ...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 text-lg font-bold">{error}</p>
      )}
    </div>
  );
};

export default ReportPage;
