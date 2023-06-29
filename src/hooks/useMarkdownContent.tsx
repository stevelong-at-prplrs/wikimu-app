import * as React from "react";
import { FetchSingleDocContent, docInfo } from "../utils/api";

export const useDocInfo = (docId: string): [docInfo, React.Dispatch<React.SetStateAction<docInfo>>] => {

    const [docInfo, setDocInfo] = React.useState<docInfo>();

    React.useEffect(() => {

        (async () => {
            if (!docInfo) {
                setDocInfo(await FetchSingleDocContent(docId));
        }})()
    }, []);

    return [docInfo, setDocInfo];
}
