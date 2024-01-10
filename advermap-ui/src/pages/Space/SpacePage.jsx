import React from "react";
import DataTable from "../../components/DataTable";
import { useState, useEffect } from "react";
import { SpaceService } from "services/space/SpaceService";
import { Link } from "react-router-dom";
import { PAGE } from "components/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "redux/appSlice";
import { useNavigate } from "react-router-dom";
import SpaceInfo from "./SpaceInfo";
import { formatFormat, formatImgUrl, plannedFormat, typeFormat } from "utils/format";
import Heading1 from "components/Text/Heading1";

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
    value: "Xem Bảng quảng cáo",
  },
];

const SpacePage = () => {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");
  // const [city, setCity] = useState("");
  // const [ward, setWard] = useState("");
  // const [district, setDistrict] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = { cityIds: 1 };

  const handleClickDetail = (row) => navigate(PAGE.SPACE.path + `/${row.id}`);
  const handleClickRow = (row) => setSelectedRow(row);

  const { token } = useSelector((state) => state.appState);

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
    <div className="max-w-[1400px] m-auto flex flex-col gap-6">
      <Heading1 >
      Danh sách địa điểm
      </Heading1>
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
      {selectedRow && <SpaceInfo data={selectedRow} />}
    </div>
  );
};

export default SpacePage;
