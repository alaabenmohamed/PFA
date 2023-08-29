const pool = require("../model/db");

const enseignant_index_get = async (req, res) => {
  try {
    let sql = `SElect * from enseignant `;
    const allenseignant = await pool.query(sql);
    res.json(allenseignant.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const enseignant_index_get1 = async (req, res) => {
  try {
    
    const { id } = req.params;
    let sql = `SElect * from enseignant WHERE enseignant_id = '${id}' `;
    const allenseignant = await pool.query(sql);
    res.json(allenseignant.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const enseignant_delete = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE   FROM enseignant WHERE enseignant_id = '${id}'`;
    const deleteenseignant = await pool.query(sql);
    res.json("enseignant was deleted!");
  } catch (err) {
    console.log(err.message);
  }
};

const enseignant_post = async (req, res) => {
  try {
    const { mdp, mail, nom, prenom, img, admine_id } = req.body;
    let sql = `INSERT INTO enseignant (mdp, mail,nom,prenom,img,admine_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const newenseignant = await pool.query(sql, [
      mdp,
      mail,
      nom,
      prenom,
      img,
      admine_id,
    ]);

    res.json(newenseignant.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};
  const enseignant_put = async (req, res) =>  {
      try {
        const { id } = req.params;
        const { nom, prenom, mail, mdp, img} = req.body;
        let sql = `UPDATE enseignant SET nom='${nom}' , prenom ='${prenom}' ,mail='${mail}',mdp='${mdp}',img='${img}'  WHERE enseignant_id='${id}'  `;
        const updateenseignant = await pool.query(sql);
        res.json("enseignant was updated!");
      } catch (err) {
        console.error(err.message);
      }
    }

    const enseignant_Login = async (req, res) =>  {
      try {
        const {mdp,mail} = req.body;

        let sql = `
        SELECT *
        From  enseignant
        WHERE  enseignant.mdp='${mdp}'  AND enseignant.mail='${mail}' `;
        const newcondition = await pool.query(sql);
        res.json(newcondition.rows);
      } catch (err) {
        console.error(err.message);
      }
    };

module.exports = {
  enseignant_index_get,
  enseignant_Login,
  enseignant_put,
  enseignant_delete,
  enseignant_post,
  enseignant_index_get1,
};
