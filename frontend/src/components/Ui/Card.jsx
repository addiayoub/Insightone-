import React, { memo } from "react";

const Card = (props) => {
  const { title, value, icon } = props;
  return (
    <div className="p-8 rounded-xl flex flex-col gap-x-2 gap-y-4 max-h-[160px] shadow-lg cursor-pointer select-none card">
      <div className="flex gap-4 items-center">
        <div className="rounded-full flex items-center justify-center w-12 h-12 flex-shrink-0 border-[1px] border-solid border-muted">
          {icon}
        </div>
        <span className="font-semibold phone:text-sm">{title}</span>
      </div>
      <p className="flex items-center gap-2">
        <span className="font-semibold">{value}</span>
      </p>
    </div>
  );
};
export default memo(Card);
