"use client";

import css from "@/app/css/guides/newStrat.module.css";
import MarkdownEditor from "@/lib/component/MarkdownEditor";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

async function getSection(chapter) {
  const res = await fetch(`/api/section/get?chapterName=${chapter}`);
  return await res.json();
}

async function getStrat(stratID, router){
    
    const res = await fetch(`/api/strats/get`);
    const response = await res.json();
    const links = response.map((strat) => strat.stratID);
    if (!links.includes(Number(stratID))) {
        router.push('/guides')
        
    }
    const res2 = await fetch(`/api/strats/get?stratID=${stratID}`);
    const response2 = await res2.json();
    return response2;
}

async function getChapterFromStrat(chapterLink) {
  const res = await fetch(`/api/chapters/get?chapterName=${chapterLink}`);
  const response = await res.json();
  
  return await response;
}

export default function NewStrat({ searchParams }) {
  const router = useRouter();
  const [markdown, setMarkdown] = useState("**Start writing...**");
  const [sections, setSections] = useState([]);
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [strat, setStrat] = useState(null);

  
  useEffect(() => {
      async function loadData() {
          const stratID = (await searchParams).stratID;
          
          const stratData = await getStrat(stratID, router);
          const chapterData = await getChapterFromStrat(stratData[0].chapterLink)
      setChapter(chapterData[0]);

      const sectionData = await getSection(chapterData[0].chapterLink);
      setSections(sectionData);

        setStrat(stratData[0]);
        setMarkdown(stratData[0].stratDescription || "**Start writing...**");

    }
    
    loadData();
}, [searchParams]);

if (!chapter || !strat) return <p>Loading...</p>;

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!markdown.trim()) {
        alert("Please enter a guide description.");
        return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    const formData = new FormData(e.target);
    
    formData.set("markdown", markdown);
    
    try {
        const res = await fetch("/api/strats/edit", {
            method: "POST",
            body: formData,
        });
        
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || "Failed to submit");
        }
        
        setSuccess("Guide updated successfully!");
        router.push(`/guides/${chapter.chapterLink}`)
      e.target.reset();
      setMarkdown(""); 
      
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};



return (
    <div className={css.newStratContainer}>
      <div className={css.header}>
        <h1>Update a guide - {chapter.chapterName}</h1>
      </div>

      <div className={css.formContainer}>
        <form onSubmit={handleSubmit}>
          <p>Name<a>*</a>:</p>
          <label htmlFor="name">
            <input type="text" name="name" defaultValue={strat?.stratName} placeholder="Input name..."  maxLength={70} required />
          </label>

          <p>Section<a>*</a>:</p>
          <label htmlFor="section">
            <select name="section" required defaultValue={strat?.sectionID}>
              {sections.map((section) => (
                <option value={section.sectionID} key={section.sectionID}>
                  {section.sectionName}
                </option>
              ))}
            </select>
          </label>

          <p>Video link (optional):</p>
          <label htmlFor="video">
            <input type="text" name="video" defaultValue={strat?.stratVideo} placeholder="Video link..." maxLength={70} />
          </label>

          <p>Guide Content<a>*</a>:</p>
          <MarkdownEditor value={markdown} onChange={(val) => setMarkdown(val || "")} />

           <input type="hidden" name="markdown" value={markdown} />
           <input type="hidden" name="chapter" value={chapter.chapterID} />
           {strat && <input type="hidden" name="stratID" value={strat.stratID} />}
            
          <button type="submit" disabled={loading} className={css.submit}>
            {loading ? "Updating" : "Update"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </div>
  );
}
