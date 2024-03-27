import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// const basePath = `${window.location.origin}/titres_pics/`;
const basePath = `/src/assets/images/titres_pics/`;
const bp = "/src/assets/images/logo_images/";

const getImg = (name) => {
  const src = `${basePath}${name}.png`;
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

// <LazyLoadImage
//   alt={name}
//   src={`${getImg(name)}`} // use normal <img> attributes as props
//   // width={"100%"}
//   height={"100%"}
//   effect="blur"
//   onError={(ev) => {
//     ev.currentTarget.onerror = null;
//     ev.target.src = `${basePath}${getRandPic()}`;
//   }}
//   className={`w-full h-full bg-error ${className}`}
//   style={{ border: "1px solid", width: "100%" }}
// />;

export default ArticleImage;
