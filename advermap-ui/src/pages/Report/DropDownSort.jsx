// @ts-nocheck
import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ReactComponent as SvgFilter } from "../../assets/images/filter.svg";
import { ReportState } from "constants/types";
import PropTypes from "prop-types";
import { stateFormat } from "utils/format";

export default function DropDownSort({ filterListReport }) {
  const [selectedItem, setSelectedItem] = React.useState("Tất cả");
  const menuButtonRef = React.useRef(null); // Ref to the Menu.Button
  const menuItemsRef = React.useRef(null); // Ref to the Menu.Items

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  React.useEffect(() => {
    filterListReport(selectedItem);
  }, [selectedItem]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="" ref={menuButtonRef}>
          <SvgFilter className="h-8 w-8" />
        </Menu.Button>
      </div>

      <Menu.Items
        className=" absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md  bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        ref={menuItemsRef}
      >
        <div className=" font-poppins font-semibold flex flex-col  items-center   divide-y divide-black">
          <div className="py-1 flex flex-col items-center">
            <Menu.Item className="p-2 cursor-pointer">
              {({ active }) => {
                return (
                  <div
                    onClick={() =>
                      handleMenuItemClick(stateFormat(ReportState.REJECTED))
                    }
                    className={
                      selectedItem === stateFormat(ReportState.REJECTED)
                        ? "text-[#d14b4b]"
                        : ""
                    }
                  >
                    {stateFormat(ReportState.REJECTED)}{" "}
                    {selectedItem === stateFormat(ReportState.REJECTED) && " ✓"}
                  </div>
                );
              }}
            </Menu.Item>
            <Menu.Item className="p-1 cursor-pointer">
              {({ active }) => {
                return (
                  <div
                    onClick={() =>
                      handleMenuItemClick(stateFormat(ReportState.APPROVED))
                    }
                    className={
                      selectedItem === stateFormat(ReportState.APPROVED)
                        ? "text-[#d14b4b]"
                        : ""
                    }
                  >
                    {stateFormat(ReportState.APPROVED)}
                    {selectedItem === stateFormat(ReportState.APPROVED) && " ✓"}
                  </div>
                );
              }}
            </Menu.Item>

            <Menu.Item className="p-1 cursor-pointer">
              {({ active }) => {
                return (
                  <div
                    onClick={() =>
                      handleMenuItemClick(stateFormat(ReportState.IN_PROGRESS))
                    }
                    className={
                      selectedItem === stateFormat(ReportState.IN_PROGRESS)
                        ? "text-[#d14b4b]"
                        : ""
                    }
                  >
                    {stateFormat(ReportState.IN_PROGRESS)}
                    {selectedItem === stateFormat(ReportState.IN_PROGRESS) &&
                      " ✓"}
                  </div>
                );
              }}
            </Menu.Item>
            <Menu.Item className="p-1 cursor-pointer">
              {({ active }) => (
                <div
                  onClick={() => handleMenuItemClick("Tất cả")}
                  className={selectedItem === "Tất cả" ? "text-[#d14b4b]" : ""}
                >
                  Tất cả {selectedItem === "Tất cả" && " ✓"}
                </div>
              )}
            </Menu.Item>
          </div>
        </div>
      </Menu.Items>
    </Menu>
  );
}

DropDownSort.propTypes = {
  filterListReport: PropTypes.func.isRequired,
};
