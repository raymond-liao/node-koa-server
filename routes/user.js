/**
 * Created by raniys on 5/16/17.
 */
const koaRouter = require('koa-router');
const user = require('../controllers/user');

const router = koaRouter({
    prefix: '/user'
});

router.get('/', user.userIndex);
router.get('/login', user.userIndex);
router.post('/login', user.login);
router.get('/logout', user.logout);
router.post('/register', user.createUser);
router.put('/update', user.updateUser);

module.exports = router;