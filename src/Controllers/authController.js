const { Pool } = require('pg');
const createdTables = require('../createTables/tables')
const {hashPassword , comparePassword} = require('../helper/authHelper')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


dotenv.config()
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database:process.env.database,
  password:process.env.password,
  port: process.env.port,
});

// const connect = async ()=>{
//     const client = await pool.connect();
// }
// connect();

const signupController = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const query_instance = `INSERT INTO users (name,email,password) VALUES($1,$2,$3) RETURNING *`
        const HashedPassword = await hashPassword(password)
        console.log('connecting')
        const result = await pool.query(query_instance,[name,email,HashedPassword])
        if(!result.rows[0]){
            return res.status(405).send({
                success:false,
                message:"Error occured in storing data", 
            })
        }
        return res.status(200).send({
            success:true,
            result:result.rows[0],
            message:"Successfully inserted data",
        })
    }
    catch(error){
        return res.status(500).send({
            success:false,
            message:"Could not insert the data",
            error
        })
    }
    
 }

const loginController = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            res.send("Email or Password is missing")
        }
        const getUser = await pool.query(`SELECT * FROM users WHERE email=$1`,[email])
        const comparedPassword = await comparePassword(password,getUser.rows[0].password);
        if(!comparedPassword){
            return res.send({
                success:false,
                message:"Password is Invalid"
            })
        }
        const query_instance = `SELECT * FROM users WHERE email=$1 AND password=$2 `
        const result = await pool.query(query_instance,[email,getUser.rows[0].password]);
        if(!result.rows[0]){
            return res.status(405).send({
            success:false,
            message:"Invalid Credentials",
            })
            
        }
        const token = jwt.sign({_id:result.rows[0].id},process.env.SECRET_KEY)
        return res.status(200).send({
            success:true,
            message:"Successfully Accessed",
            result:result.rows[0],
            token,
        })
    }
    catch(error){
        return res.status(500).send({
            success:false,
            message:"Could not find the user",
            error,
        })
    }
}
const getAllUsers = async (req,res)=>{
    try{
        const query_instance=`select * from users`;
        const result = await pool.query(query_instance)

        if(!result.rows){
            return res.status(204).send({
                success:false,
                message:"No users are available",
            })
        }
        return res.status(200).send({
            success:true,
            message:"Successfully accessed users",
            data:result.rows
        })
    }
    catch(error){
        return res.status(500).send({
            success:false,
            message:"Could not access the users",
            error
        })
    }
}
const addUser = async (req,res)=>{
    try{
        const {name,email,role,organization}=req.body.formData;
        const {id}= req.body.user;
        const password='123';
        const HashedPassword = await hashPassword(password)
        const query_instance =`INSERT INTO users (name,email,password,role,organization,created_by) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;
        const result = await pool.query(query_instance,[name,email,HashedPassword,role,organization,id])
        console.log(result)
        if(!result.rows[0]){
            return res.status(204).send({
                success:false,
                message:"could not add user",
            })
        }
        return res.status(200).send({
            success:true,
            message:"Successfully added user",
            data:result.rows[0],
        })
    }
    catch(error){
        return res.status(500).send({
            success:false,
            message:"Could not add the user",
            error:error.message,
            detail:error.detail,
        })
    }
}


module.exports={
    signupController,
    loginController,
    getAllUsers,
    addUser,
}