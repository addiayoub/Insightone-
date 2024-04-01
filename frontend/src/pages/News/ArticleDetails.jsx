import moment from "moment";
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArticleImage from "./ArticleImage";
import { Box, Button } from "@mui/material";
import CustomButton from "../../components/Ui/Buttons";
import { ArrowLeft } from "react-feather";

const ArticleDetails = () => {
  const {
    data: { news },
  } = useSelector((state) => state.profilFin);
  const { id } = useParams();
  const article = news.find((item) => item.id == id);
  const navigateTo = useNavigate();
  console.log("index is", id, article, news[id], news);
  useEffect(() => {
    if (!article) {
      console.log("article not found");
      navigateTo("/news");
    }
  }, [article]);
  if (!article) {
    return <h1>No article {id}</h1>;
  }
  return (
    <>
      <CustomButton
        onClick={() => window.history.back()}
        text="Back"
        isBefore
        icon={<ArrowLeft size={18} />}
      />
      <div className="relative flex flex-col">
        <div className="mx-0 mt-1">
          <h1
            id="articleTitle"
            className="font-bold text-xl md:leading-[60px] md:text-[25px] "
          >
            {article.Titre}
          </h1>
          <div className="mt-2 flex flex-col gap-2 text-xs md:mt-2.5 md:gap-2.5">
            <div className="flex flex-col gap-2 text-warren-gray-700 md:flex-row md:items-center md:gap-0">
              <div className="flex flex-row items-center">
                <span>
                  Publié le {moment(article.Date).format("DD-MM-YYYY")}
                </span>
                <div className="flex flex-row items-center md:hidden"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-6 mt-8 relative h-[200px] w-[50%]  float-left overflow-hidden sm:h-[320px] xl:h-[340px] bg-[#f7f7f7] phone:float-none phone:w-full tablet:float-none tablet:w-full phone:mx-0 tablet:mx-0 mx-8">
            <ArticleImage name={article.image} className="object-fit" />
            <div className="absolute bottom-0 w-full bg-gray-500/50 px-3.5 py-3">
              <p className="text-xs text-gray-200"></p>
            </div>
          </div>
          {/* Article content */}
          <div
            className="text-[17px] leading-relaxed mt-8"
            dangerouslySetInnerHTML={{
              __html: article.article.replace(/\./g, ".<br />"),
            }}
          >
            {/* {article.article.replace(/\./g, "<br />")} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ArticleDetails);
