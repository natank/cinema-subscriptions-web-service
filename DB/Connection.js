const mongoose = require('mongoose');

const URI =
	'mongodb+srv://dbUser:abcde@cluster0.lwcbk.mongodb.net/<dbname>?retryWrites=true&w=majority';

const connectDB = async () => {
	mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
	console.log('db connected...!');
};

module.exports = connectDB;
