// @ts-nocheck
/* eslint-disable react/prop-types */

import React from "react";
import Text from "components/Text/Text"; // Assuming Text is a custom component

// Import images
import advertisementGreen from "../../assets/images/advertisementGreen.png";
import advertisementOrange from "../../assets/images/advertisementOrange.png";
import advertisementRed from "../../assets/images/advertisementRed.png";
import reportRed from "../../assets/images/reportRed.png";
import ReportGreen from "../../assets/images/reportGreen.png";

export default function DescriptionComponent({ className }) {
  return (
    <div className={`flex flex-wrap w-[50%] h-fit gap-2 ${className} `}>
      <div className="flex flex-row items-center gap-2">
        <img src={advertisementGreen} className="h-5 w-5" />
        <Text className="text-white" variant="body3" as="your_element_type">
          Đã được quy hoạch
        </Text>
      </div>
      <div className="flex flex-row gap-2  items-center">
        <img src={advertisementOrange} className="h-5 w-5"></img>
        <Text className="text-white" variant="body3" as="your_element_type">
          {" "}
          Đã được quy hoạch và có quảng cáo
        </Text>
      </div>
      <div className="flex flex-row gap-2  items-center">
        <img src={advertisementRed} className="h-5 w-5"></img>
        <Text className="text-white" variant="body3" as="your_element_type">
          Chưa được quy hoạch
        </Text>
      </div>
      <div className="flex flex-row items-center gap-2">
        <img src={reportRed} className="h-5 w-5" />
        <Text className="text-white" variant="body3" as="your_element_type">
          {" "}
          Báo cáo chưa được xử lý
        </Text>
      </div>
      <div className="flex flex-row items-center gap-2">
        <img src={ReportGreen} className="h-5 w-5" />
        <Text className="text-white" variant="body3" as="your_element_type">
          {" "}
          Báo cáo đã được xử lý
        </Text>
      </div>
    </div>
  );
}
