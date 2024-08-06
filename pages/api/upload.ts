import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser to handle the form data manually
  },
};

const uploadDir = path.join(process.cwd(), 'public/uploads');

const ensureUploadDirExists = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  ensureUploadDirExists();

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5 MB
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error uploading file' });
      return;
    }

    // Type assertion to handle possible undefined files.file
    if (files.file && Array.isArray(files.file)) {
      const file = files.file[0];
      const filePath = `/uploads/${path.basename(file.filepath)}`;

      res.status(200).json({ filePath, fileName: path.basename(file.filepath) });
    } else {
      res.status(400).json({ message: 'No file uploaded' });
    }
  });
};

export default handler;
