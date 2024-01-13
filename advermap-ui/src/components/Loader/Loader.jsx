// @ts-nocheck
/* eslint-disable react/prop-types */

import React from "react";
import { ReactComponent as SvgLoader } from "../../assets/images/loader.svg";

const Loader = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <SvgLoader></SvgLoader>
    <h1 className="font-bold text-2xl text-white mt-2">
      {title || "Loading..."}
    </h1>
  </div>
);

export default Loader;
