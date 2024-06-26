const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const Review = require('./../../models/reviewModel');
const User = require('./../../models/userModel');


dotenv.config({ path: './config.env' });


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);


// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   }).then(async () => {
//     console.log('DB connection successful');
  
//     // Remover documentos com email nulo
//     await mongoose.connection.collection('users').deleteMany({ email: null });
  
//     console.log('Removed documents with null email');
//     process.exit();
//   }).catch(err => console.error(err));

mongoose
.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then (() => console.log('DB connection successful'))



// Read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);



// Import data into DB
const importData = async () => {
    try {
        await Tour.create(tours);
        await User.create(users, { validateBeforeSave: false });
        await Review.create(reviews);
        console.log('Data successfully loaded');
    }   catch (err) {
        console.log(err);
    }
    process.exit();
};

 // Delete All Data from DB
 const deleteData = async () => {
    try {
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log('Data successfully deleted');
    } catch (err) {
        console.log(err);
    }
    process.exit();
 };
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete')
    deleteData();


//  console.log(process.argv);
