const generateDescription = async ({

  name, 
  email, 
  phone, 
  skills, 
  school, 
  worked_at, 
  others
}) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Write a one or two page resume in less than 500 words in a professional for  ${name} having the following details:
          phone number: ${phone}, email: ${email}, went to school at ${school},
          worked at ${worked_at} and having the following skills: ${skills}. Other things you should know include: ${others}.`,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      }
    );
    const data = await response.json();

    return data.choices[0].text;
  } catch (err) {
    console.error(err);
  }
};

export default async function handler(req, res) {
  const { name, email, phone, skills, school, worked_at, others } = req.body;

  const resume = await generateDescription({
    name, email, phone, skills, school, worked_at, others
  });

  res.status(200).json({
    resume,
  });
}
