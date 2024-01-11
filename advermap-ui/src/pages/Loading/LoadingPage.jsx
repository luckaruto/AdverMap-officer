import React from "react";
import Modal from "@mui/material/Modal";

const LoadingPage = () => {
  return (
    <Modal open={true}>
      <div className="absolute bg-white bg-opacity-60 z-10 h-[100vh] w-[100vw] flex items-center justify-center">
        <div className="flex items-center">
          <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
        </div>
      </div>
    </Modal>
  );
};

export default LoadingPage;
