import React from "react";
import DataTable from "../../components/DataTable";
import { useState, useEffect } from "react";
import { SpaceService } from "services/space/SpaceService";
import { PAGE } from "components/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSnackbar } from "redux/appSlice";
import { useNavigate } from "react-router-dom";
import SpaceInfo from "./SpaceInfo";
import { formatFormat, typeFormat } from "utils/format";
import Heading1 from "components/Text/Heading1";
import Button from "@mui/material/Button";
import SpaceForm from "./SpaceForm";
import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { fetchSpaces } from "redux/spaceSlice";
import { testParams } from "services/apis/constants";
import {
  formatFormatUI,
  plannedFormatUI,
  typeFormatUI,
} from "utils/formatToUI";
import SpaceRequestForm from "pages/SpaceRequest/SpaceRequestForm";
import { useLocation } from "react-router-dom";
import HomePage from "pages/HomePage";
import { UserRole } from "constants/types";

const columns = [
  { id: "id", label: "ID" },
  {
    id: "address",
    label: "Địa chỉ",
    minWidth: 100,
  },
  {
    id: "type",
    label: "Loại",
    minWidth: 170,
    format: typeFormatUI,
  },
  {
    id: "format",
    label: "Hình thức",
    minWidth: 170,
    format: formatFormatUI,
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
    minWidth: 200,
    format: plannedFormatUI,
  },
  {
    id: "detail",
    label: "",
    value: "Xem Bảng quảng cáo",
  },
];

const SpacePage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openRequestForm, setOpenRequestForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { token, snackbar, params, tokenPayload } = useSelector(
    // @ts-ignore
    (state) => state.appState
  );

  // console.log(params.content);

  // @ts-ignore
  const { entities, error, loading } = useSelector((state) => state.spaces);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleOpenRequestForm = () => setOpenRequestForm(true);
  const handleCloseRequestForm = () => setOpenRequestForm(false);

  // console.log(selectedRow);

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

  const handleDelete = async () => {
    const { id } = selectedRow;
    dispatch(setLoading(true));
    try {
      const res = await SpaceService.delete(id, token);
      dispatch(setSnackbar({ status: "success", message: res }));
      // @ts-ignore
      dispatch(fetchSpaces({ testParams, token }));
    } catch (error) {
      dispatch(setSnackbar({ status: "error", message: error }));
    } finally {
      setSelectedRow(null);
      dispatch(setLoading(false));
      setOpenConfirm(false);
    }
  };

  useEffect(() => {
    const reqParams = params.content;
    console.log("reqParams", reqParams);
    // @ts-ignore
    dispatch(fetchSpaces({ reqParams, token }));
  }, [params]);

  useEffect(() => {
    if (state) {
      setSelectedRow(state);
    }
  }, [state]);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);

  return (
    <>
      <HomePage />
      <div className="max-w-[1400px] m-auto flex flex-col gap-4">
        <Heading1>Danh sách địa điểm</Heading1>
        <Button onClick={() => navigate(PAGE.SPACE_REQUEST.path)}>
          Danh sách yêu cầu
        </Button>
        <div className="flex gap-6 ml-auto">
          {tokenPayload.role != UserRole.ADMIN && (
            <Button
              variant="contained"
              color="info"
              onClick={handleOpenRequestForm}
              disabled={!selectedRow}
            >
              Yêu cầu chỉnh sửa
            </Button>
          )}
          {tokenPayload.role == UserRole.ADMIN && (
            <>
              {" "}
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
            </>
          )}
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
        {selectedRow && <SpaceInfo data={selectedRow} />}
        <SpaceForm
          open={openForm}
          handleClose={handleCloseForm}
          existData={selectedRow}
        />
        <SpaceRequestForm
          open={openRequestForm}
          handleClose={handleCloseRequestForm}
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
