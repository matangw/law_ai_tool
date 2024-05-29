const OpenAi = require('openai');
const env = require('dotenv');
const filesManager = require('../utils/manage_files');

async function generateText(prePrompt, prompt) {
  env.config();
  const openai = new OpenAi({
    apiKey: process.env.OPEN_AI_API_KEY, // This is the default and can be omitted
  });
  let completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prePrompt + prompt }],
    model: 'gpt-3.5-turbo',
  });
  return completion.choices[0].message.content;
}

async function retry(pre_prompt, prompt, tries) {
  if (tries > 3) {
    return [];
  }
  try {
    let data = await generateText(pre_prompt, prompt);
    const array = JSON.parse(data);
    return [...array];
  } catch (error) {
    return await retry(pre_prompt, prompt, tries + 1);
  }
}

exports.bakeData = async function () {
  const prePrompt = await filesManager.readFile('./prompts/pre_prompt.txt');
  const rawData = await filesManager.readFile('./prompts/data.txt');
  const chunks = await filesManager.divideTextIntoChunks(rawData, 15000);
  const cypherCommands = [];
  for (let i = 0; i < 3; i++) {
    context = '';
    if (i > 0) {
      context = chunks[i - 1].slice(-100);
    }
    let data = await generateText(prePrompt, `${context} ${chunks[i]}`);
    console.log('chunk number: ' + i);
    //remove the /n and \n from the data
    data.replace(/(\r\n|\n|\r)/gm, '');
    try {
      const array = JSON.parse(data);
      cypherCommands.push(...array);
    } catch (err) {
      cypherCommands.push(
        ...(await retry(prePrompt, `${context} ${chunks[i]}`, 1))
      );
    }
  }
  return cypherCommands;
};
