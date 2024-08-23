const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises; // Use promises for asynchronous operations

const outputFolder = path.resolve(__dirname, "../public/assets"); // Ensure absolute path

// Ensure the output folder exists
fs.mkdir(outputFolder, { recursive: true })
  .then(() => {
    console.log(`Output folder is ready at ${outputFolder}`);
  })
  .catch((err) => {
    console.error(`Failed to create output folder at ${outputFolder}`, err);
  });

module.exports = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  const images = [];

  try {
    const resizePromises = req.files.map(async (file) => {
      const fullPath = path.resolve(outputFolder, `${file.filename}_full.jpg`);
      const thumbPath = path.resolve(
        outputFolder,
        `${file.filename}_thumb.jpg`
      );

      // Resize to full size
      await sharp(file.path)
        .resize(2000)
        .jpeg({ quality: 50 })
        .toFile(fullPath);

      // Resize to thumbnail
      await sharp(file.path)
        .resize(100)
        .jpeg({ quality: 30 })
        .toFile(thumbPath);

      // Attempt to delete the original file asynchronously
      try {
        await fs.unlink(file.path);
        console.log(`Deleted original file: ${file.path}`);
      } catch (err) {
        console.error(`Failed to delete file: ${file.path}`, err);
        // Optionally, you can decide how to handle this error
        // For now, we'll continue processing other files
      }

      images.push(file.filename);
    });

    // Wait for all resize operations to complete
    await Promise.all(resizePromises);

    // Attach the processed image filenames to the request object
    req.images = images;

    next();
  } catch (err) {
    console.error("Error processing images:", err);
    res.status(500).send({ error: "Error processing images" });
  }
};
