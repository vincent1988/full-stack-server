import koa from 'koa';
import Router from 'koa-router';
import session from 'koa-generic-session';

const app = koa();
const router = new Router();
const debug = require('debug')('server:booting');

app.use(session());
// app.use(function *() {
//   switch (this.path) {
//     case '/':
//       break;
//     case '/get':
//       get.call(this);
//       break;
//     case '/remove':
//       remove.call(this);
//       break;
//     case '/regenerate':
//       yield regenerate.call(this);
//       break;
//   }
// });

function get() {
  const session = this.session;
  session.count = session.count || 0;
  session.count++;
  this.body = session.count;
}

function remove() {
  this.session = null;
  this.body = 0;
}

function *regenerate() {
  get.call(this);
  yield this.regenerateSession();
  get.call(this);
}

router.get('/', function *(next) {
  console.log(this.cookies.get('koa.sid.sig'));
  debug('get');
  this.body = 'Hello world';
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3800, () => {
  console.log('open port 3800!');
});