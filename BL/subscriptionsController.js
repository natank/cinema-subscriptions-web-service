import Subscription from '../Model/Subscription';

export async function findSubscriptions(req, res, next) {
	var { memberId, movieId } = req.body;
	var settings = { member: memberId };
	for (const property in settings) {
		if (!settings[property]) {
			delete settings[property];
		}
	}
	var docs = await Subscription.findOne(settings);
	const opts = [{ path: 'member' }, { path: 'movies' }];
	docs = await Subscription.populate(docs, opts);

	if (docs) {
		res.status(200).json(docs);
	} else res.status(204).end();
}

export async function createSubscription(req, res, next) {
	var { memberId, movieId } = req.body;
	try {
		var subscription = await Subscription.findOne({ member: memberId });
		if (!subscription) subscription = new Subscription({ member: memberId });
		subscription.movies.push(movieId);
		var result = await subscription.save();
		res.json({ result });
	} catch (err) {
		console.log(err);
		res.status(500).send('Subscription failed');
	}
}

export function deleteSubscription(req, res, next) {
	console.log('delete subscriptions route');
	res.json({ msg: 'delete subscriptions' });
}
