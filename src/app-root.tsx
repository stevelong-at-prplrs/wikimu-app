import * as React from "react";
import { Link } from "react-router-dom";
import { FetchDocuments, createDoc, deleteDoc, duplicateDoc } from "./utils/api";
import { downloadButton } from "./utils/download";
import ContextMenu from "./components/ContextMenu";
export const AppRoot = () => {

    const [docs, setDocs] = React.useState([]);
    const [showMenu, setShowMenu] = React.useState(false);
    const [menuPosition, setMenuPosition] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        if (docs.length === 0) {
            FetchDocuments(setDocs);
        }
    }, []);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setShowMenu(true);
        setMenuPosition({ x: e.clientX, y: e.clientY });
      };

    return <>
    {docs.length > 0 ?
        docs.map((doc, index) => 
            <div onContextMenu={handleContextMenu} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", overflow: "hidden", flexWrap: "nowrap" }} key={index}>
                <span style={{ flexWrap: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } /* the type system is not adequate currently but this error will disapear when this inline style is moved to stylesheet */}>
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
        {showMenu && <ContextMenu top={menuPosition.y} left={menuPosition.x} />}
        <br />
        <button onClick={() => createDoc()}>Add new doc</button>
        </>;
}

const ContextMenu = ({ top, left }) =>           <div
style={{
  position: 'absolute',
  top,
  left,
  backgroundColor: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
  padding: '5px',
}}
>
{/* Context menu content */}
<div>move</div>
<div>delete</div>
<div>duplicate</div>
<div>download</div>
</div>
