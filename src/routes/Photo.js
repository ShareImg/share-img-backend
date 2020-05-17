import express from 'express'

const router = express.Router();

// Example code
router.get('/', async(req, res) => {
  res.send('Photo routes')
})

// Code here

export default router;
