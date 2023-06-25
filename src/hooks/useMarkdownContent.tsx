import * as React from "react";

export const useMarkdownContent = (): [string, React.Dispatch<React.SetStateAction<string>>] => {

    const [content, setContent] = React.useState('');

    const getFileData = async () => {
        await fetch('./markdown/file1.md').then((response) => response.body.getReader().read()).then(c => {
            const mdStr = new TextDecoder().decode(c.value);
            setContent(mdStr);
        });
    }

    React.useEffect(() => {
        if (!content) {
            getFileData();
        }
    }, []);

    return [content, setContent];
}