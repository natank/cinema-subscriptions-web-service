import axios from 'axios';
import {
	findMemberSubscriptions,
	findMovieSubscriptions,
} from './subscriptionsController';
import Member, { dropCollection } from '../Model/Member';

export async function findMember(req, res, next) {
	var { _id } = req.params;
	try {
		var member = await Member.findById(_id);
		if (member) {
			var { _id, name, email, city } = member;
			res.json({ _id, name, email, city });
		} else res.status(204).end();
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
}

export async function findMembers(req, res, next) {
	try {
		var members = await Member.find();
		if (members) {
			members = members.map(member => {
				var { _id, name, email, city } = member;
				return { _id, name, email, city };
			});
			await Promise.all(members.map(member => findMemberSubscriptions(member)));
		}
		res.status(200).json(members);
	} catch (error) {
		res.status(500).end();
		console.log(error);
	}
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

export async function updateMember(req, res, next) {
	var { _id, name, email, city } = req.body;

	try {
		var result = await Member.updateOne({ _id }, { name, email, city });
		res.status(200).end();
	} catch (err) {
		res.status(500).end();
		throw err;
	}
}

export async function deleteMember(req, res, next) {
	var { _id } = req.params;
	await Member.deleteOne({ _id });
	res.status(200).end();
}
