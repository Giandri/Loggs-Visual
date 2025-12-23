const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/gallery');
const outputDir = path.join(__dirname, '../public/gallery/optimized');

async function optimizeImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: 85,
        effort: 6
      })
      .toFile(outputPath);

    console.log(`✅ Optimized: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`❌ Failed to optimize ${path.basename(inputPath)}:`, error.message);
  }
}

async function optimizeAllImages() {
  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Read all files from input directory
    const files = fs.readdirSync(inputDir);

    // Filter image files
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(file) &&
      !file.includes('optimized') // Skip optimized folder itself
    );

    console.log(`📸 Found ${imageFiles.length} images to optimize...`);

    // Process each image
    const promises = imageFiles.map(async (file) => {
      const inputPath = path.join(inputDir, file);
      const outputFileName = path.parse(file).name + '.webp';
      const outputPath = path.join(outputDir, outputFileName);

      return optimizeImage(inputPath, outputPath);
    });

    await Promise.all(promises);

    console.log('🎉 All images optimized successfully!');
    console.log(`📁 Optimized images saved to: ${outputDir}`);

    // Generate file size comparison
    console.log('\n📊 File size comparison:');
    imageFiles.forEach(file => {
      const inputPath = path.join(inputDir, file);
      const outputFileName = path.parse(file).name + '.webp';
      const outputPath = path.join(outputDir, outputFileName);

      if (fs.existsSync(inputPath) && fs.existsSync(outputPath)) {
        const originalSize = fs.statSync(inputPath).size;
        const optimizedSize = fs.statSync(outputPath).size;
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

        console.log(`${file}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(optimizedSize / 1024 / 1024).toFixed(2)}MB (${savings}% smaller)`);
      }
    });

  } catch (error) {
    console.error('❌ Error optimizing images:', error);
  }
}

// Run the optimization
optimizeAllImages();
