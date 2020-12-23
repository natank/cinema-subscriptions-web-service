import axios from 'axios';
import Movie from '../Model/Movie';
import Movies, { dropCollection } from '../Model/Movie';
export function findMovies(req, res, next) {
	res.status(202).json({ msg: 'find movies' });
}

export async function loadMovies(req, res, next) {
	try {
		var movies = await axios.get('https://api.tvmaze.com/shows');
		var moviesData = movies.data.map(movie => {
			return {
				name: movie.name,
				genres: movie.genres,
				image: movie.image.medium,
				premiered: movie.premiered, //"22013-06-24"
			};
		});
		try {
			await dropCollection();
		} catch (err) {
			console.log(err);
		}
		await Movie.insertMany(moviesData, (err, docs) => {
			if (err) throw err;
		});
	} catch (err) {
		res.status(404).json({ err: 'no data' });
	}
	res.json({ msg: 'loaded movies' });
}
