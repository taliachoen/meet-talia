const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
require('dotenv').config();

// יצירת אינסטנס של OpenAI עם המפתח שלך
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

console.log("openai", openai);


router.post('/analyze-fit', async (req, res) => {
  console.log("req.body", req.body);

  const { jobDescription, requirements } = req.body;

  if (!jobDescription || !requirements) {
    return res.status(400).json({ error: 'Missing job description or requirements' });
  }

  try {
    const prompt = `

את מגייסת לתפקיד חדש, וזה מה שכתבת על המשרה:
תיאור התפקיד: ${jobDescription}
דרישות: ${requirements}

האם טליה כהן מתאימה?

מידע על טליה כהן:
• מפתחת פול סטאק מוכשרת ובעלת מוטיבציה גבוהה, עם ניסיון מעשי בפיתוח מערכות ופרויקטים מורכבים.
• טכנולוגיות: React, Node.js, JavaScript, TypeScript, C#, Express, MongoDB, MySQL, Next.js.
• ניסיון בבניית אפליקציות צד לקוח וצד שרת כולל REST APIs, לוגיקת שרת, ואבטחה.
• סיימה בהצלחה בוטקאמפ Full Stack מטעם מכון לב ואקדמיה Elevation.
• לימודים אקדמיים בהנדסת תוכנה + לימודי הוראה בתכנות מהמכללה האקדמית להנדסה בישראל.
• ניסיון בפרויקטים כגון מערכת ניהול תורים, מערכת לניהול משימות, מערכת סחר במניות בזמן אמת, ואפליקציית מסחר.
• הובילה חניכים בתנועת נוער תוך פיתוח כישורי תקשורת, אחריות ועבודת צוות.

כתבי בעברית, בצורה מקצועית, ברורה ומשכנעת, למה טליה מתאימה בדיוק למה שהמגייסת מחפשת – בהתאם לתיאור ודרישות המשרה שהיא כתבה למעלה.

    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    });


    console.log('AI Response:', completion.choices[0].message.content); // הדפסת התשובה מה-AI

    res.json({ result: completion.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while contacting AI', details: error.message });
  }
});


module.exports = router;
