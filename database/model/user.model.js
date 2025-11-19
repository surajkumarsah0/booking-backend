const { DataTypes } = require('sequelize');
const sequelize=require('../connection')

const userModel=sequelize.define(
    'User',{
        username:{
            type:DataTypes.STRING,
            allownull:false,
            unique:true,
        },
        password:{
            type:DataTypes.STRING,
            allownull:false
        }
    },
    {
         timestamp:true
    }
)

module.exports=userModel