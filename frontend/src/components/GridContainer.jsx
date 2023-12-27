import React from "react";

const GridContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-y-4 gap-x-12 items-center mt-24">
      <div className="md:col-span-5 lg:col-span-5 xl:col-span-5"></div>

      <div className="md:col-span-7 lg:col-span-7 xl:col-span-7"></div>
    </div>
  );
};

export default GridContainer;
