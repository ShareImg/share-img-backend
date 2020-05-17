import express from 'express'

const router = express.Router();

// Example code
router.get('/user', async(req, res) => {
  res.send('User routes')
})

// Code here

export default router;
