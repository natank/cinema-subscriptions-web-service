import mongoose from 'mongoose';

const URI =
	'mongodb+srv://dbUser:abcde@cluster0.lwcbk.mongodb.net/node-final?retryWrites=true&w=majority';

export default async function connectDB() {
	mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
	console.log('db connected...!');
}
