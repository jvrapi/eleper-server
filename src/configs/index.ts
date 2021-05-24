import fs from 'fs';
import multer from 'multer';
import path from 'path';

export default {
	storage: multer.diskStorage({
		destination: (request, file, cb) => {
			const userId = request.userId;
			const userPath = path.join(__dirname, '..', '..', 'uploads', userId);
			const filePath = path.join(userPath, 'files');

			if (!fs.existsSync(userPath)) {
				fs.mkdirSync(userPath);
			}

			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath);
			}

			cb(null, filePath);
		},
		filename: (request, file, cb) => {
			const fileName = `${Date.now()}-${file.originalname}`;
			cb(null, fileName);
		},
	}),
};
