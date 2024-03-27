import React from "react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import MainLoader from "../../components/loaders/MainLoader";
import { useNavigate } from "react-router-dom";
import ArticleSummary from "./ArticleSummary";
const index = () => {
  const {
    loading,
    data: { news },
  } = useSelector((state) => state.profilFin);
  console.log("Newws are", news.slice(0, 6));
  const navigateTo = useNavigate();
  const goToArticle = (index) => {
    navigateTo(`/news/article/${index}`);
  };
  return (
    <React.Fragment key={Date.now()}>
      <Filter />
      {loading && <MainLoader />}
      {!loading &&
        news?.map((item, index) => {
          return (
            <>
              <ArticleSummary
                {...item}
                onClick={() => goToArticle(index + 1)}
                key={`${item.Titre}-${index}`}
              />
            </>
          );
        })}
    </React.Fragment>
  );
};

export default index;
