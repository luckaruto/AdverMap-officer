import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "redux/appSlice";
import { SurfaceServices } from "services/surface/SurfaceService";
import DataTable from "components/DataTable";
import { PAGE } from "components/constants";
import { useNavigate } from "react-router-dom";
import { testToken } from "services/apis/constants";
import { ReportService } from "services/report/ReportService";
import { formatImgUrl } from "utils/format";

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  {
    id: "address",
    label: "Địa chỉ",
    minWidth: 200,
  },
  {
    id: "ward",
    label: "Phường",
    minWidth: 170,
    format: (value) => value.name,
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
    id: "imgUrl",
    label: "Ảnh",
    minWidth: 100,
    format: formatImgUrl,
  },
  {
    id: "state",
    label: "Trạng thái",
    minWidth: 100,
  },
  {
    id: "detail",
    label: "",
    value: "Xem Chi tiết",
  },
];

const ReportPage = () => {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.appState);

  const params = { wardIds: 2 };

  console.log(rows);
  console.log(error);

  const handleClickDetail = (row) => navigate(PAGE.REPORT.path + `/${row.id}`);

  const fetchReport = async (params) => {
    dispatch(setLoading(true));
    try {
      const data = await ReportService.getWithParams(params, token);
      setRows(data);
    } catch (error) {
      setError(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchReport(params);
  }, []);

  return (
    <div className="max-w-[1400px] m-auto">
      {/* Report Infomation */}
      <div className="flex flex-col gap-[24px] mb-[32px]">
        <h1 className="text-center font-bold text-blue-700 text-[32px] uppercase">
          Danh sách các báo cáo
        </h1>
      </div>
      {rows ? (
        <DataTable
          columns={columns}
          rows={rows}
          onClickDetail={handleClickDetail}
        />
      ) : (
        <p className="text-center text-red-500 text-lg font-bold">{error}</p>
      )}
    </div>
  );
};

export default ReportPage;
