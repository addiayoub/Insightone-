const connection = require("../config/connection");
const sql = require("mssql");
class _StockController {
  constructor() {}
  async getCapitalisationData(req, res) {
    try {
      const pool = await connection();
      const request = pool.request();
      const { date } = req.query;

      const formattedDate = new Date().toUTCString();
      console.log(formattedDate);
      const currentDate = date ? date : formattedDate;
      const query = `SELECT  ind.[SEANCE],[INDICE], [COURS_OUVERTURE],[COURS_PLUS_HAUT],[COURS_PLUS_BAS],[COURS_CLOTURE], TOTAL VOLUME, [VARIATION], VARIATION_LAST_YEAR, Volume_MC, volume_mb, Capitalisation FROM [Staging_DB].[BVC].[COURS_MASI_MADEX] ind inner join [Staging_DB].[BVC].HISTO_VOLUME vol on ind.SEANCE=vol.Seance inner join [Staging_DB].[BVC].HISTO_CAPITALISATION cap on ind.SEANCE=cap.Seance where ind.SEANCE  BETWEEN DATEADD(YEAR, -5, GETDATE()) AND @date and [INDICE]='MASI' order by ind.seance`;
      const result = await request
        .input("date", sql.Date, currentDate)
        .query(query);
      return res.json({ data: result.recordsets[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async stockChartData(req, res) {
    try {
      const pool = await connection();
      const request = pool.request();
      const { date } = req.query;

      const formattedDate = new Date().toUTCString();
      console.log(formattedDate);
      const currentDate = date ? date : formattedDate;
      console.log(
        "today date",
        formattedDate,
        "chosen date",
        currentDate,
        "date",
        date
      );
      const query = `SELECT  ind.[SEANCE],[INDICE], [COURS_OUVERTURE]
,[COURS_PLUS_HAUT] ,[COURS_PLUS_BAS],[COURS_CLOTURE], TOTAL VOLUME ,[VARIATION] FROM [Staging_DB].[BVC].[COURS_MASI_MADEX] ind inner join [Staging_DB].[BVC].HISTO_VOLUME vol on ind.SEANCE=vol.Seance where ind.SEANCE  BETWEEN DATEADD(YEAR, -5, GETDATE()) AND @date and [INDICE]='MASI' order by ind.seance`;
      const result = await request
        .input("date", sql.Date, currentDate)
        .query(query);
      return res.json({ data: result.recordsets[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async allQueries(req, res) {
    try {
      const pool = await connection();
      const { date } = req.query;
      console.log(req.query);
      const query = `select * from [REP].[PERFORMANCE_DU_MARCHE_PARAM1](@date)

      select * from [REP].[VOLUME_PAR_MARCHE_PARAM1](@date)

      select * from [REP].[PRINCIPALES_CONTRIB_PARAM1](@date)

      select * from [REP].[PRINCIPAUX_VOLUMES_MB_PARAM1](@date)

      select * from [REP].[PRINCIPAUX_VOLUMES_MC_PARAM1](@date)

      select * from [REP].[COMMENTAIRE_MARCHE_PARAM1](@date)

      select * from [REP].[EVOLUTION_MASI_PARAM1](@date)

      select * from [REP].[VOLUME_ECHANGE_PARAM1](@date)

      select * from [REP].[PLUS_FORTES_HAUSSES_BAISSES_VOLUME_PARAM1](@date)

      select * from [REP].[STATISTIQUES_SOCIETES_PARAM1](@date)

      select * from [REP].[STATISTIQUES_SOCIETES_2_PARAM1](@date)

      select * from [REP].[PERFORMANCE_ET_VOLUME_PARAM1](@date)

      select * from [REP].[TITRES_PLUS_ECHANGES_PARAM1](@date)

      select * from [REP].[PLUS_FORTES_VARIATIONS_PARAM1](@date)

      select * from [REP].[VAR_SECTEUR_PARAM1](@date)

      select * from [REP].[PERFORMANCE_DU_MARCHE_CAP_PARAM1](@date)

      select * from [REP].[MASI_VOLUME_PARAM_YTD](@date)

      select * from [REP].[MASI_VOLUME_PARAM1](@date)`;

      const request = pool.request();
      const result = await request.input("date", sql.Date, date).query(query);
      return res.json({ data: result.recordsets });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSliderData(req, res) {
    try {
      const pool = await connection();
      const request = pool.request();
      const { date } = req.query;
      const query = `SELECT TICKER ,[Seance] ,[Cours_Cloture] ,[Evolution] ,[Volume] FROM [ODS_DB].[BVC].[HISTO_VALEUR_AJUSTE] where SEANCE=(select max(seance)  FROM [ODS_DB].[BVC].[HISTO_VALEUR_AJUSTE] where SEANCE<= @date) order by Valeur`;
      const result = await request.input("date", sql.Date, date).query(query);
      return res.json({ data: result.recordsets[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const stockController = new _StockController();
module.exports = stockController;
