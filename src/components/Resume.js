import React, { useState, useEffect } from "react";
import { resumeInputData, resumeTextData } from "./constants";
import BasicDocument from "./pdf";

export default function Resume({setNext}) {
  const [resume, setResume] = useState("");


  const [form, setForm] = useState({
    names: '',
    email:'',
    phone:'',
    skills:'',
    school:'',
    worked_at:'',
    others:''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(resume);
    setIsCopied(true);
  };
  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const res = await fetch("/api/resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.names,
        email: form.email,
        phone: form.phone,
        skills: form.skills,
        school: form.school,
        worked_at: form.worked_at,
        others: form.others
      }),
    });
    setIsGenerating(false);
    const data = await res.json();
    setResume(data.resume.trim());
  };
  useEffect(() => {
    // console.log(resume.split("\n"), "resume split")
  }, [resume])
  

  return (
    <>
    <div className="flex flex-col items-center justify-center px-4 py-2">
          <h1 className="text-4xl md:text-6xl font-bold">
            AI Resume Generator
            <span className="text-4xl md:text-6xl font-bold text-blue-600">
              .
            </span>
          </h1>
          <p className="mt-3 text-2xl">
            Create Beautiful
            <span className="text-2xl font-bold text-blue-600">
              {" "}
              Resume{" "}
            </span>
            in Seconds
          </p>
    </div>
    <p onClick={()=>{setNext(1)}} >GO BACK HOME</p>
    
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-row justify-center">
    {resume === '' ?
      <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 ">
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>
            {resumeInputData.map(({id, type, name, placeholder, label, label2})=>{
              return(
                <div key={id} className="w-[100%] relative ">
                  <p className="text-sm text-black">{label2} </p>
                  <p className="text-[0.6rem] text-gray-500">{label}</p>
                  <input
                    key={id} 
                    type={type} 
                    name={name}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    className={` px-4 py-2 my-2 bg-transparent border border-gray-400 h-[45px] text-black w-full md:w-[85%] text-xs  font-thin rounded`}
                  />
                  
                </div>
              )
            })}
            {resumeTextData.map(({id, row, name, placeholder, label, label2})=>{
              return(
                <div key={id} className="w-[100%] relative ">
                  <p className="text-sm text-black">{label2}</p>
                  <p className="text-[0.6rem] text-gray-500">{label}</p>
                  <textarea
                    className={`bg-transparent px-4 py-2 my-2  border border-gray-400  text-black w-full md:w-[85%] text-xs  font-thin rounded`}
                    rows={row}
                    name={name}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                  />
                </div>
              )
            })}
           

            <button
              className={`bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded
                ${
                  isGenerating || form.names === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              type="submit"
              disabled={isGenerating || form.names === ""}
            >
              {isGenerating ? "Generating..." : "Create Resume"}
            </button>
          </form>
        </div>
        
        
      </div>
      :

      <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 " >
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              
              rows={
                resume === ""
                  ? 7
                  : resume.split("\n").length + 12
              }
              name="output"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              disabled={resume === ""}
              id="output"
              placeholder="AI Generated Resume Description"
              className="block w-[90vw] md:w-[50vw] rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
            />
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={resume === ""}
            >
              {isCopied ? "Copied" : "Copy to Clipboard"}
            </button>
            
            {resume !== "" && <BasicDocument text={resume} />}
            <p  className="curseor-pointer" onClick={()=>setResume('')}>Start again</p>
          </div>
        </div>
        }
    </div>
    
    </>
  );
}
