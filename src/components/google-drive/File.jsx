import { faFile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { database, storage } from "../../firebase"
import './File.scss'
export default function File({ file }) {//files shown in dahsboard
  let [clicked, setClicked] = useState(false);
  let [copiedData, setCopy] = useState();
  let [showDetails, setDetails] = useState(false);
  let [createdDate, setDate] = useState();

  const showItems = (event) => {//show menu on on right click
    event.preventDefault();
    setClicked(true);
    let contextMenu = document.getElementById(file.id);
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

  document.addEventListener('click', function (e) {//if a user click outside right click menubar
    let inside = (e.target.closest('#container'));
    if (!inside && file.id) {
      let contextMenu = document.getElementById(file.id);
      if (contextMenu) {
        contextMenu.style.display = 'none';
      }
      setClicked(false);
    }
  });

  function moveFile() {
    localStorage.setItem("moveFileId", file.id);
    var docRef = storage.collection("files").doc(file.id);

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

  function getProps(e) {
    e.preventDefault();
    setDetails(true);
    database.files.doc(file.id)
      .get()
      .then((docRef) => {
        console.log(docRef.data())
        var theDate = new Date(docRef.data().createdAt.seconds * 1000);
        let dateString = theDate.toUTCString();
        setDate(dateString);
        setCopy(docRef.data());

      })
      .catch((error) => { });

  }

  function deletFile() {

    database.files.doc(file.id)
      .delete()
      .then((docRef) => {
        console.log(docRef.data())



      })
      .catch((error) => { });


  }

  return (
    <>

      <a
        href={file.url} className="each_file_icon" onContextMenu={showItems}>
        <FontAwesomeIcon icon={faFile} className="file_icon" />
        <div className="file_name">

          <p className="m-0">

            {file.name}
          </p>
        </div>
      </a>
      {
        showDetails &&

        <div className="properties_outer" >
          <div className="properties_inner">
            <div className="close_icon" onClick={() => setDetails(false)}>X</div>
            <h4>
              Details
            </h4>
            <div>
              Name: {file.name.split('.')[0]}
            </div>
            <div></div>
            <div>
              Created Date: {createdDate}
            </div>
            <div>
              Type: {file.name.split('.')[file.name.split('.').length - 1]}
            </div>
            <div>
              Url: <a href={file.url}>{file.url}</a>
            </div>
          </div>

        </div>


      }
      {
        <div className="menu_container" style={{ display: 'none' }} id={file.id} >
          <div className="item" onClick={deletFile}>delete</div>
          <div className="item" onClick={moveFile}>move</div>
          <div className="item" onClick={getProps}>properties</div>
        </div>}
    </>
  )
}
