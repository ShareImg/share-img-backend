import express from 'express'
import fileUpload from 'express-fileupload'

// import mysql from 'mysql'
import mysqlconnect from './connection'

import usersRouter from './routes/User'
import photoRouter from './routes/Photo'

const app = express()
app.use(express.json());
const port = process.env.PORT || 3000

app.use('/user', usersRouter);
app.use('/photo', photoRouter);
app.use(fileUpload({ createParentPath: true, useTempFiles: true }))


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
