import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import RemarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierHeathLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export function Markdown(props: { content: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isSVG, setIsSVG] = useState(false);

  const capitalizationLanguageNameMap: Record<string, string> = {
    sql: "SQL",
    javascript: "JavaScript",
    java: "Java",
    typescript: "TypeScript",
    vbscript: "VBScript",
    css: "CSS",
    html: "HTML",
    xml: "XML",
    php: "PHP",
    python: "Python",
    yaml: "Yaml",
    mermaid: "Mermaid",
    markdown: "MarkDown",
    makefile: "MakeFile",
  };
  const getCorrectCapitalizationLanguageName = (language: string) => {
    if (!language) return "Plain";

    if (language in capitalizationLanguageNameMap)
      return capitalizationLanguageNameMap[language];

    return language.charAt(0).toUpperCase() + language.substring(1);
  };
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
        rehypePlugins={[RehypeKatex]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match?.[1];
            const languageShowName = getCorrectCapitalizationLanguageName(
              language || ""
            );
            return !inline && match ? (
              <div>
                <div
                  className="flex justify-between h-8 items-center p-1 pl-3 border-b"
                  style={{
                    borderColor: "rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div className="text-[13px] text-gray-500 font-normal">
                    {languageShowName}
                  </div>
                  <div style={{ display: "flex" }}>
                    {/* {language === "mermaid" && (
                      <SVGBtn isSVG={isSVG} setIsSVG={setIsSVG} />
                    )}
                    <CopyBtn
                      className={cn(s.copyBtn, "mr-1")}
                      value={String(children).replace(/\n$/, "")}
                      isPlain
                    /> */}
                  </div>
                </div>
                {/* {language === "mermaid" && isSVG ? (
                  <Flowchart
                    PrimitiveCode={String(children).replace(/\n$/, "")}
                  />
                ) : (
                  
                )} */}
                <SyntaxHighlighter
                  {...props}
                  style={atelierHeathLight}
                  customStyle={{
                    paddingLeft: 12,
                    backgroundColor: "#fff",
                  }}
                  language={match[1]}
                  showLineNumbers
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {/* Markdown detect has problem. */}
        {props.content}
      </ReactMarkdown>
    </div>
  );
}
