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

    return docs.length > 0 ? <>{docs.map((doc, index) => <React.Fragment key={index}>{index > 0 && <br />}<Link key={index} to={"/" + doc._id}>{doc.title || doc._id}</Link></React.Fragment>)}</> : <>No docs found</>;
}
