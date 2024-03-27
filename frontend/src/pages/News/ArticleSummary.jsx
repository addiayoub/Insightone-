import React, { memo } from "react";
import ArticleImage from "./ArticleImage";
import moment from "moment";

const ArticleSummary = (props) => {
  const { Titre, descrip, onClick, Date, titres_bvc, sources } = props;
  return (
    <div className="float-left mb-8 w-full sm:flex items-center">
      <div className="float-left w-full pr-0 sm:w-1/2 sm:pr-4 md:w-auto">
        <div
          className="flex w-full items-center overflow-hidden md:h-[214px] md:w-[340px] cursor-pointer"
          onClick={onClick}
        >
          <ArticleImage name={titres_bvc} />
        </div>
      </div>
      <div className="float-left mt-8 w-full pl-0 leading-8 sm:mt-0 sm:w-1/2 sm:flex-1 sm:pl-4 md:block md:w-auto">
        <div>
          <h3 className="cursor-pointer hover:underline" onClick={onClick}>
            {Titre}
          </h3>
          <span className="text-gray-500 text-[14px]">
            Publié le {moment(Date).format("DD-MM-YYYY")}
          </span>
        </div>
        <div className="float-left mt-3 font-normal leading-5 sm:line-clamp-2 md:text-base md:leading-6 md:line-clamp-3">
          <span className="font-normal text-primary">{sources}</span>
          <p>{descrip}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(ArticleSummary);
