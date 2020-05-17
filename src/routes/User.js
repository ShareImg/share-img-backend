import express from 'express'

const router = express.Router();

// Example code
router.get('/', async(req, res) => {
  res.send('User routes')
})

// Code here

export default router;
