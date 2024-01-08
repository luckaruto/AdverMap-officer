import React from "react";
import DataTable from "../../components/DataTable";
import { useState, useEffect } from "react";
import { SpaceService } from "services/space/SpaceService";
import { Link } from "react-router-dom";
import { PAGE } from 'components/constants';

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

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  {
    id: "address",
    label: "address",
    minWidth: 200,
  },
  {
    id: "type",
    label: "type",
    minWidth: 170,
    format: typeFormat,
  },
  {
    id: "format",
    label: "format",
    minWidth: 170,
    format: formatFormat,
  },
  {
    id: "ward",
    label: "ward",
    minWidth: 170,
    format: (value) => value.name,
  },
  {
    id: "planned",
    label: "planned",
    minWidth: 170,
    format: plannedFormat,
  },
];

const SpacePage = () => {
  const [rows, setRows] = useState(null);

  const token = `eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MDQ3MzE2NjYsImV4cCI6MTcwNDczMzQ2Nn0.zFiHETrcI-0_qhiOXHWnqi_UXIk7H9_nkjPbMpdYMXE`;

  const fetchSpace = async () => {
    try {
      const data = await SpaceService.getWithParams({ cityIds: 1 }, token);
      setRows(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchSpace();
  }, []);

  return (
    <>
      {rows ? <DataTable columns={columns} rows={rows} /> : <p>Loading...</p>}
    </>
  );
};

export default SpacePage;
