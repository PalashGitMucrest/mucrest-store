import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faFolder, faTimes } from "@fortawesome/free-solid-svg-icons"
import './Folder.scss'
import { database } from "../../firebase"

export default function Folder({ folder }) {
  let [deletedId, setId] = useState(folder.id);
  let [edit, setEdit] = useState(false);
  let [name, setName] = useState(true);
  let [clicked, setClicked] = useState(false);
  const location = useLocation();


  document.addEventListener('click', function (e) {
    let inside = (e.target.closest('#container'));
    if (!inside && clicked) {
      let contextMenu = document.getElementById(folder.id);
      // contextMenu.setAttribute('style', 'display:none');
      console.log(location.pathname);
      contextMenu.style.display = 'none';
      setClicked(false);
    }
  });
  

  const saveData = () => {
    database.folders.doc(folder.id).update({ name: name });
    setEdit(false);
  }

  const showItems = (event) => {
    event.preventDefault();
    setClicked(true);
    let contextMenu = document.getElementById(folder.id);
    console.log(contextMenu);
    contextMenu.style.cssText = `
    position: fixed;
    z-index: 10000;
    width: 150px;
    background: #1b1a1a;
    border-radius: 5px;
    display: none;
    color: white;
    `;
    const { clientX: mouseX, clientY: mouseY } = event;
    contextMenu.style.top = `${mouseY}px`;
    contextMenu.style.left = `${mouseX}px`;
    contextMenu.classList.add("visible");
    contextMenu.classList.add("block");
    contextMenu.style.display = 'block';
  }

  return (
    <>

      {!edit && <Button className="dashboard_folder_icon"

        
        to={{
          pathname: `/folder/${folder.id}`,
          state: { folder: folder },
        }}
        onContextMenu={showItems}
       
        as={Link}
      >
        <div className="icon_part">
          <FontAwesomeIcon icon={faFolder} className="icon" />
        </div>
        <div className="name_part">
          <p className="m-0">
            {folder.name}
          </p>
        </div>

      </Button>}
      {
        edit && <div className="edit_mode_outer">
          <div className="input">
            <input type="text" placeholder="Enter the Folder Name" defaultValue={folder.name} onChange={(e) => { e.preventDefault(); console.log(e.target.value); setName(e.target.value) }} />
          </div>
          <div className="editButtons">
            <div className="iconOuter saveIcon">
              {/* <Button onClick={saveData}>save</Button> */}
              <FontAwesomeIcon onClick={saveData} icon={faCheck} className="icon" />
            </div>
            <div className="iconOuter cancelIcon">
              <FontAwesomeIcon onClick={() => setEdit(false)} icon={faTimes} className="icon" />
              {/* <Button onClick={() => setEdit(false)}>cancel</Button> */}
            </div>
          </div>
        </div>
      }

      {
        <div className="menu_container" style={{ display: 'none' }} id={folder.id} >
          <div className="item" onClick={() => database.folders.doc(deletedId).delete()}>delete {folder.name}</div>
          <div className="item" onClick={() => setEdit(true)}>Edit</div>
          <div className="item">Option 3</div>
          <div className="item">Option 4</div>
          <div className="item">Option 5</div>
        </div>}

    </>
  )
}
