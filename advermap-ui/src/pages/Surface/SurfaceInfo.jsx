import React from "react";
import PropTypes from "prop-types";
import CarouselImage from "components/Carousels/CarouselImage";
import { formatFormat, plannedFormat, typeFormat } from "utils/format";
import SpaceInfo from "pages/Space/SpaceInfo";

const SurfaceInfo = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <>
	 <h1 className="font-bold text-blue-500 text-[32px] uppercase">
        Chi tiết Bảng quảng cáo
      </h1>
      <div className="flex flex-col gap-4">
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
              <span className="font-bold text-base">Hình thức: </span>
              {formatFormat(data.format)}
            </p>
            <p>
              <span className="font-bold text-base">Nội dung: </span>
              {data.content}
            </p>
            <div className="w-[768px] h-[400px] flex m-auto">
              <CarouselImage data={data.imgUrl} />
            </div>
			<SpaceInfo data={data.space}/>
          </>
        ) : (
          <p>No data</p>
        )}
      </div>
    </>
  );
};
SurfaceInfo.defaultProps = {};
SurfaceInfo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SurfaceInfo;
