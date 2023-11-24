import express from 'express';
import fs from 'fs';
import path, { join } from 'path';
import multer from 'multer';
const router = express.Router();

interface Data {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

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
  fs.readFile(join(__dirname, '../../db/example.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
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
    const data = fs.readFileSync(join(__dirname, '../../db/example.json'), 'utf8');
    const parsedData: Data[] = JSON.parse(data);
    const newData: Data = {
      id: parsedData.length + 1,
      name: req.body.name,
      email: req.body.email,
      avatar: '/' + req.file.path,
    };
    parsedData.push(newData);
    fs.writeFileSync(join(__dirname, '../../db/example.json'), JSON.stringify(parsedData));
    res.sendStatus(200);
  }
);

router.delete('/data/:id', (req, res) => {
  const data = fs.readFileSync(join(__dirname, '../../db/example.json'), 'utf8');
  const parsedData: Data[] = JSON.parse(data);
  const newData = parsedData.filter((item) => item.id !== Number(req.params.id));
  fs.writeFileSync(join(__dirname, '../../db/example.json'), JSON.stringify(newData));
  res.sendStatus(200);
});

export default router;