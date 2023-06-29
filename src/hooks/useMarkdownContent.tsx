import * as React from "react";
import { FetchSingleDocContent, docInfo } from "../utils/api";

export const useMarkdownContent = (docId: string): [docInfo, React.Dispatch<React.SetStateAction<docInfo>>] => {

    const [content, setContent] = React.useState<docInfo>();

    React.useEffect(() => {

        (async () => {
            if (!content) {
            setContent(await FetchSingleDocContent(docId));
        }})()
    }, []);

    return [content, setContent];
}
