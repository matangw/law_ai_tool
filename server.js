const app = require('./app'); // Assuming app.js is in the same directory
const { GoogleGenerativeAI } = require('@google/generative-ai');
const env = require('dotenv');
const aiModel = require('./ai/ai_model');
const filesManager = require('./utils/manage_files');
const neo4j = require('./neo4j/neo_conncetion');

const prePrompt = filesManager.readFile('./prompts/pre_prompt.txt');
const data = filesManager.readFile('./prompts/data.txt');

const port = 8080;
env.config();

async function main() {
  let arrayOfData = await aiModel.bakeData();
  neo4j.addWithArray(arrayOfData);
}

main();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
