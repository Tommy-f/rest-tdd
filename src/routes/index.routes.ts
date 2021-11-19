import express from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
} from '../controllers/users.controller';
import {
  createProduct,
  getAllProducts,
  getProduct,
} from '../controllers/products.controller';

const router = express.Router();

// Test routes
router.get('/me', (req, res) => {
  res.send({ data: 'Good' });
});

// // Product routes
router.get('/products/', getAllProducts);
router.get('/products/:id', getProduct);
router.post('/products/', createProduct);
// router.put('/products/:id');
// router.delete('/products/:id');

// // User routes
router.get('/users/', getAllUsers);
router.get('/users/:login', getUser);
router.post('/users/', createUser);
router.delete('/users/:login', deleteUser);

// // Cart routes
// router.get('/carts/:userLogin');
// router.post('/carts/:userLogin/');
// router.put('/carts/:userLogin/:id');
// router.delete('/carts/:userLogin/:id');

export default router;
