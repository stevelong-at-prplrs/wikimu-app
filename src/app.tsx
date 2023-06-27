import * as React from "react";
import { MarkdownRenderer } from "./components/MarkdownRenderer";
import { EditorView } from "./components/EditorView";
import { useMarkdownContent } from "./hooks/useMarkdownContent";

export const App = ({docContext}) => {

    const [markdownContent] = useMarkdownContent();
    const html = marked.parse(markdownContent);
    const cleanedHtml = DOMPurify.sanitize(html);

    return docContext === "viewing" ? <MarkdownRenderer cleanHTML={cleanedHtml} /> : <EditorView html={cleanedHtml}/>;
}
