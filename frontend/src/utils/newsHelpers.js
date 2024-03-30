const picsRef = [
  {
    name: "AFMA",
    count: 2,
  },
  {
    name: "AFRIC INDUSTRIES SA",
    count: 2,
  },
  {
    name: "AFRIQUIA GAZ",
    count: 2,
  },
  {
    name: "AGMA",
    count: 2,
  },
  {
    name: "AKDITAL",
    count: 2,
  },
  {
    name: "ALLIANCES",
    count: 3,
  },
  {
    name: "ALUMINIUM DU MAROC",
    count: 2,
  },
  {
    name: "ARADEI CAPITAL",
    count: 2,
  },
  {
    name: "ATLANTASANAD",
    count: 3,
  },
  {
    name: "ATTIJARIWAFA BANK",
    count: 4,
  },
  {
    name: "AUTO HALL",
    count: 2,
  },
  {
    name: "AUTO NEJMA",
    count: 2,
  },
  {
    name: "BALIMA",
    count: 4,
  },
  {
    name: "BANK OF AFRICA",
    count: 3,
  },
  {
    name: "BCP",
    count: 2,
  },
  {
    name: "BMCI",
    count: 3,
  },
  {
    name: "CARTIER SAADA",
    count: 2,
  },
  {
    name: "CDM",
    count: 2,
  },
  {
    name: "CIH",
    count: 2,
  },
  {
    name: "CIMENTS DU MAROC",
    count: 2,
  },
  {
    name: "CMA CGM",
    count: 2,
  },
  {
    name: "COLORADO",
    count: 2,
  },
  {
    name: "COSUMAR",
    count: 2,
  },
  {
    name: "CTM",
    count: 2,
  },
  {
    name: "DARI COUSPATE",
    count: 2,
  },
  {
    name: "DELATTRE LEVIVIER MAROC",
    count: 1,
  },
  {
    name: "DELTA HOLDING",
    count: 2,
  },
  {
    name: "DISTY TECHNOLOGIES",
    count: 1,
  },
  {
    name: "DISWAY",
    count: 2,
  },
  {
    name: "DOUJA PROM ADDOHA",
    count: 2,
  },
  {
    name: "ENNAKL",
    count: 2,
  },
  {
    name: "EQDOM",
    count: 2,
  },
  {
    name: "FENIE BROSSETTE",
    count: 2,
  },
  {
    name: "HPS",
    count: 1,
  },
  {
    name: "IB MAROC.COM",
    count: 2,
  },
  {
    name: "IMMORENTE INVEST",
    count: 2,
  },
  {
    name: "INVOLYS",
    count: 2,
  },
  {
    name: "ITISSALAT AL-MAGHRIB",
    count: 4,
  },
  {
    name: "JET CONTRACTORS",
    count: 2,
  },
  {
    name: "LABEL VIE",
    count: 2,
  },
  {
    name: "LAFARGEHOLCIM MAROC",
    count: 2,
  },
  {
    name: "LESIEUR CRISTAL",
    count: 2,
  },
  {
    name: "M2M Group",
    count: 3,
  },
  {
    name: "MAGHREB OXYGENE",
    count: 2,
  },
  {
    name: "MAGHREBAIL",
    count: 2,
  },
  {
    name: "MANAGEM",
    count: 2,
  },
  {
    name: "MAROC LEASING",
    count: 2,
  },
  {
    name: "MED PAPER",
    count: 2,
  },
  {
    name: "MICRODATA",
    count: 1,
  },
  {
    name: "MINIERE TOUISSIT",
    count: 2,
  },
  {
    name: "MUTANDIS SCA",
    count: 2,
  },
  {
    name: "OULMES",
    count: 3,
  },
  {
    name: "PROMOPHARM S.A",
    count: 1,
  },
  {
    name: "REALISATIONS MECANIQUES",
    count: 3,
  },
  {
    name: "REBAB COMPANY",
    count: 1,
  },
  {
    name: "RES DAR SAADA",
    count: 2,
  },
  {
    name: "RISMA",
    count: 2,
  },
  {
    name: "S.M MONETIQUE",
    count: 2,
  },
  {
    name: "SAHAM ASSURANCE",
    count: 2,
  },
  {
    name: "SALAFIN",
    count: 2,
  },
  {
    name: "SMI",
    count: 1,
  },
  {
    name: "SNEP",
    count: 2,
  },
  {
    name: "SOCIETE DES BOISSONS DU MAROC",
    count: 1,
  },
  {
    name: "SODEP-Marsa Maroc",
    count: 2,
  },
  {
    name: "SONASID",
    count: 2,
  },
  {
    name: "SOTHEMA",
    count: 1,
  },
  {
    name: "STOKVIS NORD AFRIQUE",
    count: 2,
  },
  {
    name: "STROC INDUSTRIE",
    count: 1,
  },
  {
    name: "TAQA MOROCCO",
    count: 2,
  },
  {
    name: "TGCC S.A",
    count: 2,
  },
  {
    name: "TIMAR",
    count: 2,
  },
  {
    name: "TOTALENERGIES MARKETING MAROC",
    count: 2,
  },
  {
    name: "UNIMER",
    count: 2,
  },
  {
    name: "WAFA ASSURANCE",
    count: 2,
  },
  {
    name: "ZELLIDJA S.A",
    count: 1,
  },
];

const getPicsCount = (name) => {
  const find = picsRef.find(
    (ref) => ref.name.toLowerCase() === name?.toLowerCase()
  );
  if (find) {
    return {
      folderName: find.name,
      count: find.count,
    };
  }
  return {
    folderName: "DEFAULT",
    count: 5,
  };
};

const getRandPic = (name) => {
  const { count, folderName } = getPicsCount(name);
  const randPic = Math.floor(Math.random() * count) + 1;
  console.log("folder name", `${folderName}/${randPic}.png`);
  return `${folderName}/${randPic}.png`;
};
export { getRandPic };
