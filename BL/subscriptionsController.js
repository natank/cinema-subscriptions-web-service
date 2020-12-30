import Subscription from '../Model/Subscription';

export async function findSubscriptions(req, res, next) {
	var { memberId, movieId } = req.body;
	var docs = memberId
		? await findMemberSubscriptions(memberId)
		: await findMovieSubscriptions(movieId);

	async function findMemberSubscriptions(memberId) {
		var docs = await Subscription.findOne(
			{ member: memberId },
			'-_id -movies._id -member'
		);

		const opts = [
			{ path: 'member' },
			{
				path: 'movies',
				select: { _id: 0 },
				populate: [
					{
						path: 'movie',
						select: { _id: 1, name: 1 },
					},
				],
			},
		];

		docs = await Subscription.populate(docs, opts);
		return docs;
	}

	async function findMovieSubscriptions(movieId) {
		var docs = await Subscription.find(
			{ 'movies.movie': movieId },
			'-_id member'
		);

		const opts = [{ path: 'member', select: 'name' }];

		docs = await Subscription.populate(docs, opts);

		return docs;
	}

	if (docs) {
		res.status(200).json(docs);
	} else res.status(204).end();
}

export async function createSubscription(req, res, next) {
	var { memberId, movieId, date } = req.body;
	try {
		var subscription = await Subscription.findOne({ member: memberId });
		if (!subscription) subscription = new Subscription({ member: memberId });
		subscription.movies.push({ movie: movieId, date });
		var result = await subscription.save();
		res.json(result);
	} catch (err) {
		console.log(err);
		res.status(500).send('Subscription failed');
	}
}

export function deleteSubscription(req, res, next) {
	console.log('delete subscriptions route');
	res.json({ msg: 'delete subscriptions' });
}
