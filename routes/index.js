/**
 * Created by raniys on 5/15/17.
 */
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const basename = path.basename(module.filename);
const home = require('../controllers/home');

fs
    .readdirSync(__dirname)
    .filter(file =>
        (file.indexOf('.') !== 0) && (file.split('.').slice(-1)[0] === 'js') && (file !== basename)
    )
    .forEach(file => {
        const route = require(path.join(__dirname, file));
        router.use(route.routes(), route.allowedMethods());
    });

router.get('/', home.homeIndex);

module.exports = router;