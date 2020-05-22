import express from 'express'
import AWS from 'aws-sdk';
import multer from 'multer'

import mysqlconnect from '../connection'
import s3 from '../s3'

const upload = multer()
const router = express.Router();

const validateUrl = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(str);
}

router.get('/:photoId', async(req, res) => {
  mysqlconnect.query("SELECT * from Photos WHERE deletedAt IS NULL", [req.params.id], (err, results, fields) => {
    if(!err){
      res.send(200, results[0])
    }
    else{
      res.send(400, 'Photo not found')
    }
  })
})

router.get('/', async(req, res) => {
  mysqlconnect.query("SELECT * from Photos WHERE deletedAt IS NULL", (err, rows, fields) =>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
})


router.post('/upload', async(req, res) => {
  const photo = {
    "ownerId": req.body.ownerId,
    "description": req.body.description,
  }
  mysqlconnect.query("INSERT INTO Photos SET ?", photo, (err, results) =>{
    if(err){
      res.send(422, err);
    }
    else{
      res.send(200, photo);
    }
  })
})

router.put('/edit/:photoId', async(req, res) => {
  mysqlconnect.query("SELECT * from Photos WHERE deletedAt IS NULL", [req.params.id], (err, results, fields) =>{
    if(!err){
      const photo = results[0]
      const param = [{
        "description": req.body.description
      }, req.params.photoId]
      mysqlconnect.query("UPDATE Photos SET ? WHERE id = ?", param, (err, results) =>{
        if(!err){
          res.send(200, photo);
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
  const param=[{
    "deletedAt": new Date(),
  }, req.params.photoId]
  mysqlconnect.query("SELECT * from Photos WHERE deletedAt IS NULL", [req.params.photoId], (err, results, fields) =>{
    if(!err){
      res.send('Deleted photo successfully');
    }
    else{
      console.log(err);
    }
  })
})
// Code here

export default router;
