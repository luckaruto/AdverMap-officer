import React, { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSnackbar } from "../../redux/appSlice";
import { PAGE } from "../../components/constants";
import Heading1 from "../../components/Text/Heading1";
import Button from "@mui/material/Button";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { DistrictService } from "services/district/DistrictService";
import DistrictForm from "./DistrictForm";
import { fetchDistricts } from "redux/DistrictSlice";

const columns = [
  { id: "id", label: "ID" },
  {
    id: "name",
    label: "Tên quận/huyện",
    minWidth: 170,
  },
  {
    id: "city",
    label: "Thành phố",
    minWidth: 170,
    format: (value) => value.name ?? "",
  },
  // Add more columns based on your city data structure
];

const DistrictPage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const { token, entities, error, loading } = useSelector((state) => state.districts || {});
  const handleCloseForm = () => {
    setOpenForm(false)
    setSelectedRow(null)
  }
  const handleOpenRequestForm = () => {
    setOpenForm(true)
  };

  const handleClickCreate = () => {
    setSelectedRow(null);
    setOpenForm(true)
  };

  const handleClickDelete = () => {
    setOpenConfirm(true);
  };

  const handleClickRow = (row) => setSelectedRow(row);

  const handleDelete = async () => {
    const { id } = selectedRow;
    dispatch(setLoading(true));
    try {
      const res = await DistrictService.deleteDistrict(id);
      dispatch(setSnackbar({ status: "success", message: res }));
      // @ts-ignore
      dispatch(fetchDistricts({}));
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
        dispatch(fetchDistricts({ }));
    }, [dispatch]);

  return (
    <>
      <div className="max-w-[1400px] m-auto flex flex-col gap-4">
        <Heading1>Danh sách thành phố</Heading1>
        <div className="flex gap-6 ml-auto">
          <Button
            variant="contained"
            color="info"
            onClick={handleOpenRequestForm}
            disabled={!selectedRow}
          >
            Chỉnh sửa
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={handleClickCreate}
          >
            Tạo mới
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
            onClickRow={handleClickRow}
            selectedRow={selectedRow}
          />
        ) : (
          <p className="text-center text-blue-400 text-lg font-bold">
            No data ...
          </p>
        )}
        <DistrictForm
          open={openForm}
          handleClose={handleCloseForm}
          existData={selectedRow}
        />

        <ConfirmModal
          open={openConfirm}
          handleClose={() => setOpenConfirm(false)}
          handleSubmit={handleDelete}
          message="Xác nhận xóa quận/huyện được chọn?"
        />
      </div>
    </>
  );
};

export default DistrictPage;
