import koa from 'koa';
import Router from 'koa-router';
import session from 'koa-generic-session';

const app = koa();
const router = Router();

app.keys = ['keys', 'testkeys'];
app.use(session());
app.use(function *() {
  switch (this.path) {
    case '/get':
      get.call(this);
      break;
    case '/remove':
      remove.call(this);
      break;
    case '/regenerate':
      yield regenerate.call(this);
      break;
  }
});

function get() {
  const session = this.session;
  console.log(session);
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

app.listen(3800, () => {
  console.log('open port 3800!');
});