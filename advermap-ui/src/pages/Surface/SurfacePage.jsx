import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "redux/appSlice";
import { SurfaceServices } from "services/surface/SurfaceService";
import DataTable from "components/DataTable";
import { PAGE } from "components/constants";
import { useNavigate } from "react-router-dom";
import { testToken } from "services/apis/constants";
import SurfaceInfo from "./SurfaceInfo";
import { formatImgUrl } from "utils/format";

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
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
  },
  {
    id: "content",
    label: "Nội dung",
    //   minWidth: 170,
  },
  {
    id: "imgUrl",
    label: "Ảnh",
    minWidth: 100,
    format: formatImgUrl,
  },
  {
    id: "detail",
    label: "",
    value: "Xem Báo cáo",
  },
];

const SurfacePage = () => {
  const location = useLocation();
  const [id, setId] = useState(null);
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.appState);

  const params = { spaceIds: id };

  const handleClickRow = (row) => setSelectedRow(row);
  const handleClickDetail = (row) => navigate(PAGE.SURFACE.path + `/${row.id}`);
  const fetchSurface = async (params) => {
    dispatch(setLoading(true));
    try {
      const data = await SurfaceServices.getWithParams(params, token);
      setRows(data);
    } catch (error) {
      setError(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (location) {
      setId(location.pathname.split("/")[2]);
    }
  }, [location]);

  useEffect(() => {
    if (id) {
      fetchSurface(params);
    }
  }, [id]);

  return (
    <div className="max-w-[1400px] m-auto flex flex-col gap-6">
      <h1 className="text-center font-bold text-blue-700 text-[32px] uppercase">
        Danh sách bảng Quảng Cáo
      </h1>

      {rows ? (
        <DataTable
          columns={columns}
          rows={rows}
          onClickDetail={handleClickDetail}
          onClickRow={handleClickRow}
        />
      ) : (
        <p className="text-center text-red-500 text-lg font-bold">{error}</p>
      )}
      {selectedRow && <SurfaceInfo data={selectedRow} />}
    </div>
  );
};

export default SurfacePage;
