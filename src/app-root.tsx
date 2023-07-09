import * as React from "react";
import { Link } from "react-router-dom";
import { FetchDocuments, createDoc, deleteDoc, duplicateDoc } from "./utils/api";
import { downloadButton } from "./utils/download";
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
                <button onClick={() => console.log(duplicateDoc(doc._id))}>duplicate</button>
                {" "}
                <button onClick={() => downloadButton(doc.content || "", doc.title || doc._id)}>download</button>
            </React.Fragment>)
        : <>No docs found</>}
        <br />
        <button onClick={() => createDoc()}>Add new doc</button>
        </>;
}
