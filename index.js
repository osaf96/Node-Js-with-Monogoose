const mongoose=  require('mongoose');

const Dishes = require('./Models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect  = mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});

connect.then((db)=>{
    console.log("Connected to Server");
    // Dishes.deleteMany({})
    // .then(()=>{
    //     console.log("Removed!");
    // });
    Dishes.create({
        name: "Test",
        description: "description" 
    }) 
    .then((dish)=>{
        console.log(dish);
        return Dishes.find({}).exec();
    })
    .then((dishes)=>{
        console.log("All Dished: "+ dishes);
        return Dishes.deleteMany({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    })
});