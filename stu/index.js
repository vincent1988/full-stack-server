import koa from 'koa';
import Router from 'koa-router';
import Boom from 'boom';

const app = koa();
const router = new Router({prefix: '/user'});

app.use(function *(next) {
	const start = new Date;
	yield next;
	const ms = new Date - start;
	this.set('X-Response-Time', `${ms}ms`);
});

app.name = 'server';

// app.use(function *(next) {
//   const start = new Date;
//   yield next;
//   const ms = new Date - start;
//   console.log('%s %s - %s', this.method, this.url, ms);
//   console.log(this.request.charset);
//   // this.throw(403);
// });

router.get('/', function *(next) {
	this.body = 'Hello World!';
}).get('/:path', function *(next) {
	this.body = this.params.path;
}).get('/mult/:path', function *() {

}, function *(next) {

}).get('/:category/:title', function *() {
	console.log(this.params);
});


//use用法
// router.use(function* (next) {
//   console.log('aaaaaa');
//   yield next;
// });
//
// router.get('/test', function *(next) {
//   console.log('dddddd');
//   this.response.body = 'test router middleware';
// });
//
// router.use(function* (next) {
//   console.log('bbbbbb');
//   yield next;
// });
//
// router.get('/', function *(next) {
//   console.log('ccccccc');
//   this.response.body = 'Hello World!';
// });



app
	.use(router.routes())
	.use(router.allowedMethods({
		throw: true,
		notImplemented: () => new Boom.notImplemented(),
		methodNotAllowed: () => new Boom.methodNotAllowed()
	}));
// app.use(function *() {
//   // this.redirect('http://google.com');
//   // this.cookie.set('aaa', 'test');
// 	console.log(this.request.ip);
//
// 	this.set('ETag', '123');
// 	if (this.fresh) {
// 		this.status = 304;
// 		return;
// 	}
// 	this.body = 'Hello World';
// 	this.message = 'good';
// 	console.log(this.get('ETag') + this.type);
//   // this.status = 301;
//   // this.redirect('/cart');
//   // this.body = 'Redirecting to shopping cart';
// });

app.on('error', (err, ctx) => {
	console.log('===server error===', err, ctx);
});


app.listen(3800, function() {
	console.log('listen 3800');
});