import React from "react";
import DataTable from "../../components/DataTable";
import { useState, useEffect } from "react";
import { SpaceService } from "services/space/SpaceService";
import { Link } from "react-router-dom";
import { PAGE } from "components/constants";
import {useDispatch, useSelector} from "react-redux";
import { setLoading } from "redux/appSlice";
import { useNavigate } from "react-router-dom";
import { testToken } from "services/apis/constants";

const plannedFormat = (value) => {
  switch (value) {
    case true:
      return "Đã chứng nhận";
      break;

    default:
      return "Chưa chứng nhận";
      break;
  }
};
const typeFormat = (value) => {
  switch (value) {
    case "PUBLIC_LAND":
      return "Công cộng";
      break;

    default:
      return "Cá Nhân";
      break;
  }
};
const formatFormat = (value) => {
  switch (value) {
    case "COMMERCIAL_ADS":
      return "Biển quảng cáo";
      break;

    default:
      return "Chưa xác định";
      break;
  }
};

export const formatImgUrl = (value) => {
  return (
    <>
      {value.length > 0
        ? value.map((url, index) => (
            <p key={index}>
              <button>
                <a href={url} target="_blank">
                  Ảnh {index + 1}
                </a>
              </button>
            </p>
          ))
        : `Không có ảnh`}
    </>
  );
};

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  {
    id: "address",
    label: "Địa chỉ",
    minWidth: 100,
  },
  {
    id: "type",
    label: "Loại",
    minWidth: 170,
    format: typeFormat,
  },
  {
    id: "format",
    label: "Hình thức",
    minWidth: 170,
    format: formatFormat,
  },
  {
    id: "ward",
    label: "Phường",
    minWidth: 170,
    format: (value) => value.name,
  },
  {
    id: "planned",
    label: "Trạng thái",
    minWidth: 170,
    format: plannedFormat,
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

const SpacePage = () => {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = { cityIds: 1 };

  const handleClickRow = (row) => navigate(PAGE.SPACE.path + `/${row.id}`);

  const {token} = useSelector((state) => state.appState);

  const fetchSpace = async (params) => {
    dispatch(setLoading(true));
    try {
      const data = await SpaceService.getWithParams(params, token);
      setRows(data);
    } catch (error) {
      setError(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchSpace(params);
  }, []);

  return (
    <div className="max-w-[1400px] m-auto">
      {/* Space Infomation */}
      <div className="flex flex-col gap-[24px] mb-[32px]">
        <h1 className="text-center font-bold text-blue-700 text-[32px] uppercase">
        Danh sách địa điểm
        </h1>
        <p>
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
        </p>
      </div>
      {rows ? (
        <DataTable columns={columns} rows={rows} onClickRow={handleClickRow} />
      ) : (
        <p className="text-center text-red-500 text-lg font-bold">{error}</p>
      )}
    </div>
  );
};

export default SpacePage;
