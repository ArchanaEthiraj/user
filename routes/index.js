const initializeRoutes = (app) => {
    app.use('/v1/user', require('./v1/userRoutes.js'));
    app.use('/v1/shop', require('./v1/shopRoutes.js'));
    app.use('/v1/booking', require('./v1/bookingRoutes.js'));
};

module.exports = initializeRoutes;