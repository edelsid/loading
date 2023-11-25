const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');
const Router = require('koa-router');
const slow = require('koa-slow');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.response.body ='hello';
});

router.get('/news', async (ctx) => {
  ctx.response.status = 500;
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