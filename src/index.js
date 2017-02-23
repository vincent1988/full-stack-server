import koa from 'koa';

const app = koa();

app.use(function *(next) {
	const start = new Date;
	yield next;
	const ms = new Date - start;
	this.set('X-Response-Time', `${ms}ms`);
});

app.name = 'server';

app.use(function *(next) {
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
  console.log(this.request.charset);
  // this.throw(403);
});

app.use(function *() {
  // this.redirect('http://google.com');
  // this.cookie.set('aaa', 'test');
	console.log(this.request.ip);
	
	this.set('ETag', '123');
	if (this.fresh) {
		this.status = 304;
		return;
	}
	this.body = 'Hello World';
	this.message = 'good';
	console.log(this.get('ETag') + this.type);
  // this.status = 301;
  // this.redirect('/cart');
  // this.body = 'Redirecting to shopping cart';
});

app.on('error', (err, ctx) => {
	console.log('===server error===', err, ctx);
});


app.listen(3800);
app.listen(3100);