import React from "react";

// const basePath = `${window.location.origin}/titres_pics/`;
const basePath = `/src/assets/images/titres_pics/`;

const getImg = (name) => {
  const src = `/src/assets/images/titres_pics/${name}.png`;
  return src;
};

function getRandPic() {
  const defaults = [
    "bourse.webp",
    "bourse-default.webp",
    "bourse-default-2.jpg",
    "bourse-default-3.jpg",
    "bourse-default-4.jpg",
    "bourse-default-5.jpg",
  ];
  const randIndex = Math.floor(Math.random() * defaults.length);
  return defaults[randIndex];
}

const ArticleImage = ({ name, className }) => {
  return (
    <img
      src={`${getImg(name)}`}
      alt={name}
      loading="lazy"
      onError={(ev) => {
        ev.currentTarget.onerror = null;
        ev.target.src = `${basePath}${getRandPic()}`;
      }}
      className={`w-full h-full ${className}`}
    />
  );
};

export default ArticleImage;
