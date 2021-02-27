const mongoose = require("mongoose");
const ArmorsetModel = require('../models/armorset')
require('dotenv').config();

module.exports = async () => {
  const connection = await mongoose.connect(process.env.DBCONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  await mongoose.connection.once('open', async ()=>{
    if( await ArmorsetModel.countDocuments({}) <= 0 ){
      console.log("First Time Database initialization!")
      const dummy = [
        {
          title : "Ex Baron Set - Winter Edition",
          image : "https://i.ibb.co/3MNqtqX/Dr12aio-Vs-AATR-T.jpg",
          helm : "Snowbaron Helm",
          mail : "Snowbaron Mail",
          arms : "Snowbaron Vambraces",
          waist : "Snowbaron Faulds",
          greaves : "Snowbaron Greave",
          author : "60392e3036215d2c5c45be0b"
        },
        {
          title : "Gore Magala Set",
          image : "https://i.ibb.co/bQFKFqq/Dv7y-Xk-ZUc-AAi-Fwt.jpg",
          helm : "Gore Cap",
          mail : "Gore Vest",
          arms : "Gore Guard",
          waist : "Gore Coat",
          greaves : "Gore Leggings",
          author : "60392e3036215d2c5c45be0b"
        },
        {
          title : "Ex Baron Set - Winter Edition",
          image : "https://i.ibb.co/3MNqtqX/Dr12aio-Vs-AATR-T.jpg",
          helm : "Snowbaron Helm",
          mail : "Snowbaron Mail",
          arms : "Snowbaron Vambraces",
          waist : "Snowbaron Faulds",
          greaves : "Snowbaron Greave",
          author : "60392e3036215d2c5c45be0b"
        },
        {
          title : "Gore Magala Set",
          image : "https://i.ibb.co/bQFKFqq/Dv7y-Xk-ZUc-AAi-Fwt.jpg",
          helm : "Gore Cap",
          mail : "Gore Vest",
          arms : "Gore Guard",
          waist : "Gore Coat",
          greaves : "Gore Leggings",
          author : "60392e3036215d2c5c45be0b"
        }
      ]

      await ArmorsetModel.create(dummy)
    }
  })

  return connection.connection.db;
};