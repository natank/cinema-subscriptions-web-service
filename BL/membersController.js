import axios from 'axios';
import Member, { dropCollection } from '../Model/Member';

export function findMembers(req, res, next) {
	console.log('find members');
	res.json({ msg: 'find members' });
}

export async function loadMembers(req, res, next) {
	try {
		var members = await axios.get('https://jsonplaceholder.typicode.com/users');

		var memberNames = members.data.map(member => {
			return {
				name: member.name,
				email: member.email,
				city: member.address.city,
			};
		});
		try {
			await dropCollection();
		} catch (err) {
			console.log(err);
		}
		await Member.insertMany(memberNames, (err, docs) => {
			if (err) throw err;
		});
	} catch (err) {
		res.status(404).json({ err: 'no data' });
		throw err;
	}
	res.json({ msg: 'loaded members' });
}

export async function createMember(req, res, next) {
	var { name, email, city } = req.body;
	var member = new Member({ name, email, city });
	try {
		var result = await member.save();
		res.status(200).json(result);
	} catch (err) {
		throw err;
	}
}
