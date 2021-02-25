const mongoose=  require('mongoose');

const Dishes = require('./Models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect  = mongoose.connect(url,{
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
});

connect.then((db)=>{
    console.log("Connected to Server");
    Dishes.create({
        name: "Test",
        description: "description" 
    }) 
    .then((dish)=>{
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id,{
            $set: {description :"Updated test"}
        },{ 
            new: true 
        }).exec();
    })
    .then((dish)=>{
        console.log("Modified Dish: "+ dish);
        dish.comments.push({
            rating: 4,
            comment: "Nice Dish",
            author: "Lewis Cassano" 
        });

        return dish.save();
    })
    .then((dish)=>{
        console.log("Commented Dish: "+ dish)
        return Dishes.deleteMany({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    })
});