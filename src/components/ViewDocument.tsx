import * as React from "react";
import { useParams } from "react-router-dom";
import { useMarkdownContent } from "../hooks/useMarkdownContent";
import { EditDocument } from "./EditDocument";


export const ViewDocument = ({ docContext }) => {
    const { id } = useParams();

    console.log({id});
    console.log({docContext});

    const [markdownContent] = useMarkdownContent();
    const html = marked.parse(markdownContent);
    const cleanedHtml = DOMPurify.sanitize(html);

    return docContext === 'viewing' ? <div dangerouslySetInnerHTML={{__html: cleanedHtml}} /> : <EditDocument html={cleanedHtml} />;
}
