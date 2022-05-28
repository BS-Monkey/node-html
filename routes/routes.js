const express = require('express'),
    movieRoutes = require('./movies');

var router = express.Router();

router.get('/', (req, res) => {
   res.send('Welcome to our TRIPS!!!');
});

//CRUD - create read update delete
router.get('/movies_duration', movieRoutes.duration_sort);
router.get('/movies_price', movieRoutes.price_sort);
router.get('/movies_date', movieRoutes.date_sort);
router.get('/movies', movieRoutes.getMovies); //read
router.get('/list', movieRoutes.index); //list of all things..
router.get('/movies/:id', movieRoutes.getMovie); //read movie
router.post('/movies', movieRoutes.createMovie); //create
router.post('/movies/:id/series', movieRoutes.createSeriesInSeries); //create series
router.post('/movies/:id/actors', movieRoutes.createActorInActors); //create actor
router.put('/movies/:id', movieRoutes.updateMovie); //update
router.delete('/movies/:id', movieRoutes.deleteMovie); //delete
router.delete('/movies/:id/actors/:name', movieRoutes.deleteActors); //delete actors
router.delete('/movies/:id/series/:name', movieRoutes.deleteSeries); //delete series

module.exports = router;