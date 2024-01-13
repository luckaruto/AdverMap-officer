import React, { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import { DistrictService } from "../../services/district/DistrictService"; // Adjust the import path based on your project structure
import { setLoading, setSnackbar } from "../../redux/appSlice";
import { PAGE } from "../../components/constants";
import Heading1 from "../../components/Text/Heading1";
import Button from "@mui/material/Button";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { fetchDistricts } from "../../redux/districtSlice"; // Assuming you have a districtSlice
import { testParams } from "../../services/apis/constants";
import { useDispatch, useSelector } from "react-redux";

const columns = [
    { id: "id", label: "ID" },
    {
        id: "name",
        label: "Tên quận",
        minWidth: 170,
    },
    // Add more columns based on your district data structure
];

const DistrictPage = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);

    const dispatch = useDispatch();

    // @ts-ignore
    const { token } = useSelector((state) => state.appState);
    // @ts-ignore
    const { entities, error, loading } = useSelector((state) => state.district);

    const handleOpenRequestForm = () => {
        setSelectedRow(null);
        setTimeout(() => {
            handleOpenForm();
        }, 0);
    };

    const handleClickCreate = () => {
        // Implement your logic for handling create action
    };

    const handleClickDelete = () => {
        setOpenConfirm(true);
    };

    const handleClickRow = (row) => setSelectedRow(row);

    const handleDelete = async () => {
        const { id } = selectedRow;
        dispatch(setLoading(true));
        try {
            const res = await DistrictService.deleteDistrict(id, token);
            dispatch(setSnackbar({ status: "success", message: res }));
            dispatch(fetchDistricts({ testParams, token }));
        } catch (error) {
            dispatch(setSnackbar({ status: "error", message: error }));
        } finally {
            setSelectedRow(null);
            dispatch(setLoading(false));
            setOpenConfirm(false);
        }
    };

    useEffect(() => {
        dispatch(fetchDistricts({ testParams, token }));
    }, [dispatch, token]);

    return (
        <>
            <div className="max-w-[1400px] m-auto flex flex-col gap-4">
                <Heading1>Danh sách quận</Heading1>
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

                {error && (
                    <p className="text-center text-red-500 text-lg font-bold">{error}</p>
                )}

                <ConfirmModal
                    open={openConfirm}
                    handleClose={() => setOpenConfirm(false)}
                    handleSubmit={handleDelete}
                    message="Xác nhận xóa quận được chọn?"
                />
            </div>
        </>
    );
};

export default DistrictPage;
