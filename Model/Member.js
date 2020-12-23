import mongoose from 'mongoose';

const member = new mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	city: {
		type: String,
	},
});

export function dropCollection() {
	var p = new Promise(function (resolve, reject) {
		mongoose.connection.db.dropCollection('members', function (err, result) {
			if (err) reject(err);
			else resolve(result);
		});
	});
	return p;
}

export default mongoose.model('member', member);
