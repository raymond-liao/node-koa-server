/**
 * Created by raniys on 5/15/17.
 */

const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    await ctx.render('templates/index', {
        title: 'Hello Koa 2!',
        content: 'Welcome'
    })
});

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
});

module.exports = router;
