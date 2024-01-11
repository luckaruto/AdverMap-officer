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
import {
  formatFormat,
  formatImgUrl,
  plannedFormat,
  typeFormat,
} from "utils/format";
import Heading1 from "components/Text/Heading1";
import Button from "@mui/material/Button";
import SpaceForm from "./SpaceForm";
import ConfirmModal from "components/ConfirmModal/ConfirmModal";

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
  const [selectedRow, setSelectedRow] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = { cityIds: 1 };

  const { token } = useSelector((state) => state.appState);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleClickCreate = () => {
    setSelectedRow(null);
    setTimeout(() => {
      handleOpenForm();
    }, 0);
  };
  const handleClickEdit = () => {
    handleOpenForm();
  };
  const handleClickDelete = () => {
    setOpenConfirm(true);
  };

  const handleClickDetail = (row) => navigate(PAGE.SPACE.path + `/${row.id}`);
  const handleClickRow = (row) => setSelectedRow(row);

  const handleDelete = () => {
    if (selectedRow) {
      console.log("delete", selectedRow);
    }
  };

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
    <>
      <div className="max-w-[1400px] m-auto flex flex-col gap-4">
        <Heading1>Danh sách địa điểm</Heading1>
        <div className="flex gap-6 ml-auto">
          <Button
            variant="outlined"
            color="success"
            onClick={handleClickCreate}
          >
            Tạo mới
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={handleClickEdit}
            disabled={!selectedRow}
          >
            Chỉnh Sửa
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClickDelete}
            disabled={!selectedRow}
          >
            Xóa
          </Button>
        </div>

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
        <SpaceForm
          open={openForm}
          handleClose={handleCloseForm}
          existData={selectedRow}
        />
        <ConfirmModal
          open={openConfirm}
          handleClose={() => setOpenConfirm(false)}
          handleSubmit={handleDelete}
          message="Xác nhận xóa địa điểm được chọn?"
        />
      </div>
    </>
  );
};

export default SpacePage;
