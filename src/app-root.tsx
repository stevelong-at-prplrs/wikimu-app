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
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", overflow: "hidden", flexWrap: "nowrap" }} key={index}>
                <span style={{ textWrap: "nowrap", overflow: "hidden", "text-overflow": "ellipsis" } /* the type system is not adequate currently but this error will disapear when this inline style is moved to stylesheet */}>
                    <Link key={index} to={"/" + doc._id}>{doc.title || "untitled"}</Link>
                    <span> (v{doc.__v}) {doc.content ? doc.content.length > 25 ? doc.content.substring(0, 24) + "..." : doc.content : ""}</span>
                </span>
                <div style={{ whiteSpace: "nowrap" }}>
                    <button onClick={() => deleteDoc(doc._id)}>delete</button>
                    {" "}
                    <button onClick={() => console.log(duplicateDoc(doc._id))}>duplicate</button>
                    {" "}
                    <button onClick={() => downloadButton(doc.content || "", doc.title || doc._id)}>download</button>
                </div>
            </div>)
        : <>No docs found</>}
        <br />
        <button onClick={() => createDoc()}>Add new doc</button>
        </>;
}
