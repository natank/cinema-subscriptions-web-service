import mongoose from 'mongoose';
var { Schema } = mongoose;

const subscription = new Schema({
	memberId: Schema.Types.ObjectId,
	movies: {
		type: Array,
		default: [],
	},
});

export default mongoose.model('subscription', subscription);
