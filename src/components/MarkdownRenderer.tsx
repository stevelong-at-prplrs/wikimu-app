import * as React from "react";
import { useMarkdownContent } from "../hooks/useMarkdownContent";
import { EditorView } from "./EditorView";

const MarkdownRenderer = () => {

    const [markdownContent] = useMarkdownContent();
    
    const html = marked.parse(markdownContent);
    const cleanedHtml = DOMPurify.sanitize(html);

    return (
        <>
            <div dangerouslySetInnerHTML={{__html: cleanedHtml}} />
            <EditorView html={cleanedHtml} />
        </>);

};

export default MarkdownRenderer;
