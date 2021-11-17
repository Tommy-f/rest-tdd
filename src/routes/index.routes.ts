import express from 'express';
import { getAllUsers } from '../controllers/user.controller';
const router = express.Router();

// Test routes
router.get('/', (req, res) => {
  res.send({ data: 'Good' });
});

// // Product routes
// router.get('/products/');
// router.get('/products/:id');
// router.post('/products/');
// router.put('/products/:id');
// router.delete('/products/:id');

// // User routes
router.get('/users/', getAllUsers);
// router.get('/users/:id');
// router.post('/users/');
// router.delete('/users/:id');

// // Cart routes
// router.get('/carts/:userLogin');
// router.post('/carts/:userLogin/');
// router.put('/carts/:userLogin/:id');
// router.delete('/carts/:userLogin/:id');

export default router;
