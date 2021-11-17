import { Router } from 'express';
const router = Router();

// Test routes
router.get('/');

// Product routes
router.get('/api/products/');
router.get('/api/products/:id');
router.post('/api/products/');
router.put('/api/products/:id');
router.delete('/api/products/:id');

// User routes
router.get('/api/users/');
router.get('/api/users/:id');
router.post('/api/users/');
router.delete('/api/users/:id');

// Cart routes
router.get('/api/carts/:userLogin');
router.post('/api/carts/:userLogin/');
router.put('/api/carts/:userLogin/:id');
router.delete('/api/carts/:userLogin/:id');

export default router;
