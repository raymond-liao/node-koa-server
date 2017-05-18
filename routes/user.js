/**
 * Created by raniys on 5/16/17.
 */
const koaRouter = require('koa-router');
const user = require('../controllers/user');

const router = koaRouter({
    prefix: '/user'
});

router.get('/login', user.login);
router.post('/login', user.login);
router.get('/logout', user.logout);
router.post('/register', user.createUser);
router.put('/update', user.updateUser);
router.get('/', user.userIndex);

module.exports = router;