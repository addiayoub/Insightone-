const connection = require("../config/connection");
const sql = require("mssql");
class _SectorialController {
  constructor() {}
  async index(req, res) {
    try {
      const pool = await connection();
      const { dateDebut, dateFin } = req.query;
      const request = pool.request();
      const query = `select seance, nom_indice, C_B100 as VL_B100,exp(sum (log(Rdt)) over (partition by  nom_indice order by seance))-1 as Rdt_cum ,sqrt(252)*STDEVP(Rdt) over (partition by  nom_indice order by seance) as Volatilite from (select hist.nom_indice, seance,valeur,first_value( valeur) over (partition by  hist.nom_indice order by seance) as F_V,100*valeur/first_value( valeur) over (partition by  hist.nom_indice order by seance) as C_B100, iif(first_value( valeur) over (partition by  hist.nom_indice order by seance)=valeur,1, (VALEUR/VALEUR_AVANT)) as Rdt FROM [ODS_DB].[ASFIM].[HISTO_INDICE] hist inner join [DataWarehouse].[DIM].[INDICE] ind on hist.nom_indice=ind.nom_indice where categorie='SECTORIEL' and SEANCE between @dateDebut and @dateFin) as A ORDER BY seance, nom_indice`;
      const newsQueryu = `select * from [MAYA].[News_TABLE](@dateDebutNews, @dateFinNews) ORDER BY seance DESC`;
      const news = await request
        .input("dateDebutNews", sql.Date, dateDebut)
        .input("dateFinNews", sql.Date, dateFin)
        .query(newsQueryu);
      const result = await request
        .input("dateDebut", sql.Date, dateDebut)
        .input("dateFin", sql.Date, dateFin)
        .query(query);
      const maxSeance = Math.max(
        ...result.recordsets[0].map((obj) => new Date(obj.seance).getTime())
      );
      const objectsWithMaxSeance = result.recordsets[0].filter(
        (obj) => new Date(obj.seance).getTime() === maxSeance
      );
      return res.status(200).json({
        lastSeance: objectsWithMaxSeance,
        data: result.recordsets[0],
        news: news.recordsets[0],
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const sectorialController = new _SectorialController();
module.exports = sectorialController;
