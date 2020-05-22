import express from 'express'
import fileUpload from 'express-fileupload'
// import multer from 'multer'
// import multers3 from 'multer-s3'

// import mysql from 'mysql'
import mysqlconnect from './connection'
// import s3 from './s3'

import usersRouter from './routes/User'
import photoRouter from './routes/Photo'

const app = express()

app.use(express.json());
const port = process.env.PORT || 3000

// const upload = multer({
//   storage: multers3({
//     s3: s3,
//     acl: 'public-read',
//     bucket: 'bucket-name',
//     metadata: (req, file, cb) => {
//       cb(null, {fieldName: file.fieldname})
//     },
//     key: (req, file, cb) => {
//       cb(null, Date.now().toString() + '-' + file.originalname)
//     }
//   })
// });
// const upload = multer();

app.use('/user', usersRouter);
app.use('/photo', photoRouter);
app.use(fileUpload({ createParentPath: true, useTempFiles: true }))

// app.post('/photo/upload', upload.single('file'), (req, res) => {
//   console.log()
//   const params = {
//     Bucket: 'shareimg-ske14', 
//     Key: req.files.file.name,
//     Body: req.files.file.data,
//   };
//   s3.upload(params, (err, data) => {
//     if (err) {
//       res.status(500).json({error:"Error -> " + err});
//     }
//     res.json({message: 'File uploaded successfully! -> keyname = ' + req.files.file.name});
//   });
// })

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
