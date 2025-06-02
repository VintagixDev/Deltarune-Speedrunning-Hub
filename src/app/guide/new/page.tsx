"use client";

import css from "@/app/css/guides/newStrat.module.css";
import MarkdownEditor from "@/lib/component/MarkdownEditor";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getSession from "@/lib/auth";

async function getSection(chapter) {
  const res = await fetch(`/api/section/get?chapterName=${chapter}`);
  return await res.json();
}

async function getChapters(chapterLink) {
  const res = await fetch(`/api/chapters/get`);
  const response = await res.json();
  const links = response.map((chapter) => chapter.chapterLink);

  if (!links.includes(chapterLink)) {
    chapterLink = "allchapters";
  }

  const res2 = await fetch(`/api/chapters/get?chapterName=${chapterLink}`);
  return await res2.json();
}

export default function NewStrat({ searchParams }) {
  const router = useRouter();
  const [markdown, setMarkdown] = useState("**Start writing...**");
  const [sections, setSections] = useState([]);
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  
  useEffect(() => {
      async function loadData() {
          const chapterLink = searchParams?.chapterLink || "allchapters";
          const chapterData = await getChapters(chapterLink);
      setChapter(chapterData[0]);

      const sectionData = await getSection(chapterData[0].chapterLink);
      setSections(sectionData);
      
    }
    
    loadData();
}, [searchParams]);

if (!chapter) return <p>Loading...</p>;

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
    
    // Append markdown manually since it's not in a normal input
    formData.set("markdown", markdown);
    
    try {
        const res = await fetch("/api/strats/new", {
            method: "POST",
            body: formData,
        });
        
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || "Failed to submit");
        }
        
        
        router.push(`/guides/${chapter.chapterLink}`)
      e.target.reset();

      
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

return (
    <div className={css.newStratContainer}>
      <div className={css.header}>
        <h1>Post a new guide - {chapter.chapterName}</h1>
      </div>

      <div className={css.formContainer}>
        <form onSubmit={handleSubmit}>
          <p>Name<a>*</a>:</p>
          <label htmlFor="name">
            <input type="text" name="name" placeholder="Input name..." maxLength={70} required />
          </label>

          <p>Section<a>*</a>:</p>
          <label htmlFor="section">
            <select name="section" required>
              {sections.map((section) => (
                <option value={section.sectionID} key={section.sectionID}>
                  {section.sectionName}
                </option>
              ))}
            </select>
          </label>

          <p>Video link (optional):</p>
          <label htmlFor="video">
            <input type="text" name="video" placeholder="Video link..." maxLength={70} />
          </label>

          <p>Guide Content<a>*</a>:</p>
          <MarkdownEditor value={markdown} onChange={(val) => setMarkdown(val || "")} />

           <input type="hidden" name="markdown" value={markdown} />
           <input type="hidden" name="chapter" value={chapter.chapterID} />
            
          <button type="submit" disabled={loading} className={css.submit}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
