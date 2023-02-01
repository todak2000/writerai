import React, { useState } from "react";
import { generateOthers } from "@/pages/api/futux";

export default function Futux({setNext}) {
  const [jobDescription, setJobDescription] = useState("");

  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [tone, setTone] = useState("");
  const [numWords, setNumWords] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(jobDescription);
    setIsCopied(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const dataa = {
      industry,
      keyWords,
      tone,
      numWords,
    }

    generateOthers(dataa).then(res=>{
      setIsGenerating(false);
      console.log(res)
      setJobDescription(res.trim());
    })
    
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center px-4 py-2">
          <h1 className="text-4xl md:text-6xl font-bold">
            AI Writeup Generator
          </h1>
    </div>
    <p onClick={()=>{setNext(1)}} >GO BACK</p>
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-row justify-center">
    {jobDescription === "" ?
      <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 ">
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>
 
            <div className="flex flex-col">
              <label htmlFor="industry" className="sr-only">
                Industry
              </label>
              <input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="block w-[90vw] md:w-[50vw] rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Industry (Optional)"
                type="text"
                name="industry"
                id="industry"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="keywords" className="sr-only">
                What would you like AI to do for you?
              </label>
              <textarea
                rows={7}
                value={keyWords}
                onChange={(e) => setKeyWords(e.target.value)}
                name="keyWords"
                id="keyWords"
                placeholder="What would you like AI to do for you?"
                className="block w-[90vw] md:w-[50vw] rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="tone">
                Tone
              </label>

              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="block w-[90vw] md:w-[50vw] rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="tone"
                id="tone"
              >
                <option value="default">Select Tone (Optional)</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="formal">Formal</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="words" className="sr-only">
                Words (Optional)
              </label>
              <input
                value={numWords}
                onChange={(e) => setNumWords(e.target.value)}
                type="number"
                className="block w-[90vw] md:w-[50vw] rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Number Of Words - Default 200 (Optional)"
                name="words"
                id="words"
              />
            </div>

            <button
              className={`bg-blue-600 w-[90vw] md:w-[50vw] hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded
                ${
                  isGenerating || keyWords === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              type="submit"
              disabled={isGenerating || keyWords === ""}
            >
              {isGenerating ? "Generating..." : "Generate Writeup"}
            </button>
          </form>
        </div>
        
      </div>
      :
      <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              rows={
                jobDescription === ""
                  ? 7
                  : jobDescription.split("\n").length + 3
              }
              name="output"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={jobDescription === ""}
              id="output"
              placeholder="AI Generated Writeup"
              className="block md:w-[50vw] w-[90vw] rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
            />
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={jobDescription === ""}
            >
              {isCopied ? "Copied" : "Copy to Clipboard"}
            </button>
            <p  className="mt-4 curseor-pointer" onClick={()=>setJobDescription('')}>Start again</p>
          </div>
        </div>
        }
    </div>
    </>
  );
}
