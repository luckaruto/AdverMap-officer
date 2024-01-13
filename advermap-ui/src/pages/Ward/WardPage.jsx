import React, { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import { WardService } from "../../services/ward/WardService";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSnackbar } from "../../redux/appSlice";
import Heading1 from "../../components/Text/Heading1";
import Button from "@mui/material/Button";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { fetchWards } from "../../redux/wardSlice";
import { testParams } from "../../services/apis/constants";

const columns = [
    { id: "id", label: "ID" },
    {
        id: "name",
        label: "Tên phường",
        minWidth: 170,
    },
    // Add more columns based on your ward data structure
];

const WardPage = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);

    const dispatch = useDispatch();

    // @ts-ignore
    const { token } = useSelector((state) => state.appState);
    // @ts-ignore
   // const { entities, error, loading } = useSelector((state) => state.wards) || {};

    const { entities, error, loading } = useSelector((state) => state.wards);

    useEffect(() => {
        if (entities) {
            console.log("Entities:", entities);
        }
    }, [entities]);

    const handleOpenRequestForm = () => {
        // Placeholder logic for opening the request form
        console.log("Open request form");
        // Implement your logic to open the request form for editing
    };

    const handleClickCreate = () => {
        // Implement your logic for handling create action
    };

    const handleClickDelete = () => {
        setOpenConfirm(true);
    };

    const handleClickRow = (row) => setSelectedRow(row);

    const handleDelete = async () => {
        if (!selectedRow || !selectedRow.id) {
            console.error("Invalid selected row:", selectedRow);
            return;
        }

        dispatch(setLoading(true));
        try {
            const res = await WardService.deleteWard(selectedRow.id, token);
            dispatch(setSnackbar({ status: "success", message: res }));
            dispatch(fetchWards({ testParams, token }));
        } catch (error) {
            dispatch(setSnackbar({ status: "error", message: error }));
        } finally {
            setSelectedRow(null);
            dispatch(setLoading(false));
            setOpenConfirm(false);
        }
    };

    useEffect(() => {
        dispatch(fetchWards({ testParams, token }));
    }, [dispatch, token]);

    return (
        <>
            <div className="max-w-[1400px] m-auto flex flex-col gap-4">
                <Heading1>Danh sách phường</Heading1>
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
                    message="Xác nhận xóa phường được chọn?"
                />
            </div>
        </>
    );
};

export default WardPage;
