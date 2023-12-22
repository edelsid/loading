const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');
const Router = require('koa-router');
const slow = require('koa-slow');

const app = new Koa();
const router = new Router();

const news = [{
  'date': '18.04 25.03.2019',
  'header': '"Люди Икс: Темный феникс" - свой против своих. Показ стартует 7 июня'
}, {
  'date': '18.04 20.03.2019',
  'header': '"Джон Уик 3" - продолжение истории наемного убийцы уже 16 мая в кино'
}, {
  'date': '18.05 19.03.2019',
  'header': '"Мстители 4: Финал" показ стартует 25 апреля'
}]

router.get('/', async (ctx) => {
  ctx.response.body ='hello';
});

router.get('/news', async (ctx) => {
  if (Math.random() > 0.5) {
    ctx.response.body = JSON.stringify(news);;
  } else {
    ctx.status = 404;
  }
});

app.use(koaBody());
app.use(cors());
app.use(slow({delay: 5000}));
app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', '*');

  console.log(ctx.headers);

  next();
})

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());

server.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  return;
})

console.log('server is listening to port №' + port);