const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        
            res.render("moviesAdd")

    },
    create: function (req, res) {
 
            db.Movie.create({

               ...req.body,
            
            })

            .then((movie) =>{

            console.log("🚀 ~ file: moviesController.js ~ line 58 ~ .then ~ movie", movie)

            res.redirect("/movies")
                
            }) 

    },
    edit: function(req, res) {
        
        let movieId = req.params.id

        db.Movie.findByPk(movieId)

        .then(Movie => res.render("moviesEdit", {Movie}))
    },


    update: function (req,res) {

        let movieId = req.params.id

        db.Movie.update({

            ...req.body

        },
        {

            where: { id: movieId }

        })
        
        .then(() => res.redirect("/movies"))

    },

    delete: function (req, res) {
        
        let movieId = req.params.id

        db.Movie.findByPk(movieId)

        .then(Movie => res.render("moviesDelete", {Movie}))


    },
    destroy: function (req, res) {
        
        let movieId = req.params.id

        db.Movie.destroy({

            where: { id: movieId}

        }).then(() => res.redirect("/movies"))


    }

}

module.exports = moviesController;