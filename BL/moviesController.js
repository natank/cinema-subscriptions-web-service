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

export async function findMovie(req, res, next){
	var {_id} = req.params
	var movie = null;
	if(_id){
		try{
			var doc = await Movie.findById(_id, (err, doc)=>{
				if(err) throw err
			})
			if(doc){
				var {name, genres,_id,image, premiered} = doc
				movie = {name, genres,_id,image, premiered};
			}
		} catch(err){
			throw(err)
		}
	}
	if(movie){
		console.log('found movie')
		res.status(200).json(movie)
	} else {
		console.log('movie is missing')
		res.status(204).end()
	}
}

export async function deleteMovie(req, res, next){
	var {_id} = req.params;
	try{
		await Movie.deleteOne({_id})
		res.status(200).send("movie deleted")
	} catch(err){
		res.status(204).end();
		throw(err)
	}
}

export async function updateMovie(req, res, next){
	
}