import React from "react";
import Loader from "./Loader";

const LoaderOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <Loader />
    </div>
  );
};

export default LoaderOverlay;
