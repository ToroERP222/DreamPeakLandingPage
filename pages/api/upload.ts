import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';

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
    maxFileSize: 10 * 1024 * 1024, // Allowing larger file size initially to compress later
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error uploading file' });
      return;
    }

    // Ensure file exists
    if (!files.file || !Array.isArray(files.file)) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const file = files.file[0];
    const fileExt = path.extname(file.originalFilename || '');
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    // Check if the file is an image
    if (!allowedExtensions.includes(fileExt.toLowerCase())) {
      fs.unlinkSync(file.filepath); // Delete the non-image file
      res.status(400).json({ message: 'Only image files are allowed' });
      return;
    }

    const outputPath = path.join(uploadDir, path.basename(file.filepath));

    try {
      // Compress the image if it exceeds the size limit
      const metadata = await sharp(file.filepath).metadata();

      // Compress only if file size exceeds the 5 MB limit
      if (metadata.size && metadata.size > 5242880) {
        await sharp(file.filepath)
          .resize({ width: 1920 }) // Optional: resize to a reasonable width
          .jpeg({ quality: 80 }) // Adjust quality for compression
          .toFile(outputPath);
      } else {
        // Move the file to the destination without compression if already under 5 MB
        fs.renameSync(file.filepath, outputPath);
      }

      res.status(200).json({ filePath: `/uploads/${path.basename(outputPath)}`, fileName: path.basename(outputPath) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing file' });
    }
  });
};

export default handler;
