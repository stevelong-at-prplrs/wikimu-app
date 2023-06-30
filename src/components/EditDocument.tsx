import * as React from "react";
import { Editor } from '@tinymce/tinymce-react';
import TurndownService from 'turndown'
import { updateSingleDocContent } from "../utils/api";

export const EditDocument = ({docContent, cleanedHtml, setDocContent, docId}) => {

    const [title, setTitle] = React.useState(docContent?.title ?? "");
    const turndownService = new TurndownService();
    const editorRef = React.useRef(null);
    
    const save = () => {
        if (editorRef.current) {
            const markdown: string = turndownService.turndown(editorRef.current.getContent());
            updateSingleDocContent({id: docId, content: markdown, title, v: docContent.v});
            setDocContent({id: docId, content: markdown, title});
        }
    };

    const updateTitle = () => {
        if (title) {
            updateSingleDocContent({id: docId, title});
            setDocContent({title});
        }
    };

    return (
        <>
            <br />
            <label htmlFor="document-name">Document Title:</label>
            <input type="text" id="document-name" name="document-name" value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="enter a title"/>
            {title === docContent.title ? "" : <button onClick={() => updateTitle()}>Save Title</button>}
            <Editor
                // apiKey='your-api-key'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={cleanedHtml}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <button onClick={save}>Save</button>
        </>
    );
}
