import React from "react";
import PropTypes from "prop-types";
import { formatFormat, plannedFormat, typeFormat } from "utils/format";
import CarouselImage from "components/Carousels/CarouselImage";
import Heading1 from "components/Text/Heading1";
import Heading2 from "components/Text/Heading2";
import {
  formatFormatUI,
  plannedFormatUI,
  typeFormatUI,
} from "utils/formatToUI";

const SpaceInfo = (props) => {
  const { data } = props;
  return (
    <>
      <Heading2 className="text-left text-blue-500">Chi tiết địa điểm</Heading2>
      <div className="flex flex-col gap-4 p-4 ring-2 ring-blue-400">
        {data ? (
          <>
            <p>
              <span className="font-bold text-base">Địa chỉ: </span>
              {data.address}
            </p>
            <p>
              <span className="font-bold text-base">Loại: </span>
              {typeFormatUI(data.type)}
            </p>
            <p>
              <span className="font-bold text-base">Hình thức: </span>
              {formatFormatUI(data.format)}
            </p>
            <p>
              <span className="font-bold text-base">Phường: </span>
              {data.ward.name}
            </p>
            <p>
              <span className="font-bold text-base">Trạng thái: </span>
              {plannedFormatUI(data.planned)}
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
