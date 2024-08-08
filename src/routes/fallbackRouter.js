import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.status(404).send('<h1>404</h1><p>Page not found</p>');
});

router.use((req, res) => {
  res.status(404).redirect('/');
});

export default router;
