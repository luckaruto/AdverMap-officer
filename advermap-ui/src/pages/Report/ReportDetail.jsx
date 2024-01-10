import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { setLoading } from "redux/appSlice";
import { ReportService } from "services/report/ReportService";
import CarouselImage from "components/Carousels/CarouselImage";
import SurfaceInfo from "pages/Surface/SurfaceInfo";

const ReportDetail = () => {
  const { token } = useSelector((state) => state.appState);
  const location = useLocation();
  const [id, setId] = useState(null);
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);

  const dispatch = useDispatch();

  const fetchReport = async (id) => {
    dispatch(setLoading(true));
    try {
      const data = await ReportService.getById(id, token);
      setReport(data);
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
      fetchReport(id);
    }
  }, [id]);

  console.log(report, id);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold text-blue-500 text-[32px] uppercase">
        Chi tiết báo cáo
      </h1>
      <div className="flex flex-col gap-4">
        {report ? (
          <>
            <p>
              <span className="font-bold text-base">Địa chỉ: </span>
              {report.address}
            </p>
            <p>
              <span className="font-bold text-base">Phường: </span>
              {report.ward.name}
            </p>
            <p>
              <span className="font-bold text-base">Người báo cáo: </span>
              {report.name}
            </p>
            <p>
              <span className="font-bold text-base">Email: </span>
              {report.email}
            </p>
            <p>
              <span className="font-bold text-base">Số điện thoại: </span>
              {report.phone}
            </p>
            <p>
              <span className="font-bold text-base">Ngày báo cáo: </span>
              {report.reportDate}
            </p>
            <p>
              <span className="font-bold text-base">Trạng thái: </span>
              {report.state}
            </p>
            <p>
              <span className="font-bold text-base">Xét duyệt bởi: </span>
              {report.approvedBy}
            </p>
            <p>
              <span className="font-bold text-base">Thông tin phản hồi: </span>
              {report.response}
            </p>
            <p>
              <div className="font-bold text-base">Nội dung: </div>
              <div
                className="bg-[#f6eee3] p-4 rounded-md"
                dangerouslySetInnerHTML={{ __html: report.content }}
              />
            </p>
            <div className="w-[768px] h-[400px] flex m-auto">
              <CarouselImage data={report.imgUrl} />
            </div>
            <SurfaceInfo data={report.surface} />
          </>
        ) : (
          <p className="text-center text-red-500 text-lg font-bold">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ReportDetail;
