import * as React from "react";
import { useMarkdownContent } from "../hooks/useMarkdownContent";
import { EditDocument } from "./EditDocument";
import { useParams } from "react-router-dom";


export const ViewDocument = () => {

    const { id } = useParams();

    const [docContext, setDocContext] = React.useState<'viewing' | 'editing'>('viewing');

    const [markdownContent, setMarkdownContent] = useMarkdownContent(id);
    // console.log(markdownContent);
    const html = marked.parse(markdownContent?.content ?? "");
    const cleanedHtml = DOMPurify.sanitize(html);

    return (
    <>
        <button onClick={() => setDocContext('viewing')}>View</button>
        <button onClick={() => setDocContext('editing')}>Edit</button>
        {docContext === 'viewing' ? <div dangerouslySetInnerHTML={{__html: cleanedHtml ?? ""}} /> : <EditDocument docId={id} setMarkdownContent={setMarkdownContent} docContent={markdownContent} cleanedHtml={cleanedHtml} />}
    </>);
}
