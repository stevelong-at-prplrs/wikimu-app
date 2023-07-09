import * as React from "react";
import { updateSingleDocContent } from "../utils/api";

export const EditDocument = ({docContent, setDocContent, docId}) => {

    const [title, setTitle] = React.useState(docContent?.title ?? "");
    const [content, setContent] = React.useState(docContent?.content ?? "");

    const updateDocContentAndVersion = () => {
        updateSingleDocContent({id: docId, content, v: docContent.v});
        setDocContent({id: docId, content});
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
            <span>
                <input type="text" id="document-name" name="document-name" value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="enter a title"/>
                {" "}
                <button disabled={title===docContent.title} style={{ width: "fit-content" }} onClick={() => updateTitle()}>Save Title</button>
            </span>
            <br />
            <textarea rows={40} value={content} onChange={(e) => setContent(e.currentTarget.value)}></textarea>
            <br />
            <button disabled={content===docContent.content} style={{ width: "fit-content" }} onClick={updateDocContentAndVersion}>Save</button>
        </div>
    );
}
