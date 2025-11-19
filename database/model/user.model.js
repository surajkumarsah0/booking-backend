const { DataTypes } = require('sequelize');
const sequelize=require('../connection')
try {
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

} catch (error) {
    console.error("Error defining user model:", error);
}

module.exports=userModel