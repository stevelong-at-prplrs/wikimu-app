import * as React from "react";
import { updateSingleDocContent } from "../utils/api";

export const EditDocument = ({docContent, setDocContent, docId}) => {

    const [title, setTitle] = React.useState(docContent?.title ?? "");
    const [content, setContent] = React.useState(docContent?.content ?? "");

    const save = () => {
        updateSingleDocContent({id: docId, content, title, v: docContent.v});
        setDocContent({id: docId, content, title});
    };

    const updateTitle = () => {
        if (title) {
            updateSingleDocContent({id: docId, title});
            setDocContent({title});
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <br />
            <input type="text" id="document-name" name="document-name" value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="enter a title"/>
            <br />
            {title === docContent.title ? "" : <button onClick={() => updateTitle()}>Save Title</button>}
            <textarea rows={40} value={content} onChange={(e) => setContent(e.currentTarget.value)}></textarea>
            <button style={{ width: "fit-content" }} onClick={save}>Save</button>
        </div>
    );
}
