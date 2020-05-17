import express from 'express'

import usersRouter from './routes/User'
import photoRouter from './routes/Photo'

const app = express()
const port = process.env.PORT || 3000

app.use('/users', usersRouter);
app.use('/photo', photoRouter);

app.get('/', (req, res) => res.send('Hello World'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log("Server started")
})

module.exports = app
