/**
 * Created by raniys on 5/15/17.
 */

const homeIndex = async (ctx, next) => {
    await ctx.render('templates/index', {
        title: 'Hello Koa 2!',
        content: 'Welcome',
        csrf: ctx.csrf
    })
};

const about = async (ctx, next) => {
    ctx.body = 'koa2 about';
};

module.exports = {
    homeIndex,
    about
};