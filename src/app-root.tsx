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
            </React.Fragment>)
        : <>No docs found</>}
        <br />
        <button onClick={() => createDoc()}>Add new doc</button>
        </>;
}
