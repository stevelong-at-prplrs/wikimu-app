import * as React from "react";
import { FetchSingleDocContent } from "../utils/api";

export const useMarkdownContent = (docId: string): [string, React.Dispatch<React.SetStateAction<string>>] => {

    const [content, setContent] = React.useState('');

    React.useEffect(() => {
        if (!content) {
            FetchSingleDocContent(docId, setContent);
        }
    }, []);

    return [content, setContent];
}
