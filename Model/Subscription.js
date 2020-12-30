import mongoose from 'mongoose';
var { Schema } = mongoose;

const subscription = new Schema({
	member: {
		type: Schema.Types.ObjectId,
		ref: 'member',
	},
	movies: [
		{
			movie: { type: Schema.Types.ObjectId, ref: 'movie' },
			date: String,
		},
	],
});

export default mongoose.model('subscription', subscription);
