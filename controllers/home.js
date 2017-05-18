/**
 * Created by raniys on 5/15/17.
 */

const request = require('request');

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

const post = async (ctx, next) => {
    ctx.body = 'koa2 post';
    const promise = await new Promise((resolve, reject) => {
        const url = "https://wapi.shrise.cn/promotion/diagnosis_stock.json";
        request.post(url, {
            form: {content: "test"},
            method: 'POST',
            encoding: null,
            timeout: 30 * 1000
        }, function (err, httpResponse, body) {
            if (!err && httpResponse.statusCode == 200) {
                console.info("post success");
                resolve(JSON.parse(body));
            } else {
                console.error("==>post error: " + err + " httpResponse: " + httpResponse.statusCode);
                reject(false);
            }
        });
    });

    console.info(promise);
};

const get = async (ctx, next) => {
    ctx.body = 'koa2 get';
    const promise = await new Promise((resolve, reject) => {
        const url = "https://wapi.shrise.cn/promotion/diagnosis_stock.json";
        request.get(url, {
            form: {content: "test"},
            timeout: 5 * 1000
        }, function (err, httpResponse, body) {
            if (!err && httpResponse.statusCode == 200) {
                console.info("post success");
                resolve(JSON.parse(body));
            } else {
                console.error("==>post error: " + err + " httpResponse: " + httpResponse.statusCode);
                reject(false);
            }
        });
    });

    console.info(promise);
};

module.exports = {
    homeIndex,
    about,
    post,
    get
};