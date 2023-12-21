const connection = require("../config/connection");
const sql = require("mssql");
class _AnalyseController {
  constructor() {}
  async index(req, res) {
    try {
      const pool = await connection();
      const { titre } = req.query;
      const request = pool.request();
      const query1 = `select * from [REP].[INDICATEURS_TECHNIQUES_BVC](GETDATE(),'${titre}')`;
      const query2 = `select * from [REP].[ANALYSES_TECHNIQUES_BVC](GETDATE(),'BCP',0.01)`;
      const query3 = `select * from [REP].[PATTERNS_DE_CHANDELIERS](GETDATE(),'BCP')`;
      const query4 = `select * from [REP].[NEWS_BVC](GETDATE(),'BCP')`;
      const query5 = `select * from [REP].[MOYENNE_MOBILE_BVC](GETDATE(),'${titre}',0.01)`;
      const INDICATEURS_TECHNIQUES_BVC = await request.query(query1);
      // const ANALYSES_TECHNIQUES_BVC = await request.query(query2);
      // const PATTERNS_DE_CHANDELIERS = await request.query(query3);
      // const NEWS_BVC = await request.query(query4);
      const MOYENNE_MOBILE_BVC = await request.query(query5);
      const countTypePositions = (data, propertyNames) => {
        const count = { Achat: 0, Vente: 0, Neutre: 0 };

        data.forEach((item) => {
          propertyNames.forEach((propertyName) => {
            const lowerCasePropertyName = propertyName.toLowerCase();
            const propertyValue = item[propertyName]?.toLowerCase();

            if (propertyValue && propertyValue.includes("achat")) {
              count.Achat++;
            } else if (propertyValue && propertyValue.includes("vente")) {
              count.Vente++;
            } else if (propertyValue && propertyValue.includes("neutre")) {
              count.Neutre++;
            }
          });
        });

        return count;
      };
      const resumeText = (value) => {
        let text = "";
        if (value > 80) {
          text = "Achat Fort";
        }
        if (value <= 20) {
          text = "Vente Forte";
        } else if (value <= 40) {
          text = "Vente";
        } else if (value <= 60) {
          text = "Neutre";
        } else if (value <= 80) {
          text = "Achat";
        }
        return text;
      };
      const determineResume = (countObj) => {
        const { Achat, Vente, Neutre } = countObj;
        const achatValue = (50 * Achat) / (Achat + Vente + Neutre);
        const venteValue = (-50 * Vente) / (Achat + Vente + Neutre);
        const value = achatValue + venteValue + 50;
        const text = resumeText(value);
        return { value, text };
      };
      const count = {
        indecateurTech: countTypePositions(
          INDICATEURS_TECHNIQUES_BVC.recordsets[0],
          ["Type_position"]
        ),
        moyMobileBVC: countTypePositions(MOYENNE_MOBILE_BVC.recordsets[0], [
          "sign_simple",
          "sign_expo",
        ]),
      };
      const globalValue =
        (determineResume(count.moyMobileBVC).value +
          determineResume(count.indecateurTech).value) /
        2;
      const resume = {
        indecateurTech: {
          ...count.indecateurTech,
          resume: determineResume(count.indecateurTech),
        },
        moyMobileBVC: {
          ...count.moyMobileBVC,
          resume: determineResume(count.moyMobileBVC),
        },
        global: {
          value: globalValue,
          text: resumeText(globalValue),
        },
      };

      return res.json({
        indecateurTech: INDICATEURS_TECHNIQUES_BVC.recordsets[0],
        // analyseTech: ANALYSES_TECHNIQUES_BVC.recordsets[0],
        // patternsChandeliers: PATTERNS_DE_CHANDELIERS.recordsets[0],
        // newsBVC: NEWS_BVC.recordsets[0],
        moyMobileBVC: MOYENNE_MOBILE_BVC.recordsets[0],
        resume,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getTitres(req, res) {
    try {
      const pool = await connection();
      const request = pool.request();
      const query = `SELECT distinct
    [Valeur] FROM [Staging_DB].[BVC].[HISTO_VALEUR]`;
      const result = await request.query(query);
      const titres = result.recordset.map((item) => item.Valeur);
      return res.status(200).json({ titres });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const analyseController = new _AnalyseController();
module.exports = analyseController;
