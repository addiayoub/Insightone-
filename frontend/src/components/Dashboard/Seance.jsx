import moment from "moment";
import React, { useMemo } from "react";
import { Lock } from "react-feather";
import { momentFr } from "../../utils/momentFr";
moment.locale("fr", momentFr);

function Seance({ date }) {
  console.log("Seance({ date })", date);
  const isYesterday = useMemo(() => {
    return moment(date).isSame(moment().subtract(1, "days"), "day");
  }, [date]);
  return (
    <div className="pt-1 pb-[14px] md:py-5 print-hidden">
      <div className="max-w-[1058px] rounded-md px-4 py-3 flex gap-6 flex-col lg:flex-row md:items-center justify-between mx-auto print:hidden seance">
        <div className="flex items-center gap-3">
          <div className="bg-warning text-white flex hover:bg-success-800 w-9 h-9 rounded-lg items-center justify-center cursor-pointer transition-all duration-300">
            <Lock size={16} />
          </div>
          <h3 className="text-2xl leading-8 font-semibold whitespace-nowrap">
            Séance fermée {isYesterday ? " de la veille" : ""}
          </h3>
        </div>
        <p className="text-xs leading-[18px] tracking-[0.4px] md:ml-[18px] md:pl-[18px] md:border-l md:border-white">
          {moment(date).format("dddd DD MMMM YYYY")}
        </p>
      </div>
    </div>
  );
}

export default Seance;
