const Data = require("../models/dataModel");
const connection = require("../config/connection");
const sql = require("mssql");
const getTitres = require("../utils/getTitres");
class _DataController {
  constructor() {}
  async index(req, res) {
    try {
      const data = await Data.find({}).sort({ seance: -1 });
      const fields = await Data.aggregate([
        {
          $project: {
            keys: { $objectToArray: "$$ROOT" },
          },
        },
        {
          $unwind: "$keys",
        },
        {
          $match: {
            "keys.k": { $ne: "__v" },
          },
        },
        {
          $group: {
            _id: null,
            keys: { $addToSet: "$keys.k" },
          },
        },
        {
          $project: {
            _id: 0,
            fields: "$keys",
          },
        },
      ]);
      res.status(200).json({ data, fields: fields[0] ? fields[0].fields : [] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const arrayData = req.body;
      const data = await Data.insertMany(arrayData);
      res.json({ data });
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  async getFields(req, res) {
    try {
      const fields = await Data.aggregate([
        {
          $project: {
            keys: { $objectToArray: "$$ROOT" },
          },
        },
        {
          $unwind: "$keys",
        },
        {
          $match: {
            "keys.k": { $ne: "__v" },
          },
        },
        {
          $group: {
            _id: null,
            keys: { $addToSet: "$keys.k" },
          },
        },
        {
          $project: {
            _id: 0,
            fields: "$keys",
          },
        },
      ]);

      // const fields = await Data.aggregate([
      //   {
      //     $project: {
      //       keys: { $objectToArray: "$$ROOT" },
      //     },
      //   },
      //   {
      //     $unwind: "$keys",
      //   },
      //   {
      //     $group: {
      //       _id: null,
      //       keys: { $addToSet: "$keys.k" },
      //     },
      //   },
      //   {
      //     $project: {
      //       _id: 0,
      //       fields: {
      //         $map: {
      //           input: "$keys",
      //           as: "field",
      //           in: {
      //             name: "$$field",
      //             type: { $type: { $ifNull: ["$$field", "null"] } },
      //           },
      //         },
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       "fields.name": 1,
      //       "fields.type": 1,
      //       _id: 0,
      //     },
      //   },
      //   {
      //     $match: {
      //       "fields.name": { $ne: "__v" },
      //     },
      //   },
      // ]);
      res.json({ fields: fields[0] ? fields[0].fields : [] });
    } catch (error) {
      res.json({ error });
    }
  }

  async destroy(req, res) {
    try {
      const deleteResult = await Data.deleteMany({});

      res.json({ message: deleteResult.deletedCount });
    } catch (error) {
      res.json({ error });
    }
  }

  async getSecteurs(req, res) {
    try {
      const pool = await connection();
      const result = await pool
        .request()
        .query(
          "SELECT  distinct Secteur FROM [Staging_DB].[BVC].[COURS_INDICE_SECTORIEL]"
        );
      const data = result.recordset.map((item) => item.Secteur);
      res.json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getData(req, res) {
    try {
      const dateDebut = new Date(req.query.dateDebut);
      const dateFin = new Date(req.query.dateFin);
      console.log("secteur", req.query.secteur);
      const secteursArray = req.query.secteur;
      console.log(secteursArray);

      const query = `SELECT * from Staging_DB.rep.MASI_VOLUME_PARAM_YTD(@dateDebut) ORDER BY seance DESC`;
      const query2 = `SELECT  *
                      FROM [Staging_DB].[BVC].[COURS_INDICE_SECTORIEL]
                      where Secteur in (${secteursArray
                        .map((_, index) => `@secteur${index}`)
                        .join(",")})
                      and [Seance] between @dateDebut and @dateFin
                      order by Seance`;
      const pool = await connection();
      const request = pool.request();

      secteursArray.forEach((secteurValue, index) => {
        request.input(`secteur${index}`, secteurValue);
      });
      const result = await request
        .input("dateDebut", sql.Date, dateDebut)
        .input("dateFin", sql.Date, dateFin)
        .query(query2);
      // console.log({data: result.recordsets[0]});
      return res.json({ data: result.recordsets[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDataWithContraints(req, res) {
    try {
      const dateDebut = new Date(req.query.dateDebut)
        .toISOString()
        .slice(0, 10);
      // .toISOString().slice(0, 10)
      const dateFin = new Date(req.query.dateFin).toISOString().slice(0, 10);
      console.log("dateDebut", dateDebut, "dateFin", dateFin);
      const { performance, volatilite, vqm, jours } = req.query.contraints;
      const conditions = [];

      if (performance.operateur && performance.value !== "") {
        conditions.push(
          `Performance ${performance.operateur} ${performance.value}`
        );
      }

      if (volatilite.operateur && volatilite.value !== "") {
        conditions.push(
          `Volatilite ${volatilite.operateur} ${volatilite.value}`
        );
      }

      if (vqm.operateur && vqm.value !== "") {
        conditions.push(`VQM ${vqm.operateur} ${vqm.value}`);
      }

      if (jours.operateur && jours.value !== "") {
        conditions.push(`NombreDeJours ${jours.operateur} ${jours.value}`);
      }

      const whereClause =
        conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

      console.log("whereClause", whereClause);
      const pool = await connection();
      const request = pool.request();
      const query = `SELECT * FROM (
        SELECT [Valeur], MAX([Cours_Cloture]) - MIN([Cours_Cloture]) as Performance, SQRT(AVG([Cours_Cloture] * [Cours_Cloture]) - AVG([Cours_Cloture]) * AVG([Cours_Cloture])) as Volatilite, SQRT(SUM([Evolution] * [Evolution]) / COUNT([Evolution])) as VQM, DATEDIFF(day, MIN([Seance]), MAX([Seance])) as NombreDeJours FROM [Staging_DB].[BVC].[HISTO_VALEUR] WHERE [Seance] BETWEEN '2022-12-30' AND '2023-11-15' GROUP BY [Valeur]
      ) mytable ${whereClause}`;
      const q = `SELECT
    [Valeur],
    MAX([Cours_Cloture]) - MIN([Cours_Cloture]) as Performance,
    DATEDIFF(day, MIN([Seance]), MAX([Seance])) as NombreDeJours
FROM
    [Staging_DB].[BVC].[HISTO_VALEUR]
WHERE
    [Seance] BETWEEN '2018-12-30' AND '2023-11-15'
GROUP BY
    [Valeur];`;
      console.log(q);
      const result = await request
        // .input("dateDebut", sql.Date, dateDebut)
        // .input("dateFin", sql.Date, dateFin)
        .query(query);
      console.log("result");
      const valeurs = result.recordsets[0].map((item) => item.Valeur);
      return res.json({ data: result.recordsets[0], valeurs: valeurs?.sort() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getChartData(req, res) {
    try {
      const dateDebut = new Date(req.query.dateDebut);
      const dateFin = new Date(req.query.dateFin);
      const valeurs = req.query.valeurs;
      console.log(req.query);
      const whereValeurs = valeurs.map((val) => `'${val}'`).join(",");
      const whereClause =
        valeurs?.length > 0
          ? `AND [VALEUR] IN (${valeurs.map((val) => `'${val}'`).join(", ")})`
          : "";
      const pool = await connection();
      const request = pool.request();
      const query = `SELECT CLE_TITRE,[VALEUR], [Cours_Ajuste], [SEANCE] FROM ODS_DB.[BVC].HISTO_VALEUR_AJUSTE WHERE [Seance] BETWEEN @dateDebut AND @dateFin and CLE_TITRE in (select distinct CLE_TITRE from DataWarehouse.DIM.TITRE_BVC where LIBELLE in (${whereValeurs})) ORDER BY [SEANCE] desc`;
      const query2 = `SELECT [VALEUR], [Cours_Ajuste], [SEANCE] FROM
      [Staging_DB].[BVC].[HISTO_VALEUR] 
      WHERE [Seance] BETWEEN @dateDebut AND @dateFin
      ${whereClause}
      ORDER BY [SEANCE]`;
      console.log(query);
      const result = await request
        .input("dateDebut", sql.Date, dateDebut)
        .input("dateFin", sql.Date, dateFin)
        .query(query);

      return res.json({ data: result.recordsets[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getIndices(req, res) {
    try {
      const pool = await connection();
      const request = pool.request();
      const query = `SELECT classe, categorie, S_CATEGORIE, [NOM_INDICE]
        FROM [DataWarehouse].[DIM].[INDICE]
        WHERE DEVISE='MAD'
        AND   FLAG_ACTIF = 1
        AND   S_CATEGORIE NOT IN ('MADE')
        AND   NATURE = 'CLOTURE'
        AND   NOM_INDICE NOT IN ('MOROCCO STOCK INDEX 20', 'MASI HORS SAMIR','REPO CAPITALISE', 'CASABLANCA ESG 10', 'ESGI', 'BCE20','EQUIPEMENTS ELECTRONIQUES & ELECTRIQUES')
        ORDER BY [CLASSE], [CATEGORIE], [NOM_INDICE]`;
      const result = await request.query(query);
      return res.json({ data: result.recordsets[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTitres(req, res) {
    try {
      const pool = await connection();
      const request = pool.request();
      const query = `select 'Actions cotés'classe,SECTEUR_ACTIVITE categorie,libelle from [DataWarehouse].[DIM].[TITRE_BVC]
      where FLAG_ACTIF =1
      and libelle not in ('IB MAROC.COM','')
      order by LIBELLE;

      select Societe_Gestion classe,Classification categorie,DENOMINATION_OPCVM libelle from [DataWarehouse].[DIM].opcvm
      where FLAG_ACTIF =1
      and DENOMINATION_OPCVM not in ('OBLIFUTUR','')
      order by DENOMINATION_OPCVM;

      select 'INDICE' GROUPE, CLASSE classe,iif(CATEGORIE='SECTORIEL',CATEGORIE,CATEGORIE) categorie,iif(CATEGORIE='SECTORIEL',NOM_INDICE,S_CATEGORIE)  as S_CATEGORIE, NOM_INDICE libelle from [DataWarehouse].[DIM].[INDICE] where FLAG_ACTIF =1 and NOM_INDICE not in ('MASI OUVERTURE','MASI RENTABILITE NET','MOROCCO STOCK INDEX 20','OPC ACTIONS','OPC CONTRACTUEL','OPC DIVERSIFIE','OPC MONETAIRE','OPC OCT','OPC OMLT','REPO CAPITALISE') and categorie not like '%MOYEN%' and categorie not in ('FNPP AJUSTE','AJUSTE','MOROCCO STOCK INDEX 20')`;
      const query2 = `select 'INDICE' GROUPE, CLASSE,iif(CATEGORIE='SECTORIEL',CATEGORIE,CATEGORIE) CATEGORIE,iif(CATEGORIE='SECTORIEL',NOM_INDICE,S_CATEGORIE)  as S_CATEGORIE, NOM_INDICE LIBELLE from [DataWarehouse].[DIM].[INDICE] where FLAG_ACTIF =1 and NOM_INDICE not in ('MASI OUVERTURE','MASI RENTABILITE NET','MOROCCO STOCK INDEX 20','OPC ACTIONS','OPC CONTRACTUEL','OPC DIVERSIFIE','OPC MONETAIRE','OPC OCT','OPC OMLT','REPO CAPITALISE') and categorie not like '%MOYEN%' --and categorie not like '%AJUSTE%' and categorie not in ('FNPP AJUSTE','AJUSTE','MOROCCO STOCK INDEX 20')

union
select 'OPCVM' GROUPE,iif(Classification in ('OMLT','OCT','MONETAIRE'),'TAUX',Classification) CLASSE, Societe_Gestion CATEGORIE,Classification
S_CATEGORIE,DENOMINATION_OPCVM LIBELLE from [DataWarehouse].[DIM].opcvm
where FLAG_ACTIF =1
and DENOMINATION_OPCVM not in ('OBLIFUTUR','OBLITOP','OBLIRENDEMENT')
union
select 'ACTIONS BVC'GROUPE,'ACTIONS'CLASSE, upper(GICS_SECTOR_FR) CATEGORIE,SECTEUR_ACTIVITE S_CATEGORIE,libelle LIBELLE from [DataWarehouse].[DIM].[TITRE_BVC] where FLAG_ACTIF =1 and libelle not in ('IB MAROC.COM','')`;
      const result = await request.query(query);
      // return res.json({
      //   data: result,
      // });
      return res.json({
        data: {
          Actions: result.recordsets[0],
          OPCVM: result.recordsets[1],
          Indices: result.recordsets[2],
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // You can remove it
  async getTitresWithReference(req, res) {
    try {
      const pool = await connection();
      const request = pool.request();
      const titres = await getTitres();
      return res.json({
        titres,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getIndicesChart(req, res) {
    try {
      const dateDebut = new Date(req.query.dateDebut);
      const dateFin = new Date(req.query.dateFin);
      const indices = req.query.indices;
      const whereClause =
        indices?.length > 0
          ? `AND [NOM_INDICE] IN (${indices
              .map((ind) => `'${ind}'`)
              .join(", ")})`
          : "";
      const pool = await connection();
      const request = pool.request();
      const query = `
        SELECT [NOM_INDICE], [SEANCE], [VALEUR], [VARIATION]
        FROM [ODS_DB].[ASFIM].[HISTO_INDICE]
        WHERE [SEANCE] BETWEEN @dateDebut AND @dateFin
        ${whereClause}
        ORDER BY [SEANCE]
      `;
      const result = await request
        .input("dateDebut", sql.Date, dateDebut)
        .input("dateFin", sql.Date, dateFin)
        .query(query);
      return res.json({ data: result.recordsets[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getComparaison(req, res) {
    try {
      const dateDebut = new Date(req.query.dateDebut);
      const dateFin = new Date(req.query.dateFin);
      const indices = req.query.indices;
      const whereClause =
        indices?.length > 0
          ? `AND [NOM_INDICE] IN (${indices
              .map((ind) => `'${ind}'`)
              .join(", ")})`
          : "";
      const pool = await connection();
      const request = pool.request();
      const query = `
        SELECT [NOM_INDICE], [SEANCE], [VALEUR], [VARIATION], first_value([VALEUR]) over (partition by [NOM_INDICE] ORDER BY [SEANCE]) as FV,
        100*[VALEUR]/first_value([VALEUR]) over (partition by [NOM_INDICE] ORDER BY [SEANCE]) as COTATION_B100,
        last_value([VALEUR]) over (partition by [NOM_INDICE], year([SEANCE])  ORDER BY [SEANCE]) as LV,
        [VALEUR]/last_value([VALEUR]) over (partition by [NOM_INDICE], year([SEANCE]) ORDER BY [SEANCE]) as AA
        FROM [ODS_DB].[ASFIM].[HISTO_INDICE]
        WHERE [SEANCE] BETWEEN @dateDebut AND @dateFin
        ${whereClause}
        ORDER BY [SEANCE]
      `;
      const result = await request
        .input("dateDebut", sql.Date, dateDebut)
        .input("dateFin", sql.Date, dateFin)
        .query(query);
      return res.json({ data: result.recordsets[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getFirstGraph(req, res) {
    try {
      const pool = await connection();
      console.log("getFirstGraph query", req.query);
      const dateDebut = new Date(req.query.dateDebut);
      const dateFin = new Date(req.query.dateFin);
      const indices = req.query.indices;
      const whereClause =
        indices?.length > 0
          ? `AND [NOM_INDICE] IN (${indices
              .map((ind) => `'${ind}'`)
              .join(", ")})`
          : "";
      const request = pool.request();
      const query = `select NOM_INDICE, year(seance) as ANNEE, exp(sum(log(Rdt)))-1 as Performance, STDEVP(Rdt)*sqrt(52) as Volatilite
from
(
select NOM_INDICE
      , SEANCE
      , valeur
      , lag(seance) over(partition by NOM_INDICE order by seance) as seance_prv
      , lag(valeur) over(partition by NOM_INDICE order by seance) as val_prv
      , valeur/lag(valeur) over(partition by NOM_INDICE order by seance) as Rdt

  FROM
        [ODS_DB].[ASFIM].[HISTO_INDICE] ind
            inner join DataWarehouse.DIM.COUNTRY_CALENDAR cal
            on ind.SEANCE=cal.DATE_COMPLETE
            where SEANCE between DATEFROMPARTS(year(@dateDebut)-1,12,31) and  DATEFROMPARTS(year(@dateFin),12,31)

            ${whereClause}
            and HEBDO_FLAG=1
) as A

group by NOM_INDICE , year(seance)
  order by ANNEE`;
      const result = await request
        .input("dateDebut", sql.Date, dateDebut)
        .input("dateFin", sql.Date, dateFin)
        .query(query);
      return res.json({ data: result.recordsets[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRendementRisqueData(req, res) {
    try {
      const pool = await connection();
      console.log("getRendementRisqueData query", req.query);
      const dateDebut = new Date(req.query.dateDebut);
      const dateFin = new Date(req.query.dateFin);
      const indices = req.query.indices;
      const whereClause =
        indices?.length > 0
          ? `AND [NOM_INDICE] IN (${indices
              .map((ind) => `'${ind}'`)
              .join(", ")})`
          : "";
      const request = pool.request();
      const query = `select

                               NOM_INDICE

                               , POWER(exp(sum(log(Rdt))), (365.25/DATEDIFF(d,min_sea,max_sea)))-1 as Performance

                               , STDEVP(Rdt)*sqrt(52) as Volatilite

from

(

select NOM_INDICE

                , SEANCE

                , valeur

                , lag(seance) over(partition by NOM_INDICE order by seance) as seance_prv

                , lag(valeur) over(partition by NOM_INDICE order by seance) as val_prv

                , valeur/lag(valeur) over(partition by NOM_INDICE order by seance) as Rdt

                , min(seance) over(partition by NOM_INDICE order by seance) as min_sea

                , max(seance) over(partition by NOM_INDICE order by seance desc) as max_sea

  FROM

        [ODS_DB].[ASFIM].[HISTO_INDICE] ind

                               inner join DataWarehouse.DIM.COUNTRY_CALENDAR cal

                               on ind.SEANCE=cal.DATE_COMPLETE

                               WHERE SEANCE between DATEFROMPARTS(year(@dateDebut),12,31) and  DATEFROMPARTS(year(@dateFin),12,31)
                              ${whereClause}
                               and HEBDO_FLAG=1

) as A

group by NOM_INDICE,min_sea,max_sea`;
      const result = await request
        .input("dateDebut", sql.Date, dateDebut)
        .input("dateFin", sql.Date, dateFin)
        .query(query);
      return res.json({ data: result.recordsets[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async test(req, res) {
    try {
      const pool = await connection();
      const request = pool.request();
      const q = `SELECT * FROM (SELECT
    [Valeur],
    MAX([Cours_Cloture]) - MIN([Cours_Cloture]) as Performance,

    AVG([Cours_Cloture] * [Cours_Cloture]) - AVG([Cours_Cloture]) * AVG([Cours_Cloture]) as Volatilite,

    SUM([Evolution] * [Evolution]) / COUNT([Evolution]) as VQM,

    DATEDIFF(day, MIN([Seance]), MAX([Seance])) as NombreDeJours
FROM
    [Staging_DB].[BVC].[HISTO_VALEUR]
WHERE
    [Seance] BETWEEN '2018-12-30' AND '2023-11-15'
GROUP BY
    [Valeur]) mytable
    WHERE Volatilite <= 0 OR VQM <= 0`;
      const result = await request.query(q);
      return res.json({ data: result.recordsets[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async allData(req, res) {
    try {
      const query = `SELECT  Seance, Valeur, Variation, Secteur FROM [Staging_DB].[BVC].[COURS_INDICE_SECTORIEL]`;
      const query2 = `SELECT
    Secteur AS Sector,
    (
        SELECT
            Seance,
            Valeur,
            Variation
        FROM [Staging_DB].[BVC].[COURS_INDICE_SECTORIEL] AS InnerTable
        WHERE InnerTable.Secteur = OuterTable.Secteur
        FOR JSON PATH
    ) AS Data
FROM [Staging_DB].[BVC].[COURS_INDICE_SECTORIEL] AS OuterTable
GROUP BY Secteur;`;
      const pool = await connection();
      const request = pool.request();
      const result = await request.query(query2);
      return res.json({ data: result.recordset });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getPoids(req, res) {
    try {
      const pool = await connection();
      const request = pool.request();
      const query = `SELECT [SEANCE],[CODE_ISIN],[LIBELLE],[POIDS] FROM [Staging_DB].[BVC].[PONDERATION] where seance =(SELECT max([SEANCE]) FROM [Staging_DB].[BVC].[PONDERATION] where SEANCE<='2022-12-31') AND LIBELLE = 'BCP'`;
      const result = await request.query(query);
      return res.json({ data: result.recordset });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const dataController = new _DataController();
module.exports = dataController;
