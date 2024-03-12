const connection = require("../config/connection");
const checkFileExists = require("../utils/isFileExists");
class _CompoOpcvmController {
  async index(req, res) {
    try {
      const pool = await connection();
      const { opcvm } = req.query;
      const query = `
SELECT date, Gestionnaire, OPCVM, comp.Classification
                , FAMILLE
                , CLASSE
                , CATEGORIE
                , EMETTEUR
                , SECTEUR_BVC
                , SECTEUR_GICS
                , DEVISE
                , GARANTIE
                , tit.code
                , tit.LIBELLE
                , Quantité
                , cours
                , Valorisation
                ,
    CASE
        WHEN DATEDIFF(D, date, ECHEANCE) <= 30 THEN 'NOMINAL 1 MOIS'
        WHEN DATEDIFF(D, date, ECHEANCE) <= 90 THEN 'NOMINAL 3 MOIS'
        WHEN DATEDIFF(D, date, ECHEANCE) <= 180 THEN 'NOMINAL 6 MOIS'
        WHEN DATEDIFF(D, date, ECHEANCE) <= 365 THEN 'NOMINAL 1 AN'
        WHEN DATEDIFF(D, date, ECHEANCE) <= 730 THEN 'NOMINAL 2 ANS'
        WHEN DATEDIFF(D, date, ECHEANCE) <= 1095 THEN 'NOMINAL 3 ANS'
        WHEN DATEDIFF(D, date, ECHEANCE) <= 1825 THEN 'NOMINAL 5 ANS'
        WHEN DATEDIFF(D, date, ECHEANCE) <= 3650 THEN 'NOMINAL 10 ANS'
        WHEN DATEDIFF(D, date, ECHEANCE) <= 5475 THEN 'NOMINAL 15 ANS'
        WHEN DATEDIFF(D, date, ECHEANCE) <= 7300 THEN 'NOMINAL 20 ANS'
        WHEN DATEDIFF(D, date, ECHEANCE) <= 9125 THEN 'NOMINAL 25 ANS'
        WHEN DATEDIFF(D, date, ECHEANCE) <= 10950 THEN 'NOMINAL 25 ANS'
        ELSE IIF(categorie='LIQUIDITES','TMP',iif(categorie='PRIVATE EQUITY','MASI',iif(famille='OPCVM',op.DENOMINATION_OPCVM,bvc.LIBELLE)))
    END AS SIMULE
                , (valorisation/comp.[Valorisation globale]) * 100 as Poids
  FROM [Staging_DB].[SCRAP].[HISTO_OPC_COMPOSIT] comp
  inner join DataWarehouse.DIM.REF_TITRE tit
  on comp.code=tit.CODE
  left join DataWarehouse.DIM.TITRE_BVC bvc
  on bvc.CODE_ISIN=comp.Code and date between bvc.DATE_EFFECTIVE and bvc.DATE_EXPIRATION

  left join DataWarehouse.DIM.OPCVM op
  on op.Code_OPCVM=right(comp.Code,5) and date between op.DATE_EFFECTIVE and op.DATE_EXPIRATION
    where opcvm like '%'+@opc+'%'
  and Date=(select max(date)  FROM [Staging_DB].[SCRAP].[HISTO_OPC_COMPOSIT] where opcvm like '%'+@opc+'%')
  order by poids DESC
`;
      const request = pool.request();
      const result = await request.input("opc", opcvm).query(query);
      return res.json({ data: result.recordset });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getNoteInformation(req, res) {
    try {
      const pool = await connection();
      const { opcvm } = req.query;
      const query = `SELECT [DENOMINATION_OPCVM],[Code_Ptf] FROM [DataWarehouse].[DIM].[OPCVM] where DENOMINATION_OPCVM like '%'+@opc+'%'`;
      const request = pool.request();
      const result = await request.input("opc", opcvm).query(query);
      const resp = result.recordset[0];
      const isExists = checkFileExists("files", `${resp?.Code_Ptf}.pdf`);
      return res.json({ Code_Ptf: resp?.Code_Ptf, isExists });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
const CompositionOpcvmController = new _CompoOpcvmController();
module.exports = CompositionOpcvmController;
