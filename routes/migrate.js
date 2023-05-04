const express = require('express'),
    router = express.Router(),
    Migrate = require('../controllers/migrate'),
    MigrateClass = new Migrate(),
    { celebrate, Joi, errors, Segments } = require('celebrate');

router.post('/', celebrate({
    [Segments.BODY]: Joi.object().keys({
      limit: Joi.number().integer(),
    })
 }), async (req, res, next) => {
    const {body:data} = req;
    try {
        const response = await MigrateClass.syncDatabases();
        res
            .status(200)
            .json({response});
    } catch (error) {
        next(error);
    };
});


router.get('/report', async (req, res, next) => {
    try {
        const response = await MigrateClass.syncDatabases();
        res
            .status(200)
            .json({response});
    } catch (error) {
        next(error);
    };
});

module.exports = router