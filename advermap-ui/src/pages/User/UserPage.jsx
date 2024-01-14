import React from "react";
import DataTable from "../../components/DataTable";
import { useState, useEffect } from "react";
import { PAGE } from "components/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSnackbar } from "redux/appSlice";
import { useNavigate } from "react-router-dom";
import SpaceInfo from "./UserInfo";
import { formatFormat, typeFormat } from "utils/format";
import Heading1 from "components/Text/Heading1";
import Button from "@mui/material/Button";
import SpaceForm from "./UserForm";
import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { testParams } from "services/apis/constants";
import {
  formatFormatUI,
  plannedFormatUI,
  typeFormatUI,
} from "utils/formatToUI";
import { useLocation } from "react-router-dom";
import {fetchUser} from "../../redux/userSlice";
import UserInfo from "./UserInfo";
import UserForm from "./UserForm";

const columns = [
  { id: "id", label: "ID" },
  {
    id: "name",
    label: "Tên",
    minWidth: 100,
  },
  {
    id: "role",
    label: "Quyền",
    minWidth: 170
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170
  },
  {
    id: "birthday",
    label: "Ngày sinh",
    minWidth: 170
  },
  {
    id: "Chi tiết",
    label: "",
    value: "Xem chi tiết",
  },
];

const UserPage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  // @ts-ignore
  const { token, snackbar } = useSelector((state) => state.appState);

  // @ts-ignore
  const { entities, error, loading } = useSelector((state) => state.users);

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

  const handleClickDetail = (row) => navigate(PAGE.USER.path + `/${row.id}`);
  const handleClickRow = (row) => setSelectedRow(row);

  const handleDelete = async () => {
    const { id } = selectedRow;
    dispatch(setLoading(true));
    try {
      //const res = await SpaceService.delete(id, token);
      //dispatch(setSnackbar({ status: "success", message: res }));
      // @ts-ignore
      dispatch(fetchUser({ testParams, token }));
    } catch (error) {
      dispatch(setSnackbar({ status: "error", message: error }));
    } finally {
      setSelectedRow(null);
      dispatch(setLoading(false));
      setOpenConfirm(false);
    }
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchUser({ testParams, token }));
  }, []);

  useEffect(() => {
    if(state){
      setSelectedRow(state)
    }
  }, [state]);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);

  return (
    <>
      <div className="max-w-[1400px] m-auto flex flex-col gap-4">
        <Heading1>Danh sách tài khoản</Heading1>
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

        {entities && entities.length > 0 ? (
          <DataTable
            columns={columns}
            rows={entities}
            onClickDetail={handleClickDetail}
            onClickRow={handleClickRow}
            selectedRow={selectedRow}
          />
        ) : (
          <p className="text-center text-blue-400 text-lg font-bold">
            No data ...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 text-lg font-bold">{error}</p>
        )}
        {selectedRow && <UserInfo data={selectedRow} />}
        <UserForm
          open={openForm}
          handleClose={handleCloseForm}
          existData={selectedRow}
        />
        <ConfirmModal
          open={openConfirm}
          handleClose={() => setOpenConfirm(false)}
          handleSubmit={handleDelete}
          message="Xác nhận xóa tài khoản được chọn?"
        />
      </div>
    </>
  );
};

export default UserPage;
