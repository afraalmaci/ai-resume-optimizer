const fs = require('fs');
const pdfParse = require('pdf-parse');

const filePath = process.argv[2];
const dataBuffer = fs.readFileSync(filePath);

pdfParse(dataBuffer)
  .then((pdfData) => {
    const text = pdfData.text || '';
    const keywords = ['JavaScript', 'React', 'NestJS'];
    const missingKeywords = keywords.filter((kw) => !text.includes(kw));

    console.log(JSON.stringify({
      text,
      score: Math.floor(Math.random() * 100),
      missingKeywords,
    }));
  })
  .catch((err) => {
    console.error(err);
    console.log(JSON.stringify({ error: 'Failed to parse PDF' }));
  });