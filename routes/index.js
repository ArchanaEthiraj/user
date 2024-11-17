const initializeRoutes = (app) => {
    app.use('/api/v1/user', require('./v1/userRoutes.js'));
    app.use('/api/v1/shop', require('./v1/shopRoutes.js'));
};

module.exports = initializeRoutes;