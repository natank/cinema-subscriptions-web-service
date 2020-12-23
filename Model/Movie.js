import mongoose from 'mongoose';

const Movie = new mongoose.Schema({
	name: String,
	genres: Array,
	premiered: String,
	image: String,
});

export function dropCollection() {
	var p = new Promise(function (resolve, reject) {
		mongoose.connection.db.dropCollection('movies', function (err, result) {
			if (err) reject(err);
			else resolve(result);
		});
	});
	return p;
}

export default mongoose.model('movie', Movie);
