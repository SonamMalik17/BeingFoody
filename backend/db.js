const mongoose = require('mongoose');
// const uri = 'mongodb+srv://maliksonam0301:Sonam%4017171771%40@beingfoodycluster.gdvudyo.mongodb.net/BeingFoody?retryWrites=true&w=majority';

const uri="mongodb://maliksonam0301:Sonam%4017171771%40@ac-i5i15ml-shard-00-00.gdvudyo.mongodb.net:27017,ac-i5i15ml-shard-00-01.gdvudyo.mongodb.net:27017,ac-i5i15ml-shard-00-02.gdvudyo.mongodb.net:27017/BeingFoody?ssl=true&replicaSet=atlas-g6be9y-shard-0&authSource=admin&retryWrites=true&w=majority";
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
    const fetched_data1=mongoose.connection.db.collection("BeingFoody_items");
    const data1 = await fetched_data1.find({}).toArray();
    global.BeingFoody_items = data1;
    const fetched_data2=mongoose.connection.db.collection("BeingFoody_category");
    const data2 = await fetched_data2.find({}).toArray();
    global.BeingFoody_category = data2;
    // fetched_data.find({}).toArray(function(err,data){
    //   if(err) console.log(err);
    //   else{
    //     console.log(data);
    //     global.BeingFoody_items=data;
    //   }
    // })


    // const arr = await fetched_data.find({}).toArray();
    // arr.forEach(function(err,data){
    //   if(err) 
    //     console.log(err);
    //   else{
    //     global.BeingFoody_items=data;
    //   }
    // })
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = connectToMongoDB;
