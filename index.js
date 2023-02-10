const openAI = require('openai');
const { Configuration, OpenAIApi } = openAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = 5000;

const configuration = new Configuration({
    organization: process.env.OPEN_API_ORGANIZATION,
    apiKey: process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());



//qna
app.post('/qna', async (req, res) => {
    const userPrompt = req.body;
    console.log(userPrompt);
    const response = await openai.createCompletion({
        model: userPrompt.model,
        prompt: `I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ:${userPrompt.userInput} ?\nA:`,
        max_tokens: 50,
        temperature: userPrompt.temperature,
        top_p: userPrompt.top_p,
        frequency_penalty: userPrompt.frequency_penalty,
        presence_penalty: userPrompt.presence_penalty,
    })
    if (response.data.choices[0].text) {
        return res.send({ status: true, message: response.data.choices[0].text })
    }
    res.json({ status: false })
})
//grammar correction
app.post('/grammar-correction', async (req, res) => {
    const userPrompt = req.body;
    console.log(userPrompt);
    const response = await openai.createCompletion({
        model: userPrompt.model,
        prompt: `Correct this to standard English:\n\n${userPrompt.userInput}`,
        max_tokens: 20,
        temperature: userPrompt.temperature,
        top_p: userPrompt.top_p,
        frequency_penalty: userPrompt.frequency_penalty,
        presence_penalty: userPrompt.presence_penalty,
    })
    if (response.data.choices[0].text) {
        return res.send({ status: true, message: response.data.choices[0].text })
    }
    res.json({ status: false })
})
//english to bengali
app.post('/english-to-bengali', async (req, res) => {
    const userPrompt = req.body;
    const response = await openai.createCompletion({
        model: userPrompt.model,
        prompt: `Translate this into Bengali language:\n\n${userPrompt.userInput}\n\n1.`,
        max_tokens: 50,
        temperature: userPrompt.temperature,
        top_p: userPrompt.top_p,
        frequency_penalty: userPrompt.frequency_penalty,
        presence_penalty: userPrompt.presence_penalty,
    })
    if (response.data.choices[0].text) {
        return res.send({ status: true, message: response.data.choices[0].text })
    }
    res.json({ status: false })
})
//movie to emoji
app.post('/movie-to-emoji', async (req, res) => {
    const userPrompt = req.body;
    const response = await openai.createCompletion({
        model: userPrompt.model,
        prompt: `Convert movie titles into emoji.\n\nBack to the Future: 👨👴🚗🕒 \nBatman: 🤵🦇 \nTransformers: 🚗🤖 \n${userPrompt.userInput}:`,
        max_tokens: 10,
        temperature: userPrompt.temperature,
        top_p: userPrompt.top_p,
        frequency_penalty: userPrompt.frequency_penalty,
        presence_penalty: userPrompt.presence_penalty,
    })
    if (response.data.choices[0].text) {
        return res.send({ status: true, message: response.data.choices[0].text })
    }
    res.json({ status: false })
})
//explain code
app.post('/explain-code', async (req, res) => {
    const userPrompt = req.body;
    const response = await openai.createCompletion({
        model: userPrompt.model,
        prompt: `${userPrompt.userInput}\n\n\"\"\"\nExplain the code above :\n1.`,
        max_tokens: 50,
        temperature: userPrompt.temperature,
        top_p: userPrompt.top_p,
        frequency_penalty: userPrompt.frequency_penalty,
        presence_penalty: userPrompt.presence_penalty,
    })
    if (response.data.choices[0].text) {
        return res.send({ status: true, message: response.data.choices[0].text })
    }
    res.json({ status: false })
})
//keywords extractor
app.post('/keywords', async (req, res) => {
    const userPrompt = req.body;
    const response = await openai.createCompletion({
        model: userPrompt.model,
        prompt: `Extract keywords from this text:\n\n${userPrompt.userInput}`,
        max_tokens: 50,
        temperature: userPrompt.temperature,
        top_p: userPrompt.top_p,
        frequency_penalty: userPrompt.frequency_penalty,
        presence_penalty: userPrompt.presence_penalty,
    })
    if (response.data.choices[0].text) {
        return res.send({ status: true, message: response.data.choices[0].text })
    }
    res.json({ status: false })
})
//product-ad
app.post('/product-ad', async (req, res) => {
    const userPrompt = req.body;
    const response = await openai.createCompletion({
        model: userPrompt.model,
        prompt: `Write a creative ad for the following product to run on Facebook:\n\nProduct: ${userPrompt.userInput}`,
        max_tokens: 50,
        temperature: userPrompt.temperature,
        top_p: userPrompt.top_p,
        frequency_penalty: userPrompt.frequency_penalty,
        presence_penalty: userPrompt.presence_penalty,
    })
    if (response.data.choices[0].text) {
        return res.send({ status: true, message: response.data.choices[0].text })
    }
    res.json({ status: false })
})
//book-list
app.post('/book-list', async (req, res) => {
    const userPrompt = req.body;
    const response = await openai.createCompletion({
        model: userPrompt.model,
        prompt: `${userPrompt.userInput}:`,
        max_tokens: 50,
        temperature: userPrompt.temperature,
        top_p: userPrompt.top_p,
        frequency_penalty: userPrompt.frequency_penalty,
        presence_penalty: userPrompt.presence_penalty,
    })
    if (response.data.choices[0].text) {
        return res.send({ status: true, message: response.data.choices[0].text })
    }
    res.json({ status: false })
})
//mood to color
app.post('/mod-to-color', async (req, res) => {
    const userPrompt = req.body;
    const response = await openai.createCompletion({
        model: userPrompt.model,
        prompt: `The CSS code for a color like ${userPrompt.userInput}:\n\nbackground-color: #`,
        max_tokens: 10,
        temperature: userPrompt.temperature,
        top_p: userPrompt.top_p,
        frequency_penalty: userPrompt.frequency_penalty,
        presence_penalty: userPrompt.presence_penalty,
    })
    if (response.data.choices[0].text) {
        return res.send({ status: true, message: response.data.choices[0].text })
    }
    res.json({ status: false })
})
//js-one-liner
app.post('/js-one-liner', async (req, res) => {
    const userPrompt = req.body;
    const response = await openai.createCompletion({
        model: userPrompt.model,
        prompt: `Use list comprehension to convert this into one line of JavaScript:\n\n${userPrompt.userInput}\n});\n\nJavaScript one line version:`,
        max_tokens: 50,
        temperature: userPrompt.temperature,
        top_p: userPrompt.top_p,
        frequency_penalty: userPrompt.frequency_penalty,
        presence_penalty: userPrompt.presence_penalty,
    })
    if (response.data.choices[0].text) {
        return res.send({ status: true, message: response.data.choices[0].text })
    }
    res.json({ status: false })
})
//recipe-creator
app.post('/recipe-creator', async (req, res) => {
    const userPrompt = req.body;
    const response = await openai.createCompletion({
        model: userPrompt.model,
        prompt: `Write a recipe based on these ingredients and instructions:\n\n${userPrompt.userInput}\n\nInstructions:`,
        max_tokens: 50,
        temperature: userPrompt.temperature,
        top_p: userPrompt.top_p,
        frequency_penalty: userPrompt.frequency_penalty,
        presence_penalty: userPrompt.presence_penalty,
    })
    if (response.data.choices[0].text) {
        return res.send({ status: true, message: response.data.choices[0].text })
    }
    res.json({ status: false })
})
//sarcastic-chat-bot
app.post('/sarcastic-chat-bot', async (req, res) => {
    const userPrompt = req.body;
    const response = await openai.createCompletion({
        model: userPrompt.model,
        prompt: `Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMarv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMarv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMarv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nMarv: I’m not sure. I’ll ask my friend Google.\nYou: ${userPrompt.userInput}?\nMarv:`,
        max_tokens: 30,
        temperature: userPrompt.temperature,
        top_p: userPrompt.top_p,
        frequency_penalty: userPrompt.frequency_penalty,
        presence_penalty: userPrompt.presence_penalty,
    })
    if (response.data.choices[0].text) {
        return res.send({ status: true, message: response.data.choices[0].text })
    }
    res.json({ status: false })
})
//
app.post('/study-notes', async (req, res) => {
    const userPrompt = req.body;
    const response = await openai.createCompletion({
        model: userPrompt.model,
        prompt: `${userPrompt.userInput}`,
        max_tokens: 50,
        temperature: userPrompt.temperature,
        top_p: userPrompt.top_p,
        frequency_penalty: userPrompt.frequency_penalty,
        presence_penalty: userPrompt.presence_penalty,
    })
    if (response.data.choices[0].text) {
        return res.send({ status: true, message: response.data.choices[0].text })
    }
    res.json({ status: false })
})
//interview-questions
app.post('/interview-questions', async (req, res) => {
    const userPrompt = req.body;
    const response = await openai.createCompletion({
        model: userPrompt.model,
        prompt: `${userPrompt.userInput}`,
        max_tokens: 50,
        temperature: userPrompt.temperature,
        top_p: userPrompt.top_p,
        frequency_penalty: userPrompt.frequency_penalty,
        presence_penalty: userPrompt.presence_penalty,
    })
    if (response.data.choices[0].text) {
        return res.send({ status: true, message: response.data.choices[0].text })
    }
    res.json({ status: false })
})

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log(`Listening to ${port} port`)
})