import * as React from "react";
import { FetchSingleDocContent } from "../utils/api";

export const useMarkdownContent = (): [string, React.Dispatch<React.SetStateAction<string>>] => {

    const [content, setContent] = React.useState('');

    React.useEffect(() => {
        if (!content) {
            FetchSingleDocContent(setContent);
        }
    }, []);

    return [content, setContent];
}
