import fs from 'fs/promises';
import path from 'path';

const botRoot = path.join(process.cwd())
const inputFile = path.join(botRoot, 'robo.config.js');
const outputFile = path.join(botRoot, 'config', 'robo.mjs');

async function copyFile() {
  const dir = path.dirname(outputFile);

  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.copyFile(inputFile, outputFile);
    console.log('Copied successfully:', outputFile);
  } catch (err) {
    console.log(`Error occurred while copying ${inputFile}: ${err}`);
  }
}

copyFile();