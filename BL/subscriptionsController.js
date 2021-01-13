import Subscription from '../Model/Subscription';

export async function findSubscriptions(req, res, next) {
	var { memberId, movieId } = req.query;
	var docs = memberId
		? await findMemberSubscriptions(memberId)
		: await findMovieSubscriptions(movieId);

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

export async function findMemberSubscriptions(memberId) {
	var doc = await Subscription.findOne(
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

	doc = doc && (await Subscription.populate(doc, opts));

	var retval = doc
		? doc.movies.slice(doc.movies.length - 2, doc.movies.length)
		: [];
	return retval;
}

export async function findMovieSubscriptions(movieId) {
	// Movie subscription structure includes member name and date

	var movieId = movieId.toString();

	// find all the subscriptions where this movie is included

	var movieSubscriptions = await Subscription.find(
		{ 'movies.movie': movieId },
		'-_id member movies'
	);

	const memberPopulationOpts = [{ path: 'member', select: 'name' }];

	// return an empty array if there are no subscriptions for the movie
	try {
		movieSubscriptions = movieSubscriptions
			? await Subscription.populate(movieSubscriptions, memberPopulationOpts)
			: [];
	} catch (error) {
		movieSubscriptions = [];
	}

	if (movieSubscriptions.length > 0) {
		// Need to return only the member name and date fields of the subscription
		movieSubscriptions = movieSubscriptions.reduce((acc,subscription) => {
			var movie = subscription.movies.find(
				movie => movie.movie.toString() == movieId
			);
			if(subscription.member){
				var date = movie.date;
				acc.push( {
					member: {
						name: subscription.member.name,
						id: subscription.member._id.toString(),
					},
					date,
				});
			}
			return acc
		}, []);
	}

	return movieSubscriptions;
}
