import React from "react";
import PropTypes from "prop-types";
import CarouselImage from "components/Carousels/CarouselImage";
import { formatDateTime, formatFormat, plannedFormat, typeFormat } from "utils/format";
import SpaceInfo from "pages/Space/SpaceInfo";
import Heading1 from "components/Text/Heading1";
import Heading2 from "components/Text/Heading2";
import { formatFormatUI } from "utils/formatToUI";

const SurfaceAllowanceInfo = (props) => {
  const { data } = props;
  
  return (
    <>
      <Heading2 className="text-left text-blue-500">
        Chi tiết Cấp phép
      </Heading2>
      <div className="flex flex-col gap-4 p-4 ring-2 ring-blue-400">
        {data ? (
          <>
            <p>
              <span className="font-bold text-base">Chiều dài: </span>
              {data.height}
            </p>
            <p>
              <span className="font-bold text-base">Chiều rộng: </span>
              {data.width}
            </p>
            <p>
              <span className="font-bold text-base">Số điện thoại công ty: </span>
              {data.companyPhone}
            </p>
            <p>
              <span className="font-bold text-base">Thông tin công ty: </span>
              {data.companyInfo}
            </p>
            <p>
              <span className="font-bold text-base">Địa chỉ công ty: </span>
              {data.companyAddress}
            </p>
            <p>
              <span className="font-bold text-base">Tên công ty: </span>
              {data.companyName}
            </p>
            <p>
              <span className="font-bold text-base">Email công ty: </span>
              {data.companyEmail}
            </p>
            <p>
              <span className="font-bold text-base">Ngày bắt đầu: </span>
              {formatDateTime(data.startDate)}
            </p>
            <p>
              <span className="font-bold text-base">Ngày kết thúc: </span>
              {formatDateTime(data.endDate)}
            </p>
            <p>
              <span className="font-bold text-base">Hình thức: </span>
              {formatFormatUI(data.format)}
            </p>
            <p>
              <span className="font-bold text-base">Người yêu cầu: </span>
              {data?.user?.name||"Không xác định"}
            </p>
            <p>
              <span className="font-bold text-base">Nội dung: </span>
              {data.content}
            </p>
            <p>
              <span className="font-bold text-base">Thông tin phản hồi: </span>
              {data.response || "Chưa có"}
            </p>
            <div className="w-[768px] h-[400px] flex m-auto">
              <CarouselImage data={data.imgUrl} />
            </div>
          </>
        ) : (
          <p>No data</p>
        )}
      </div>
      <SpaceInfo data={data.space} />
    </>
  );
};
SurfaceAllowanceInfo.defaultProps = {};
SurfaceAllowanceInfo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SurfaceAllowanceInfo;
