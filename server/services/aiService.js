const OpenAI = require('openai');

// Check if OpenAI API key is configured
if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️  OPENAI_API_KEY not found in environment variables');
  console.warn('   Please add OPENAI_API_KEY to your .env file');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateAIResponse = async (bot, context, userMessage) => {
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return "I'm sorry, my AI service is not configured yet. Please contact the administrator.";
    }

    // Build system prompt based on bot personality
    const systemPrompt = buildSystemPrompt(bot);
    
    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...context,
      { role: 'user', content: userMessage }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('AI Service error:', error);
    return "I'm sorry, I'm having trouble responding right now. Please try again later.";
  }
};

const buildSystemPrompt = (bot) => {
  const { personality, content } = bot;
  
  let prompt = `You are ${bot.name}, a personalized AI assistant. `;
  
  // Add personality traits
  prompt += `Your personality is ${personality.tone} and ${personality.style}. `;
  
  if (personality.emojis) {
    prompt += "Use emojis naturally in your responses to make them more engaging. ";
  }
  
  // Add custom instructions
  if (personality.customInstructions) {
    prompt += `\n\nAdditional instructions: ${personality.customInstructions}\n`;
  }
  
  // Add default responses as knowledge base
  if (content.defaultResponses && content.defaultResponses.length > 0) {
    prompt += "\n\nHere are some common questions and your responses:\n";
    content.defaultResponses.forEach(qa => {
      prompt += `Q: ${qa.question}\nA: ${qa.answer}\n\n`;
    });
  }
  
  // Add learning content
  if (content.learningSources && content.learningSources.length > 0) {
    prompt += "\n\nAdditional knowledge from your content:\n";
    content.learningSources.forEach(source => {
      if (source.processed && source.content) {
        prompt += `${source.content}\n\n`;
      }
    });
  }
  
  prompt += `\n\nGuidelines:
- Always stay in character as ${bot.name}
- Be helpful, friendly, and engaging
- If you don't know something, politely say so and suggest contacting the creator directly
- Keep responses conversational and natural
- Use the tone and style defined in your personality
- If asked about pricing or subscriptions, direct them to the creator's contact information`;

  return prompt;
};

const processLearningContent = async (content, type) => {
  try {
    // This would process different types of learning content
    // For now, we'll just return the content as-is
    // In a full implementation, you might:
    // - Extract text from YouTube transcripts
    // - Parse social media posts
    // - Scrape website content
    // - Use embeddings for better retrieval
    
    return content;
  } catch (error) {
    console.error('Learning content processing error:', error);
    return content;
  }
};

module.exports = {
  generateAIResponse,
  processLearningContent
};

