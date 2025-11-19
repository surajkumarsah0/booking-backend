const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Test connection
sequelize.authenticate()
  .then(()=>console.log('Database connected!'))
  .catch(err=>console.error('DB error:', err));
sequelize.sync({alter:false})
.then(()=>console.log("db is synced!"))
.catch(err=>console.log("error in sync",err))

module.exports=sequelize
