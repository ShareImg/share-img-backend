import express from 'express'
import mysqlconnect from '../connection'

const router = express.Router();

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

// Get all users
router.get('/', async(req, res) => {
  mysqlconnect.query("SELECT * from Users", (err, results, fields) =>{
    if(!err){
      res.send(results);
    }
    else{
      console.log(err);
    }
  })
  
})

// Get an users
router.get('/:userId', async(req, res) => {
  mysqlconnect.query("SELECT * from Users WHERE uid = ?",[req.params.userId] , (err, results, fields) =>{
    if(!err){
      res.send(results);
    }
    else{
      console.log(err);
    }
  })
})

// delete an user
router.delete('/:userId', async(req, res) => {
  mysqlconnect.query("DELETE FROM Users WHERE uid = ?",[req.params.userId] , (err, results, fields) =>{
    if(!err){
      res.send('Deleted succesfully');
    }
    else{
      console.log(err);
    }
  })
})

// login
router.post('/login', async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (err) {
    res.send(404, 'user not found');
  }
  else {
    mysqlconnect.query("SELECT * from Users WHERE email = ? AND password = ?",[email,password] , async (err, results, fields) =>{
      if(results.length > 0){
        const comparision = await bcrypt.compare(password, results[0].password);
        if (comparision) {
          res.send(200,'Login sucessfull');
          res.redirect('/');
        }
        else {
          res.send(204,'Incorrect Username and/or Password!');
        }
      }
      else{
        res.send('Please enter Username and Password!');
      }
    })
  }
  
})

// register
router.post('/register', async(req, res) => {
  const password = req.body.password;
  const encryptedPassword = await hashPassword(password);
  var users={
    "displayName":req.body.displayName,
    "password":encryptedPassword,
    "email":req.body.email,
    "displayImage":req.body.displayImage,
    "uid": req.body.uid,
  }

  mysqlconnect.query("INSERT INTO Users SET ?", users, (err, results, fields) =>{
    if(err){
      res.send(422, err);
    }
    else{
      res.send(200,'user registered sucessfully');
    }
  })
})

// register validate
router.post('/register/validate', async (req, res) => {
  const data = req.body
  let error = {}

  if (!data.displayName) {
    error.displayName = 'This field is required'
  }
})

export default router;
