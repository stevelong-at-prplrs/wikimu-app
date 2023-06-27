import * as React from "react";
import { Link } from "react-router-dom";
import { FetchDocuments } from "./utils/api";

export const AppRoot = ({docContext}) => {

    const [docs, setDocs] = React.useState([]);

    React.useEffect(() => {
        if (docs.length === 0) {
            FetchDocuments(setDocs);
        }
    }, []);

    React.useEffect(() => console.log({docs}), [docs]);

    return docs.length > 0 ? <>{docs.map((doc, index) => <Link key={index} to={"/" + doc._id}>${doc.title}</Link>)}</> : <>No docs found</>;
}
