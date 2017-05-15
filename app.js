const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const onerror = require('koa-onerror');
const nunjucks = require('nunjucks');
const index = require('./routes/index');

const app = new Koa();

// view engine setup
nunjucks.configure('views', { autoescape: true });
//views with nunjucks
app.use(views(__dirname + '/views', {
    map: { html: 'nunjucks' }
}));

// middle wares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// x-response-time

app.use(async function (ctx, next) {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});


// logger

app.use(async function (ctx, next) {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


// routes

app.use(index.routes(), index.allowedMethods());


// error handler

onerror(app);


const port = 3000;
app.listen(port);
console.info('启动服务器在 http://localhost:' + port);
