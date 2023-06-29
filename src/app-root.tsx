import * as React from "react";
import { Link } from "react-router-dom";
import { FetchDocuments } from "./utils/api";

export const AppRoot = () => {

    const [docs, setDocs] = React.useState([]);

    React.useEffect(() => {
        if (docs.length === 0) {
            FetchDocuments(setDocs);
        }
    }, []);

    return docs.length > 0 ?
        <>{docs.map((doc, index) => 
            <React.Fragment key={index}>{index > 0 && <br />}
                <Link key={index} to={"/" + doc._id}>{doc.title || "untitled"}</Link>
                <span>{" "}{doc.content ? doc.content.length > 25 ? doc.content.substring(0, 24) + "..." : doc.content : ""}</span>
            </React.Fragment>)}
        </>
        : <>No docs found</>;
}