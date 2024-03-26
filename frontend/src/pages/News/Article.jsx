import React from "react";
import ArticleImage from "./ArticleImage";

const Article = (props) => {
  const { Titre, descrip, onClick, titres_bvc, sources } = props;
  return (
    <div className="float-left mb-8 w-full sm:flex items-center">
      {/* <p>{Date}</p> */}
      <div className="float-left w-full pr-0 sm:w-1/2 sm:pr-4 md:w-auto">
        <div
          className="flex w-full items-center overflow-hidden md:h-[214px] md:w-[340px] cursor-pointer"
          onClick={onClick}
        >
          <ArticleImage name={titres_bvc} />
        </div>
      </div>
      <div className="float-left mt-8 w-full pl-0 leading-8 sm:mt-0 sm:w-1/2 sm:flex-1 sm:pl-4 md:block md:w-auto">
        <h3 className="cursor-pointer hover:underline" onClick={onClick}>
          {Titre}
        </h3>
        <div className="float-left mt-3 font-normal leading-5 sm:line-clamp-2 md:text-base md:leading-6 md:line-clamp-3">
          {/* <span>{sources}</span> */}
          {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel
          voluptatibus inventore similique nesciunt itaque, nisi esse? Ipsam
          dolor dolores, vel perspiciatis sit velit quas itaque doloremque, quae
          ex nobis ullam? */}
          <span className="font-semibold">{sources}</span>- <p>{descrip}</p>
        </div>
      </div>
    </div>
  );
};

export default Article;
