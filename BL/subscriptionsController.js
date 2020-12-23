import Subscription from '../Model/Subscription';

export function findSubscriptions(req, res, next) {
	var { memberId, movieId } = req.body;
	var subscriptions = res.json({ msg: 'find subscriptions' });
}

export async function createSubscription(req, res, next) {
	var { memberId, movieId } = req.body;
	try {
		var subscription = await Subscription.findOne({ memberId });
		if (!subscription) subscription = new Subscription({ memberId });
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
