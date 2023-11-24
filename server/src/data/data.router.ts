import express from 'express';
import fs from 'fs';
import path, { join } from 'path';
import multer from 'multer';
import { addData, deleteData, getData } from './data.service';
const router = express.Router();

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 2000000, // 2MB in bytes
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

router.get('/data', (req, res) => {
  const data = getData();
  res.send(data);
});

router.post(
  '/data',
  (req, res, next) => {
    console.log(req.app.locals.uploading);
    if (req.app.locals.uploading) {
      res.status(429).send('Too many requests');
      return;
    }
    req.app.locals.uploading = true;
    next();
  },
  upload.single('avatar'),
  (req, res) => {
    req.app.locals.uploading = false;
    addData({ avatar: req.file.path, name: req.body.name, email: req.body.email });
    res.sendStatus(200);
  }
);

router.delete('/data/:id', (req, res) => {
  deleteData(Number(req.params.id));
  res.sendStatus(200);
});

export default router;
