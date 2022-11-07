import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faFolder, faTimes } from "@fortawesome/free-solid-svg-icons"
import './Folder.scss'
import { database, storage } from "../../firebase"
import { useKeyboardShortcut } from "../../hooks/useKeyboardShortcut"
import { useSelector } from "react-redux"
import { useCallback } from "react"

// import { useKeyboardShortcut } from "./Navbar"

export default function Folder({ folder }) {
  let [deletedId, setId] = useState(folder.id);
  let [edit, setEdit] = useState(false);
  let [name, setName] = useState(true);
  let [clicked, setClicked] = useState(false);
  let [copiedData, setCopy] = useState();
  let myState = useSelector((state) => state.rolePermission);

  function test123() {

    if (copiedData) {
      database.folders.doc(folder.id).delete();
      database.folders.add(copiedData);
      setCopy('');
    }

  }

  useKeyboardShortcut(test123, ['Shift', 'Enter']);

  

  let [folderArr, setArr] = useState([]);
  let [delFlag, setFlag] = useState(false);


  const deleteFolder = () => {

    if (myState === 'read') {
      alert(`You don't have the permission to delete this folder`);
      return;
    }

    else {
      database.folders.doc(folder.id)
        .delete()
        .then((docRef) => {
          console.log(docRef.data())



        })
        .catch((error) => { });
        setFlag(true)
    }


  }

    
      document.addEventListener('click', function (e) {//if a user click outside right click menubar
        let inside = (e.target.closest('#container'));
        if (!inside && folder.id) {
          let contextMenu = document.getElementById(folder.id);
          if(contextMenu){
            contextMenu.style.display = 'none';
          }
          setClicked(false);
        }
      });

      
    

  


  useEffect(() =>{
    // console.log(folder.name);
    // setArr(...folder.name)
    // console.log(folder.id);
    console.log(delFlag);
    
  },[delFlag])


  const saveData = () => {//to update the name of the folder
    database.folders.doc(folder.id).update({ name: name });
    console.log(folderArr);
    setEdit(false);
  }

  const showItems = (event) => {//show menu on on right click
    event.preventDefault();
    setClicked(true);
    // setFlag(false);
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
  function setPassword() {
    console.log('test pg');
    return;
  }

  function moveFolder() {

    console.log(myState);

    if (myState === 'read') {
      alert(`You don't have the permission to move this folder`);
      return;
    }
    else {
      localStorage.setItem("moveId", folder.id);
      var docRef = storage.collection("folders").doc(folder.id);

      docRef.get().then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }

  }

  



  return (
    <>
      {!edit && <Button onClick={setPassword} className="dashboard_folder_icon"


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
          {copiedData &&
            <i className="m-0">
              {folder.name}
            </i>
          }
          {!copiedData &&
            <p className="m-0">
              {folder.name}
            </p>
          }
        </div>

      </Button>}
      {
        edit && <div className="edit_mode_outer">
          <div className="input">
            <input type="text" placeholder="Enter the Folder Name" defaultValue={folder.name} onChange={(e) => { e.preventDefault(); console.log(e.target.value); setName(e.target.value) }} />
          </div>
          <div className="editButtons">
            <div className="iconOuter saveIcon">
              <FontAwesomeIcon onClick={saveData} icon={faCheck} className="icon" />
            </div>
            <div className="iconOuter cancelIcon">
              <FontAwesomeIcon onClick={() => setEdit(false)} icon={faTimes} className="icon" />
            </div>
          </div>
        </div>
      }

      { folder.id &&
      
        <div className="menu_container" style={{ display: 'none' }} id={folder.id} >
          <div className="item" onClick={deleteFolder}>delete</div>
          <div className="item" onClick={() => {
            if (myState === 'read') {
              alert(`You don't have the permission to rename this folder`);
              return;
            } else setEdit(true)
          }}>rename</div>
          {/* <div className="item" onClick={() => { navigator.clipboard.writeText(folder.name) }}>copy</div> */}
          <div className="item" onClick={moveFolder} >move</div>
          {/* <div className="item">paste</div> */}
          <div className="item">properties</div>
        </div>}

    </>
  )
}
