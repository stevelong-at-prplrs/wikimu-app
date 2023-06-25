import * as React from "react";
import { Editor } from '@tinymce/tinymce-react';
import { useMarkdownContent } from "../hooks/useMarkdownContent";
import TurndownService from 'turndown'


export const EditorView = ({html}: {html: string}) => {
    
    const turndownService = new TurndownService();
    
    const [_markdownContent, setMarkdownContent] = useMarkdownContent();
    const editorRef = React.useRef(null);
    
    const log = () => {
        if (editorRef.current) {
            const markdown = turndownService.turndown(editorRef.current.getContent());
            console.log(markdown);
        }
    };
    return (
        <>
            <Editor
                apiKey='your-api-key'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={html}
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
            <button onClick={log}>Convert to Markdown and Save</button>
        </>
    );
}
