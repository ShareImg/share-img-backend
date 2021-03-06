import express from 'express'
import mysqlconnect from '../connection'
import bcrypt from 'bcryptjs'

const router = express.Router();

// not use
// const validateEmail = (email) => {
//   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email);
// }

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
  mysqlconnect.query("SELECT * from Users WHERE uid = ? OR id = ?",[req.params.userId,req.params.userId] , (err, results, fields) =>{
    if(!err){
      res.send(results[0]);
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
  const users={
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
      res.send(200, users);
    }
  })
})

// delete an user
router.delete('/delete/:userId', async(req, res) => {
  mysqlconnect.query("DELETE FROM Users WHERE id = ?",[req.params.userId] , (err, results, fields) =>{
    if(!err){
      res.send('Deleted succesfully');
    }
    else{
      console.log(err);
    }
  })
})

// edit user
router.put('/edit/:userId', async (req, res) => {
  const param=[{
    "displayName": req.body.displayName,
    "password": req.body.password,
    "email": req.body.email,
    "displayImage": req.body.displayImage,
    "uid": req.body.uid,
  }, req.params.userId]
  mysqlconnect.query("UPDATE Users SET ? WHERE id = ?", param, (err, results, fields) =>{
    if(!err){
      res.send(200, param);
    }
    else{
      res.send(400, "User not found")
    }
  })
})

// register validate not created
// router.post('/register/validate', async (req, res) => {
//   const data = req.body
//   let error = {}

//   if (!data.displayName) {
//     error.displayName = 'This field is required'
//   }
// })

export default router;
