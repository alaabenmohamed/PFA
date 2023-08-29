const pool = require("../model/db");

const classe_index_get = async (req, res) => {
  try {
    let sql = `SElect * from classe `;
    const allclasse = await pool.query(sql);
    res.json(allclasse.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const classe_index_get2 = async (req, res) => {
  try {
      const { id } = req.params;
    let sql = `SElect * from classe  WHERE enseignant_id = '${id}' `;
     const allclasse = await pool.query(sql);
    res.json(allclasse.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const classe_delete = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE   FROM classe WHERE classe_id = '${id}'`;
    const deleteclasse = await pool.query(sql);
    res.json("classe was deleted!");
  } catch (err) {
    console.log(err.message);
  }
};

const classe_post = async (req, res) => {
  try {
    const { nom, enseignant_id } = req.body;
    let sql = `INSERT INTO classe (nom,enseignant_id) VALUES ($1,$2) RETURNING *`;

    const newclasse = await pool.query(sql, [nom, enseignant_id]);

    res.json(newclasse.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};
const classe_put = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom } = req.body;
    let sql = `UPDATE classe SET nom='${nom}'  WHERE classe_id='${id}'  `;
    const updateclasse = await pool.query(sql);
    res.json("classe was updated!");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  classe_index_get,
  classe_index_get2,
  classe_put,
  classe_delete,
  classe_post,
};
