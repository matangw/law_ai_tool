const fs = require('node:fs/promises');

exports.readFile = async function (path) {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' });
    return data;
  } catch (err) {
    console.log(err);
  }
};

exports.divideTextIntoChunks = async function (text, chunkSize) {
  const chunks = [];

  for (let i = 0; i < text.length; i += chunkSize) {
    const chunk = text.slice(i, i + chunkSize);
    chunks.push(chunk);
  }

  return chunks;
};
