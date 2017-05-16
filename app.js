const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const onerror = require('koa-onerror');
const csrf = require('koa-csrf');
const session = require('koa-session');
const nunjucks = require('nunjucks');
const config = require('./config/default.json');
const router = require('./routes/index');

const app = new Koa();
app.keys = [config.appKey];

// view engine setup
nunjucks.configure('views', { autoescape: true });
// views with nunjucks
app.use(views(__dirname + '/views', {
    map: { html: 'nunjucks' }
}));

// middle wares
app.use(bodyparser());
app.use(json());
app.use(logger());
app.use(session(app));
app.use(new csrf());

app.use(require('koa-static')(__dirname + '/public'));

// routes

app.use(router.routes(), router.allowedMethods());


// error handler

onerror(app);


const port = config.port;
app.listen(process.env.PORT || port);
console.info('Starting server at: http://localhost:' + port);
