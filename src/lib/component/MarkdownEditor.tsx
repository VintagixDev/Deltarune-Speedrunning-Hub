"use client";

import dynamic from "next/dynamic";
import React from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div data-color-mode="dark">
      <MDEditor value={value} onChange={onChange} height={500} />
    </div>
  );
}