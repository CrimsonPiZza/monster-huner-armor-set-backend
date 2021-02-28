const mongoose = require("mongoose");
const ArmorsetModel = require('../models/armorset')
require('dotenv').config();

const authorObjectId = "603a476430029d40a4141661"

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
      title: "Rust Razor Set",
      image: "https://pbs.twimg.com/media/DqJP5DsUUAEP-ft?format=jpg&name=large",
      helm: "Rustrazor Helm",
      mail: "Rustrazor Mail",
      arms: "Rustrazor Vambraces",
      waist: "Rustrazor Faulds",
      greaves: "Rustrazor Greaves",
      author : authorObjectId
    },
    {
      title: "Pirate Set",
      image: "https://pbs.twimg.com/media/DnvELwLU4AAR3q5?format=jpg&name=large",
      helm: "Pirate Roger J",
      mail: "Pirate Jacket J",
      arms: "Pirate Cuffs J",
      waist: "Pirate Skirt J",
      greaves: "Pirate Pants J",
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


