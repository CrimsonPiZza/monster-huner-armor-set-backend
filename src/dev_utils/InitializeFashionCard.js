const mongoose = require("mongoose");
const ArmorsetModel = require('../models/armorset')
require('dotenv').config();

const authorObjectId = "60392e3036215d2c5c45be0b"
const dummy = [
    {
      title : "Ex Baron Set - Winter Edition",
      image : "https://i.ibb.co/3MNqtqX/Dr12aio-Vs-AATR-T.jpg",
      helm : "Snowbaron Helm",
      mail : "Snowbaron Mail",
      arms : "Snowbaron Vambraces",
      waist : "Snowbaron Faulds",
      greaves : "Snowbaron Greave",
      author : authorObjectId
    },
    {
      title : "Gore Magala Set",
      image : "https://i.ibb.co/bQFKFqq/Dv7y-Xk-ZUc-AAi-Fwt.jpg",
      helm : "Gore Cap",
      mail : "Gore Vest",
      arms : "Gore Guard",
      waist : "Gore Coat",
      greaves : "Gore Leggings",
      author : authorObjectId
    },
    {
      title : "Ex Baron Set - Winter Edition",
      image : "https://i.ibb.co/3MNqtqX/Dr12aio-Vs-AATR-T.jpg",
      helm : "Snowbaron Helm",
      mail : "Snowbaron Mail",
      arms : "Snowbaron Vambraces",
      waist : "Snowbaron Faulds",
      greaves : "Snowbaron Greave",
      author : authorObjectId
    },
    {
      title : "Gore Magala Set",
      image : "https://i.ibb.co/bQFKFqq/Dv7y-Xk-ZUc-AAi-Fwt.jpg",
      helm : "Gore Cap",
      mail : "Gore Vest",
      arms : "Gore Guard",
      waist : "Gore Coat",
      greaves : "Gore Leggings",
      author : authorObjectId
    }
]
mongoose.connect(process.env.DBCONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  ArmorsetModel.create(dummy).then(()=>{
    console.log(`Added ${dummy.length} data(s).`)
  })
})


