// @ts-nocheck
/* eslint-disable react/prop-types */

import React from "react";
import Text from "../Text/Text";
import { ReactComponent as SvgInformation } from "../../assets/images/information.svg";
import { ReactComponent as SvgReport } from "../../assets/images/report.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function AdvertisementComponent({
  format,
  width,
  height,
  type,
  formatspace,
  address,
  surfaceid,
  className,
  HandleTrue,
  selectedSpace,
}) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div className={`flex flex-col border-2 rounded-sm ${className}`}>
      <div className="flex flex-col gap-2">
        <Text className="font-extrabold text-xl">{format}</Text>
        <Text className="font-extralight text-base">{address}</Text>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row">
          <Text className={"font-normal"}>
            {`Kích thước: ${width}m X ${height}m`}{" "}
          </Text>
        </div>
        <div className="flex flex-row">
          <Text className={"font-normal"}>{`Số lượng: `} </Text>
        </div>
        <div className="flex flex-row">
          <Text className={"font-normal"}>{`Hình thức: ${formatspace}`} </Text>
        </div>
        <div className="flex flex-row">
          <Text className={"font-normal"}>{`Phân loại: ${type}`} </Text>
        </div>
        <div className="flex flex-row justify-between items-center">
          <button
            onClick={() => {
              navigate(`/details/${surfaceid}`, { state: selectedSpace });
            }}
          >
            {" "}
            <SvgInformation className="h-6 w-6" />
          </button>

          <div
            className="border-2 border-red-500 p-1 rounded-md flex flex-row gap-2 justify-center items-center cursor-pointer "
            onClick={() => {
              HandleTrue();
              // dispatch(setSurface({ id: surfaceid, address: address }));
            }}
          >
            <SvgReport className="h-4 w-4" />
            <Text className="text-red-500">Báo cáo vi phạm</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
