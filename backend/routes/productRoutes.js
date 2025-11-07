import express from 'express';
import { getProducts } from '../controllers/productController.js';

// `express.Router()` allows you to group route handlers for a
// particular part of a site and access them using a common route-prefix.
const router = express.Router();

// When a GET request is made to the root of this router ('/'),
// the getProducts controller function will be executed.
router.route('/').get(getProducts);

export default router;
