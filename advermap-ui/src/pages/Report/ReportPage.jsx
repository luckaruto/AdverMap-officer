import { formatImgUrl } from "pages/Space/SpacePage";
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/appSlice";
import { SurfaceServices } from "services/surface/SurfaceService";
import DataTable from "components/DataTable";
import { PAGE } from "components/constants";
import { useNavigate } from "react-router-dom";
import { testToken } from "services/apis/constants";
import { ReportService } from "services/report/ReportService";

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
	format:value=>value.name
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
    minWidth: 150,
  },
];

const ReportPage = () => {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = testToken;

  const params = { wardIds: 2};

  console.log(rows);
  console.log(error);

  const handleClickRow = (row) => navigate(PAGE.REPORT.path + `/${row.id}`);

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

  return <div className="max-w-[1400px] m-auto">
	  {/* Report Infomation */}
      <div className="flex flex-col gap-[24px] mb-[32px]">
        <h1 className="text-center font-bold text-blue-700 text-[32px] uppercase">
          Danh sách các báo cáo
        </h1>
        {/* <p>
          <span className="font-bold text-base">Thành phố: </span>
          Hồ Chí Minh
        </p>
        <p>
          <span className="font-bold text-base">Quận: </span>
          Tân Phú
        </p>
        <p>
          <span className="font-bold text-base">Phường: </span>
          Tân Thành
        </p> */}
      </div>
  {rows ? (
	<DataTable columns={columns} rows={rows} onClickRow={handleClickRow} />
  ) : (
	<p className="text-center text-red-500 text-lg font-bold">{error}</p>
  )}
</div>;
};

export default ReportPage;
