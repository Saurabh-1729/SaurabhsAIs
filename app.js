const express = require('express')
const app = new express()
require('dotenv').config() 
const bodyParser = require('body-parser');
const {OpenAI}  = require('openai')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up OpenAI API 
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

app.get('/', (req, res) => {
    res.send('Welcome to SaurabhAIs');
})

app.post('/api/v1/converse', async (request, response) => {

    // Extracting user's message from the prompt
    const message = request.body.message;

    // Calling openAI API 
    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: "user", content: message}],
    })

    response.send(chatCompletion.choices[0].message);
    console.log(chatCompletion.choices[0].message);
})

app.listen(process.env.PORT, () => {
    console.log(`App is listening to port ${process.env.PORT}`);
})
