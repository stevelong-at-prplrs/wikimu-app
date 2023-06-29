import * as React from "react";
import { useDocumentInfo } from "../hooks/useDocumentInfo";
import { EditDocument } from "./EditDocument";
import { useNavigate, useParams } from "react-router-dom";


export const ViewDocument = () => {

    const navigate = useNavigate();
    const navigateBackHome = () => navigate(-1);

    const { id } = useParams();
    const [docData, setDocData] = useDocumentInfo(id);

    const [docContext, setDocContext] = React.useState<'viewing' | 'editing'>('viewing');

    const html = marked.parse(docData?.content ?? "");
    const cleanedHtml = DOMPurify.sanitize(html);

    return (
    <>
        <button onClick={() => navigateBackHome()}>←</button>
        {" "}
        <button onClick={() => setDocContext('viewing')}>View</button>
        <button onClick={() => setDocContext('editing')}>Edit</button>
        {docContext === 'viewing' ? 
            <>
                <h4>{docData?.title || "untitled"}</h4>
                <div dangerouslySetInnerHTML={{__html: cleanedHtml ?? ""}} />
            </>
        :
            <EditDocument docId={id} docContent={docData} setDocContent={setDocData} cleanedHtml={cleanedHtml} />}
    </>);
}
