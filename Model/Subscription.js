import mongoose from 'mongoose';
var { Schema } = mongoose;

const subscription = new Schema({
	member: {
		type: Schema.Types.ObjectId,
		ref: 'member',
	},
	movies: {
		type: [{ type: Schema.Types.ObjectId, ref: 'movie' }],
		default: [],
	},
});

export default mongoose.model('subscription', subscription);
