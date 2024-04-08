import React from "react";
import ArticleImage from "./ArticleImage";
import Swiper from "../../components/Ui/Swiper";
import { SwiperSlide } from "swiper/react";
import moment from "moment";

const getSlides = (data, goToArticle) => {
  const [, ...news] = data;
  return news.map((item) => {
    const { id, image, Titre, descrip, Date, titres_bvc, sources } = item;
    return (
      <SwiperSlide key={id} className="mb-10">
        <div
          onClick={() => goToArticle(id)}
          className=" overflow-hidden h-[214px] max-w-[340px] cursor-pointer bg-[#f7f7f7]"
        >
          <ArticleImage name={image} />
        </div>
        <span className="text-gray-500 text-[12px]">
          Publié le {moment(Date).format("DD-MM-YYYY")}
        </span>
        <div className="my-2">
          <p
            className="line-clamp-3 text-base font-semibold leading-7 hover:underline sm:line-clamp-2 md:line-clamp-3 md:leading-6"
            onClick={() => goToArticle(id)}
          >
            {Titre}
          </p>
        </div>
      </SwiperSlide>
    );
  });
};

const NewsSwiper = ({ news, goToArticle }) => {
  // const p =
  if (news?.length > 0) {
    return <Swiper className="">{getSlides(news, goToArticle)}</Swiper>;
  }
};

export default NewsSwiper;
