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
import Heading1 from "components/Text/Heading1";
import { fetchSurfaces } from "redux/surfaceSlice";

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
    id: "detail",
    label: "",
    value: "Xem Báo cáo",
  },
];

const SurfacePage = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-ignore
  const { token } = useSelector((state) => state.appState);
  // @ts-ignore
  const { entities, error, loading } = useSelector((state) => state.surfaces);


  var params;

  const handleClickRow = (row) => setSelectedRow(row);
  const handleClickDetail = (row) => navigate(PAGE.SURFACE.path + `/${row.id}`);

  useEffect(() => {
    const id = location.pathname.split("/")[2];
    if (id) {
      params = { spaceIds: id };
    } else params = { cityIds: 1 };
    // @ts-ignore
    dispatch(fetchSurfaces({ params, token }));
  }, [location]);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);

  return (
    <div className="max-w-[1400px] m-auto flex flex-col gap-6">
      <Heading1>Danh sách bảng Quảng Cáo</Heading1>
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
        <p className="text-center text-red-500 text-lg font-bold">{error}</p>
      )}
      {selectedRow && <SurfaceInfo data={selectedRow} />}
    </div>
  );
};

export default SurfacePage;
