import fs from 'fs';
import path from 'path';

export const storeImageBase64 = (imgSrc, folderPath) => {
  try {
    const base64Data = imgSrc.replace(/^data:image\/png;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const imagesDir = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const fileName = `${Date.now()}.png`;
    const pathName = '/images/' + folderPath + '/' + fileName;
    const imagePath = path.join(
      process.cwd(),
      'public',
      'images',
      folderPath,
      fileName
    );
    fs.writeFileSync(imagePath, imageBuffer);
    return pathName;
  } catch (err) {
    console.log(err);
  }
};
