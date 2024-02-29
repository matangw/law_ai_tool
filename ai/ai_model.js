const { GoogleGenerativeAI } = require('@google/generative-ai');
const env = require('dotenv');

exports.generateText = async function (prompt, prePrompt) {
  const genAi = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
  const aiConfig = {
    temperature: 0.9,
    maxOutputTokens: 4096,
    topP: 1,
    topK: 1,
  };
  const aiModel = genAi.getGenerativeModel({
    model: 'gemini-1.0-pro',
    config: aiConfig,
  });

  const history =
    prePrompt == null
      ? null
      : [
          {
            role: 'user',
            parts: [{ text: prePrompt }],
          },
        ];

  try {
    const chat = aiModel.startChat({
      history,
    });
    const result = await chat.sendMessage(prompt);
    response = result.response;
    console.log(response.text());
  } catch (err) {
    console.log(err);
  }
};
