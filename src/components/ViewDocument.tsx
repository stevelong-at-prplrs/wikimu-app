import * as React from "react";
import { useDocInfo } from "../hooks/useMarkdownContent";
import { EditDocument } from "./EditDocument";
import { useParams } from "react-router-dom";


export const ViewDocument = () => {

    const { id } = useParams();
    const [docData, setDocData] = useDocInfo(id);

    const [docContext, setDocContext] = React.useState<'viewing' | 'editing'>('viewing');

    const html = marked.parse(docData?.content ?? "");
    const cleanedHtml = DOMPurify.sanitize(html);

    return (
    <>
        <button onClick={() => setDocContext('viewing')}>View</button>
        <button onClick={() => setDocContext('editing')}>Edit</button>
        {docContext === 'viewing' ? <><h4>{docData?.title || "untitled"}</h4><div dangerouslySetInnerHTML={{__html: cleanedHtml ?? ""}} /></> : <EditDocument docId={id} setDocContent={setDocData} docContent={docData} cleanedHtml={cleanedHtml} />}
    </>);
}
