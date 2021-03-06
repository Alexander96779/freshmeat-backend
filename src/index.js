import authentication from './routes/authentication';
import product from './routes/product';
import order from './routes/order';

export default(app) => {
app.use('/api/v1/auth', authentication);
app.use('/api/v1', product);
app.use('/api/v1', order);

app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    res.status(status);
    res.json({
      status,
      error: error.message,
    });
  });

}