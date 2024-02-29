const app = require('./app'); // Assuming app.js is in the same directory
const { GoogleGenerativeAI } = require('@google/generative-ai');
const env = require('dotenv');
const aiModel = require('./ai/ai_model');

const port = 8080;
env.config();

aiModel.generateText('give me the 10 commendments').then((value) => {
  console.log(value + '');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
