const mongoose = require("mongoose");
const ArmorsetModel = require('../models/armorset')
const { shuffle, randomPickOneFromArray, generateName } = require("./customRandomizer")
require('dotenv').config();

const authorObjectId = [
  "603d165c38c800456c4a6f78",
  "603d168438c800456c4a6f79"
]
let images = [
  "https://i.ibb.co/3MNqtqX/Dr12aio-Vs-AATR-T.jpg",
  "https://i.ibb.co/bQFKFqq/Dv7y-Xk-ZUc-AAi-Fwt.jpg",
  "https://pbs.twimg.com/media/DqJP5DsUUAEP-ft?format=jpg&name=large",
  "https://pbs.twimg.com/media/DnvELwLU4AAR3q5?format=jpg&name=large",
  "https://farm4.staticflickr.com/3850/33028638343_1d4ba8b3d0_c.jpg",
  "https://farm3.staticflickr.com/2834/33965738756_df4c78b956_c.jpg",
  "https://farm4.staticflickr.com/3936/33841905565_63f848975a_c.jpg",
  "https://i.imgur.com/RHYIseD.jpeg",
  "https://i.imgur.com/18giVt6.jpeg",
  "https://i.imgur.com/177EVJD.jpeg",
  "https://farm3.staticflickr.com/2919/33847478366_fcd8084e68_c.jpg",
  "https://farm3.staticflickr.com/2945/33869675762_4952dd2900_c.jpg",
  "https://farm3.staticflickr.com/2945/33869675762_4952dd2900_c.jpg",
  "https://farm4.staticflickr.com/3949/33045099024_e846bb14bb_c.jpg",
  "https://farm3.staticflickr.com/2875/33699355850_39dd11ed82_c.jpg",
  "https://farm4.staticflickr.com/3948/33912558441_88b71297da_c.jpg",
  "https://farm4.staticflickr.com/3927/33669936010_bdb02002ff_c.jpg",
  "https://farm4.staticflickr.com/3927/33669936010_bdb02002ff_c.jpg",
  "https://farm3.staticflickr.com/2861/33758567161_567e673ab7_c.jpg",
  "https://farm3.staticflickr.com/2861/33758567161_567e673ab7_c.jpg",
  "https://farm3.staticflickr.com/2813/33163760684_3a9e7c6f32_c.jpg",
  "https://farm3.staticflickr.com/2930/33849226126_983444097b_c.jpg",
  "https://farm4.staticflickr.com/3954/33194524143_e269dae2bd_c.jpg",
  "https://farm4.staticflickr.com/3954/33194524143_e269dae2bd_c.jpg",
  "https://farm4.staticflickr.com/3954/33194524143_e269dae2bd_c.jpg",
  "https://farm4.staticflickr.com/3937/33877680221_94f4014ddb_c.jpg",
  "https://farm4.staticflickr.com/3936/33977331381_f5f3fd87f4_c.jpg",
  "https://farm3.staticflickr.com/2875/33183232834_9a236b9803_c.jpg",
  "https://farm3.staticflickr.com/2882/33212513204_26de63d9c8_c.jpg",
  "https://farm4.staticflickr.com/3951/33765185632_9e73067819_c.jpg",
  "https://farm4.staticflickr.com/3951/33765185632_9e73067819_c.jpg",
  "https://farm4.staticflickr.com/3951/33765185632_9e73067819_c.jpg",
  "https://farm3.staticflickr.com/2825/33640916060_d8efc90d72_c.jpg",
  "https://farm3.staticflickr.com/2904/33183981784_75ab35c320_c.jpg",
  "https://farm3.staticflickr.com/2911/33265196284_aebd15162b_c.jpg",
  "https://farm3.staticflickr.com/2932/33897559831_ece13471b7_c.jpg",
  "https://farm3.staticflickr.com/2830/33199432554_30d649ed9e_c.jpg",
  "https://farm3.staticflickr.com/2914/33925559811_a7d0ab2cc9_c.jpg",
  "https://farm3.staticflickr.com/2839/33926225431_09e9670cf9_c.jpg",
  "https://farm3.staticflickr.com/2859/33437618794_78fcdc7193_c.jpg"
]
const dummy = []

images = shuffle(images)

// Create Dummy Card
for (let image in images){
  let card = {
    title : `${generateName(10)} - ${generateName(6)}`,
    image : images[image],
    helm : `${generateName(5)} ${generateName(4)}`,
    mail : `${generateName(5)} ${generateName(4)}`,
    arms : `${generateName(5)} ${generateName(4)}`,
    waist : `${generateName(5)} ${generateName(4)}`,
    greaves : `${generateName(5)} ${generateName(4)}`,
    author : randomPickOneFromArray(authorObjectId),
    isFemale : randomPickOneFromArray([true, false]),
    isBladeMaster : randomPickOneFromArray([true, false])
  }
  dummy.push(card)
}


mongoose.connect(process.env.DBCONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  ArmorsetModel.create(dummy).then(()=>{
    console.log(`Added ${dummy.length} data(s).`)
    mongoose.disconnect()
  })
})


