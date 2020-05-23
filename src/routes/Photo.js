import express from 'express'
import AWS from 'aws-sdk';
import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path'
import url from 'url'

import mysqlconnect from '../connection'
import s3 from '../s3'

// const storage = multer.memoryStorage()
// const upload = multer({storage: storage});
// const s3Client = s3.s3Client
// const paramiter = s3.uploadParams

const validateUrl = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(str);
}

const ImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'shareimg-bucket',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
    }
  }),
  limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function( req, file, cb ){
    checkFileType( file, cb );
  }
 }).single('file');

const router = express.Router();

function checkFileType( file, cb ){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
  // Check mime
  const mimetype = filetypes.test( file.mimetype );
  if( mimetype && extname ){
    return cb( null, true );
  } else {
    cb( 'Error: Images Only!' );
  }
 }

router.get('/', async(req, res) => {
  mysqlconnect.query("SELECT * from Photos", (err, rows, fields) =>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
})

router.get('/:photoId', async(req, res) => {
  mysqlconnect.query("SELECT * from Photos WHERE id = ?", [req.params.photoId], (err, results, fields) => {
    if(!err){
      res.send(results[0])
    }
    else{
      res.send(400, 'Photo not found')
    }
  })
})

router.get('/owner/:ownerId', async(req, res) => {
  mysqlconnect.query("SELECT Photos.id, Photos.url, Photos.ownerName, Photos.description, Photos.description, Photos.createdAt, Photos.updatedAt, Photos.ownerId, Users.id, uid, displayName\
  FROM Photos \
  Left join Users on ? = Users.id;", [req.params.ownerId], (err, results, fields) => {
    if(!err){
      res.send(results)
    }
    else{
      res.send(400, 'Photo not found')
    }
  })
})


router.post('/upload', async(req, res) => {
  // ImgUpload( req, res, ( error ) => {
  //   // console.log( 'requestOkokok', req.file );
  //   // console.log( 'error', error );
  //   if( error ){
  //    console.log( 'errors', error );
  //    res.json( { error: error } );
  //   } else {
  //    // If File not found
  //    if( req.file === undefined ){
  //     console.log( 'Error: No File Selected!' );
  //     res.json( 'Error: No File Selected' );
  //    } else {
  //       const photo = {
  //         "description": req.body.description,
  //         "url": req.body.url,
  //         "ownerName": req.body.ownerName,
  //         "ownerId": req.body.ownerId
  //       }
  //       mysqlconnect.query("INSERT INTO Photos SET ?", photo, (err, results) =>{
  //         if(err){
  //           res.send(422, err);
  //         }
  //         else{
  //           res.send(200, photo);
  //         }
  //       })
  //     }
  const photo = {
    "description": req.body.description,
    "url": req.body.url,
    "ownerName": req.body.ownerName,
    "ownerId": req.body.ownerId
  }
  mysqlconnect.query("INSERT INTO Photos SET ?", photo, (err, results) =>{
    if(err){
      res.send(422, err);
    }
    else{
      res.send(photo);
    }
  })
})

router.put('/edit/:photoId', async(req, res) => {
  mysqlconnect.query("SELECT * from Photos WHERE id = ?", [req.params.photoId], (err, results, fields) =>{
    if(!err){
      const photo = results[0]
      const param = [{
        "description": req.body.description
      }, req.params.photoId]
      mysqlconnect.query("UPDATE Photos SET ? WHERE id = ?", param, (err, results) =>{
        if(!err){
          res.send(results);
        }
        else{
          res.send(422, err);
          return
        }
      })
    } else {
      res.send(400, 'Photo not found')
      return
    }
  })
})

router.delete('/delete/:photoId', async(req, res) => {
  mysqlconnect.query("DELETE FROM Photos WHERE id = ?", [req.params.photoId], (err, results, fields) =>{
    if(!err){
      res.send(200, 'Deleted photo successfully');
    }
    else{
      console.log(err);
    }
  })
})
// Code here

export default router;
