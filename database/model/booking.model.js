const { DataTypes } = require('sequelize');
const sequelize =require('../connection')


const bookingModel = sequelize.define('Booking', {
    user_name: { type: DataTypes.STRING, allowNull: false },
    user_email: { type: DataTypes.STRING, allowNull: false },
    start_ts: { type: DataTypes.DATE, allowNull: false },
    end_ts: { type: DataTypes.DATE, allowNull: false },
    party_size: { type: DataTypes.INTEGER, allowNull: false },
    status: { 
      type: DataTypes.ENUM('PENDING','CONFIRMED','CANCELLED','COMPLETED'),
      defaultValue: 'PENDING'
    }
  }, {
    timestamps: true
  });


module.exports=bookingModel