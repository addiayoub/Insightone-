const connection = require("../config/connection");
const sql = require("mssql");
class _OpcvmController {
  constructor() {}
  async index(req, res) {
    try {
      const pool = await connection();
      const dateDebut = new Date(req.query.dateDebut);
      const dateFin = new Date(req.query.dateFin);
      const societes = req.query.societes;
      const classes = req.query.classes;
      const types = req.query.types;
      const whereClasses = classes.map((cls) => `'${cls}'`).join(",");
      const whereSocietes = societes.map((soc) => `'${soc}'`).join(",");
      const whereTypes = types.map((typ) => `'${typ}'`).join(",");
      const query = `select Societe_Gestion ,Classification, A.key_opcvm, Code_OPCVM, DENOMINATION_OPCVM , exp(sum(log(Rdt)))-1 as Performance, POWER(exp(sum(log(Rdt))),(365.25/nullif(DATEDIFF(d,min_sea,max_sea),0)))-1 as Performance_AN,STDEVP(Rdt)*sqrt(52) as Volatilite, AVG(NB) as Nb_Semaine, SUM(AN)/nullif(AVG(NB),0) as EM_Hebdo , min(min_sea) as date_deb,max(max_sea) as date_fin from (select  key_opcvm, date_vl , lag(date_vl) over(partition by key_opcvm order by date_vl) as seance_prv , lag(VL_AJUSTE) over(partition by key_opcvm order by date_vl) as val_prv , VL_AJUSTE/nullif(lag(VL_AJUSTE) over(partition by key_opcvm order by date_vl),0) as Rdt , min(date_vl) over(partition by key_opcvm order by date_vl) as min_sea , max(date_vl) over(partition by key_opcvm order by date_vl desc) as max_sea, count(*)over(partition by key_opcvm ) as NB , AN from [ODS_DB].ASFIM.ASFIM_ODS val    inner join DataWarehouse.DIM.COUNTRY_CALENDAR cal on val.date_vl=cal.DATE_COMPLETE and HEBDO_FLAG=1 where  val.date_vl between @dateDebut and @dateFin and CLASSIFICATION in (${whereClasses}) and SOCIETE_GESTION in (${whereSocietes})) as A inner join ( select Societe_Gestion,Classification, DENOMINATION_OPCVM,Code_OPCVM,key_opcvm from (SELECT key_opcvm , DENOMINATION_OPCVM, Code_OPCVM , Societe_Gestion, Classification, DATE_EXPIRATION, count(*) over (partition by key_opcvm order by DATE_EXPIRATION desc) RN FROM [DataWarehouse].[DIM].OPCVM where CLASSIFICATION in (${whereClasses}) and type_OPC in (${whereTypes}) and SOCIETE_GESTION in (${whereSocietes}) and DATE_EFFECTIVE<DATEADD(year,-1,@dateFin) ) AA where RN =1) as B on A.key_opcvm=B.key_opcvm group by A.key_opcvm , Code_OPCVM,DENOMINATION_OPCVM,Societe_Gestion ,Classification,min_sea,max_sea`;
      console.log("query opcvm data", query);
      const request = pool.request();
      const result = await request
        .input("dateDebut", sql.Date, dateDebut)
        .input("dateFin", sql.Date, dateFin)
        .query(query);
      return res.json({ data: result.recordset });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getSocietesGestion(req, res) {
    try {
      const pool = await connection();
      const query = `SELECT distinct Societe_Gestion FROM [DataWarehouse].[DIM].[OPCVM] order by Societe_Gestion`;
      const request = pool.request();
      const result = await request.query(query);
      const societes = result.recordset.map((item) => item.Societe_Gestion);
      return res.json({ data: societes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getChartData(req, res) {
    try {
      const dateDebut = new Date(req.query.dateDebut);
      const dateFin = new Date(req.query.dateFin);
      const libelles = req.query.libelles;
      const whereLibelles = libelles.map((lib) => `'${lib}'`).join(",");
      console.log("chartData", req.query);
      const pool = await connection();
      const query = `SELECT DENOMINATION_OPCVM, VL_AJUSTE, Date_VL FROM ODS_DB.ASFIM.ASFIM_ODS WHERE Date_VL BETWEEN @dateDebut AND @dateFin and key_opcvm in (select distinct key_opcvm from DataWarehouse.DIM.OPCVM where DENOMINATION_OPCVM in (${whereLibelles})) ORDER BY Date_VL desc`;
      console.log("chart data query", query);
      const request = pool.request();
      const result = await request
        .input("dateDebut", sql.Date, dateDebut)
        .input("dateFin", sql.Date, dateFin)
        .query(query);
      return res.json({ data: result.recordset });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const opcvmController = new _OpcvmController();
module.exports = opcvmController;
