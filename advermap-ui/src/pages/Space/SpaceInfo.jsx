import React from "react";
import PropTypes from "prop-types";
import { formatFormat, plannedFormat, typeFormat } from "utils/format";
import CarouselImage from "components/Carousels/CarouselImage";

const SpaceInfo = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <>
	 <h1 className="font-bold text-blue-500 text-[32px] uppercase">
        Chi tiết địa điểm
      </h1>
      <div className="flex flex-col gap-4">
        {data ? (
          <>
            <p>
              <span className="font-bold text-base">Địa chỉ: </span>
              {data.address}
            </p>
            <p>
              <span className="font-bold text-base">Loại: </span>
              {typeFormat(data.type)}
            </p>
            <p>
              <span className="font-bold text-base">Hình thức: </span>
              {formatFormat(data.format)}
            </p>
            <p>
              <span className="font-bold text-base">Phường: </span>
              {data.ward.name}
            </p>
            <p>
              <span className="font-bold text-base">Trạng thái: </span>
              {plannedFormat(data.planned)}
            </p>
            <div className="w-[768px] h-[400px] flex m-auto">
              <CarouselImage data={data.imgUrl} />
            </div>
          </>
        ) : (
          <p>No data</p>
        )}
      </div>
    </>
  );
};
SpaceInfo.defaultProps = {};
SpaceInfo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SpaceInfo;
