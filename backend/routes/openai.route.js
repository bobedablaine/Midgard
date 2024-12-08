import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/chat', async (req, res) => {
    const { userInput } = req.body; // Capture user input from the request

    try {
        const response = await axios.post(process.env.AZURE_OPENAI_ENDPOINT, 
            {
              messages: [{ role: 'user', content: userInput }],
              max_tokens: 150,
            }, 
            {
              headers: {
                'api-key': process.env.AZURE_OPENAI_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        // For the Chat Completions API, the assistant's response is in message.content
        const reply = response.data.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error('Error calling Azure OpenAI:', error);
        res.status(500).json({ error: 'Failed to fetch response from OpenAI.' });
    }
});


export default router;
