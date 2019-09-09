const { Router } = require('express');
const router     = Router();
const dbMovies   = require('../sample.json');
const movies     = dbMovies;
const underscore = require('underscore'); //arrays

router.get('/movies', (req,res)=> {
    const movies = dbMovies;
    res.json(movies)
});

router.post('/movies', (req,res)=>{
    const {title,director,year, rating } = req.body;
    if(title && director && year && rating) {
        var idNew = movies.length + 1 ;
        var newMovie = {idNew, ...req.body}; //concat id to request for add to array
        movies.push(newMovie);
        res.json(movies);
    }else{
        res.send({ 
            
            "state":"ERR"
        });    
    }
});

router.put('/:id',(req,res)=> {
    const {id} = req.params; 
    const {title,director,year, rating } = req.body;
    let foundMovie = 0;
    underscore.each(movies, (movie,i)=>{
        if(movie.id == id){
            if (title){ movie.title = title }
            if (director){ movie.director = director }
            if (year){ movie.year = year }
            if (rating){ movie.rating = rating }
            console.log('movie actualizada: ' + movie.id)
            foundMovie++;
        }else{
            console.log('movie no encotrada: ' + movie.id)
            
        }

    });
    if(foundMovie > 0){
        res.status(200).json(movies);
    }else{
        res.status(200).send('movie doesnt found.')
    }
    
    
});

router.delete('/:id', (req,res)=> {
    const {id} = req.params;
    
    underscore.each(movies, (movie,i)=>{ //each(:ARRAY, (:ELEMENT,:INDEX)=>{}
        if (movie.id == id){
            movies.splice(i, 1);
            console.log('id eliminado: ' + id );
            
        }
    }); 
    res.json(movies);
});

module.exports = router ;