export const generateCoverLetter = async ({
  name, job_title, job_description, skills, company, others
}) => {

  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Write a one cover letter in less than 500 words in a professional manner for  ${name} applying for the role of ${job_title}
          at ${company}. The job description is as follows: ${job_description}. Take into consideration the following skillsets relevant to the job: ${skills}
          . Other things you should know include: ${others}.`,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      }
    );
    const data = await response.json();
      // console.log(data, "res")
    return data.choices[0].text;
  } catch (err) {
    console.error(err);
  }
};
