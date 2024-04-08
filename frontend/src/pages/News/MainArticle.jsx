import React from "react";
import ArticleImage from "./ArticleImage";
import moment from "moment";
const article = {
  Titre: "Boissons du Maroc veut distribuer 452 MDH de dividendes cette année",
  descrip:
    "Boissons du Maroc convoque ses actionnaires en Assemblée générale ordinaire le 7 mai 2024.",
  titres_bvc: null,
  sources: "boursenews.ma/marches",
  Date: "2024-04-05T00:00:00.000+00:00",
  article:
    "En ce qui concerne l'affectation des résultats, il sera proposé aux actionnaires de voter la distribution de 452,7 MDH de dividendes, soit 160 DH/action, contre 145,5 DH/action l'an dernier.    Pour rappel, les résultats du groupe sont en progression de 59,8% cette année, expliqué principalement par l’impact de la plus-value réalisée à la suite de la cession de l’activité « Eau Minérale ».   Pour 2024, Les résultats seront impactés par une augmentation significative des droits d’accises sur l’ensemble des produits alcooliques, ainsi que par la perte des volumes liés à l’arrêt du contrat de licence de production et de distribution des produits de la marque Heineken. Toutefois, il est attendu que les activités de la Société des Boissons du Maroc soient dynamisées par une réorientation stratégique de son portefeuille de produits et la qualité de sa relation de proximité avec l’ensemble de sa clientèle.",
  id: 1,
  image: "DEFAULT/4.png",
};
const MainArticle = (props) => {
  console.log("MAIN PROPS", props);
  const { image, Titre, descrip, onClick, Date, sources } = props;
  return (
    <div className="float-left mb-12 w-full sm:flex">
      <div className="float-left w-full pr-0 sm:w-1/2 sm:pr-4 md:w-auto">
        <div
          className="flex w-full items-center overflow-hidden md:h-[214px] md:w-[340px] cursor-pointer"
          onClick={onClick}
        >
          <ArticleImage name={image} />
        </div>
      </div>
      <div className="float-left mt-8 w-full pl-0 text-3xl font-bold leading-8 sm:mt-0 sm:w-1/2 sm:flex-1 sm:pl-4 md:block md:w-auto">
        <div className="w-full">
          <div>
            <p
              onClick={onClick}
              className="float-left hover:underline md:text-5xl md:leading-tight cursor-pointer"
            >
              {Titre}
            </p>
            <span className="text-gray-500 text-[14px]">
              Publié le {moment(Date).format("DD-MM-YYYY")}
            </span>
          </div>
          <div className="float-left mt-3 hidden text-sm font-normal leading-5 sm:line-clamp-2 md:text-base md:leading-6 md:line-clamp-3">
            <span className="font-normal text-primary">{sources}</span>
            <p>{descrip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainArticle;
