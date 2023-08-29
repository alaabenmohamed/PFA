const pool = require("../model/db");


const admine_index_get = async (req, res) =>
{
    try {
      let sql = `SElect * from admine `;
      const alladmine = await pool.query(sql);
      res.json(alladmine.rows);
    } catch (err) {
      console.error(err.message);
    }
  }

  const admine_delete = async (req, res) => {
    try {
      const { id } = req.params;
      let sql = `DELETE   FROM Admine WHERE admine_id = '${id}'`;
      const deleteadmine = await pool.query(sql);
      res.json("admine was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  }

    const admine_post = async (req, res) => {
          try {
            const { nom,mail} = req.body;
           let sql = `INSERT INTO admine (nom,mail) VALUES ($1, $2) RETURNING *`;
        
            const newadmine = await pool.query(sql,[
                nom,mail
            ]);
        
            res.json(newadmine.rows[0]);
          } catch (err) {
            console.error(err.message);
          }
        };
    //   const admine_put = async (req, res) =>  {
    //       try {
    //         const { id } = req.params;
    //         const { nom, prenom,email,mdp, img} = req.body;
    //         let sql = `UPDATE Admine SET nom='${nom}' , prenom ='${prenom}' ,email='${email}',mdp='${mdp}',img='${img}'  WHERE admine_id='${id}'  `;
    //         const updateadmine = await pool.query(sql);
    //         res.json("admine was updated!");
    //       } catch (err) {
    //         console.error(err.message);
    //       }
    //     }
        


    //     const admine_Login = async (req, res) =>  {
    //       try {
    //         const {mdp,mail} = req.body;
        
    //         let sql = `
    //         SELECT *  
    //         From  Admine
    //         WHERE  Admine.mdp='${mdp}'  AND Admine.email='${mail}' `;
    //         const newcondition = await pool.query(sql);
    //         res.json(newcondition.rows);
    //       } catch (err) {
    //         console.error(err.message);
    //       }
    //     };
    




 module.exports = {admine_index_get,admine_post};