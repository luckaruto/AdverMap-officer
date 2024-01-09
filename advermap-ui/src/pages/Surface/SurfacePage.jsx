import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/appSlice";
import { SurfaceServices } from "services/surface/SurfaceService";
import DataTable from "components/DataTable";
import { PAGE } from "components/constants";
import { useNavigate } from "react-router-dom";
import { formatImgUrl } from "pages/Space/SpacePage";
import { testToken } from "services/apis/constants";

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  {
    id: "space",
    label: "Địa chỉ",
    minWidth: 200,
    format: (value) => value.address,
  },
  {
    id: "width",
    label: "Chiều rộng",
    minWidth: 100,
  },
  {
    id: "height",
    label: "Chiều dài",
    minWidth: 100,
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
    minWidth: 150,
  },
];

const SurfacePage = () => {
  const location = useLocation();
  const [id, setId] = useState(null);
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = testToken;

  const params = { spaceIds: id };

  const handleClickRow = (row) => navigate(PAGE.SURFACE.path + `/${row.id}`);
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
    <div className="max-w-[1400px] m-auto">
      {/*  Infomation */}
      <div className="flex flex-col gap-[24px] mb-[32px]">
         <h1 className="text-center font-bold text-blue-700 text-[32px] uppercase">
          Danh sách bảng Quảng Cáo
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
        </p>  */}
      </div>
      {rows ? (
        <DataTable columns={columns} rows={rows} onClickRow={handleClickRow} />
      ) : (
        <p className="text-center text-red-500 text-lg font-bold">{error}</p>
      )}
    </div>
  );
};

export default SurfacePage;
