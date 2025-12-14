const { config } = require('dotenv');
config();
console.log('Your Key is:', process.env.OPENROUTER_API_KEY);
const { OpenRouter } = require('@openrouter/sdk');
const openRouter = new OpenRouter({

    // apiKey: process.env.OPENROUTER_API_KEY,
    apiKey:'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',
    defaultHeaders: {
        'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
        'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
    },
});

const aiResponceOpenRouter= async(data)=>{
    console.log("user prompt", data)
    const completion = await openRouter.chat.send({
    // model: 'mistralai/devstral-2512:free',
    model: 'google/gemini-2.0-flash-001',
    messages:data ,
    stream: false,
});

return completion.choices[0].message.content;

}
module.exports={aiResponceOpenRouter}
// console.log(process.env.OPENROUTER_API_KEY);
