const initializeRoutes = (app) => {
    app.use('/api/v1/user', require('./v1/userRoutes.js'));
    app.use('/api/v1/shop', require('./v1/shopRoutes.js'));
    app.use('/api/v1/booking', require('./v1/bookingRoutes.js'));
};

module.exports = initializeRoutes;