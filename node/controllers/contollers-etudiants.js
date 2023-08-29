const pool = require("../model/db");

const etudiant_index_get = async (req, res) => {
  try {
    let sql = `SElect * from etudiant `;
    const alletudiant = await pool.query(sql);
    res.json(alletudiant.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const etudiant_delete = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE   FROM etudiant WHERE etudiant_id = '${id}'`;
    const deleteetudiant = await pool.query(sql);
    res.json("etudiant was deleted!");
  } catch (err) {
    console.log(err.message);
  }
};

const etudiant_post = async (req, res) => {
  try {
    const { nom, prenom, mail, note, absence, img, classe_id } = req.body;
      let sql = `INSERT INTO etudiant (nom,prenom,mail,note,absence,img,classe_id ) VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING *`;
    // let sql = `INSERT INTO etudiant (nom,prenom,mail,note,absence,img,classe_id ) VALUES ('${nom}','${prenom}','${mail}','${note}','${absence}','${img}', '${classe_id}') RETURNING *`;

    const newetudiant = await pool.query(sql, [
      nom,
      prenom,
      mail,
      note,
      absence,
      img,
      classe_id,
    ]);

    res.json(newetudiant.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};
const etudiant_putadmine = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, mail } = req.body;
    let sql = `UPDATE etudiant SET nom='${nom}' , prenom ='${prenom}' , mail='${mail}' WHERE etudiant_id='${id}'  `;
    const updateetudiant = await pool.query(sql);
    res.json("etudiant was updated!");
  } catch (err) {
    console.error(err.message);
  }
};
const etudiant_putprof = async (req, res) => {
  try {
    const { id } = req.params;
    const { note, absence } = req.body;
    let sql = `UPDATE etudiant SET note ='${note}',absence='${absence}'    WHERE etudiant_id='${id}'  `;
    const updateetudiant = await pool.query(sql);
    res.json("etudiant was updated!");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  etudiant_index_get,
  etudiant_delete,
  etudiant_post,
  etudiant_putadmine,
  etudiant_putprof,
};
