import { diskStorage } from 'multer';

export const fileStorage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      return cb(null, file.originalname);
    },
  }),
};
