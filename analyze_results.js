import fs from 'fs';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

// .env 파일을 읽어 환경 변수를 설정합니다.
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('API key not found');
}

const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

async function analyzeTestResults() {
  const testResults = fs.readFileSync('build/result.log', 'utf8');
  const prompt = `테스트 결과를 분석하고 피드백을 제공합니다: ${testResults}`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ]
  });

  const feedback = response.data.choices[0].message.content.trim();
  fs.writeFileSync('feedback.log', feedback);
}

analyzeTestResults().catch(error => {
  console.error(error);
  process.exit(1);
});
