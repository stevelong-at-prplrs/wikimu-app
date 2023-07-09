import * as React from "react";
import { Link } from "react-router-dom";
import { FetchDocuments, createNewDoc, deleteSingleDocContent } from "./utils/api";

const deleteDoc = async (id: string) => {
    const response = await deleteSingleDocContent(id);
    if (response && response.status === 200) {
        window.location.reload(); // TODO: replace with a state update to avoid a full page reload. Update document list by removing successfully deleted doc from state.
    }
};

const createDoc = async () => {
    const response = await createNewDoc();
    if (response._id) {
        window.location.reload(); // TODO: replace with a state update to avoid a full page reload. Update document list by adding successfully created doc to state.
    }
};

const downloadButton = (fileContent: string, filename: string) => { // TODO: move to utils
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

export const AppRoot = () => {

    const [docs, setDocs] = React.useState([]);

    React.useEffect(() => {
        if (docs.length === 0) {
            FetchDocuments(setDocs);
        }
    }, []);

    return <>
    {docs.length > 0 ?
        docs.map((doc, index) => 
            <React.Fragment key={index}>{index > 0 && <br />}
                <Link key={index} to={"/" + doc._id}>{doc.title || "untitled"}</Link>
                <span> (v{doc.__v}) {doc.content ? doc.content.length > 25 ? doc.content.substring(0, 24) + "..." : doc.content : ""}</span>
                {" "}
                <button onClick={() => deleteDoc(doc._id)}>delete</button>
                {" "}
                <button onClick={() => console.log("duplicate")}>duplicate</button>
                {" "}
                <button onClick={() => downloadButton(doc.content || "", doc.title || doc._id)}>download</button>
            </React.Fragment>)
        : <>No docs found</>}
        <br />
        <button onClick={() => createDoc()}>Add new doc</button>
        </>;
}
