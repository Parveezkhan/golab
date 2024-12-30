const { Pool } = require('pg');
const createdTables = require('../createTables/tables')
const dotenv = require('dotenv')


dotenv.config()
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database:process.env.database,
  password:process.env.password,
  port: process.env.port,
});


const createLab=async(req,res)=>{
    try{
       const {data,user} = req.body;
       const {type,platform,provider,config,instance} = data
       const query_instance=`INSERT INTO createlab (user_id,type,platform,provider,cpu,ram,storage,instance) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`
       const output = await pool.query(query_instance,[user.id,type,platform,provider,config.cpu,config.ram,config.storage,instance])
      
       if(!output.rows[0]){
        return res.status(405).send({
            success:false,
            message:"Could not store the lab catalogue",
        })
       }
       res.status(200).send({
        success:true,
        message:"Successfully stored the catalogue",
        output:output.rows[0],
       })
    }
    catch(error){
        return res.status(500).send({
            success:false,
            message:"Could not create the lab",
            error
        })
    }
}

module.exports = {
    createLab
}