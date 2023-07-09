

export const downloadButton = (fileContent: string, filename: string) => { // TODO: move to utils
    // is there a better way to do this? React-specific way?
    const blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
    const fileDownloadUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = fileDownloadUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};