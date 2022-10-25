import React, { useContext, useEffect, useState } from "react"
import { useFolder } from "../../hooks/useFolder"
import AddFolderButton from "./AddFolderButton"
import AddFileButton from "./AddFileButton"
import Folder from "./Folder"
import File from "./File"
import Navbar from "./Navbar"
import FolderBreadcrumbs from "./FolderBreadcrumbs"
import { useParams, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"
import { database } from "../../firebase"
import { Modal, Form, Button } from "react-bootstrap"
import './Dashboard.scss'
import { storage } from "../../firebase"

export default function Dashboard() {//dashboard to show the folders and files
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")

  function openModal() {
    setOpen(true)
  }

  function moveHere() {
    if(localStorage.getItem("moveId")){
      database.folders.doc(localStorage.getItem("moveId")).update({ parentId: folder.id, path: [...folder.path] });
      localStorage.clear("moveId");
    }
    if(localStorage.getItem("moveFileId")){
      database.files.doc(localStorage.getItem("moveFileId")).update({ folderId: folder.id });
      localStorage.clear("moveFileId");
    }
    
  }

  function closeModal() {
    setOpen(false)
  }


  return (
    <>
      <Navbar />
      <section className="dashboard_container_outer">
        <div className="breadcrums_file_folder_outer d-flex justify-content-center align-items-center" >
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <div className="ml-3">
            <AddFolderButton currentFolder={folder} />

          </div>

        </div>
        <div className="folder_file_container_outer">
          <div className="folder_file_container_outer_inner">

            {childFolders.length > 0 && (
              <div className="folder_file_container_inner">
                {childFolders.map(childFolder => (
                  <div
                    key={childFolder.id}
                  >
                    <Modal show={open} onHide={closeModal}>
                      <Form onSubmit={(e) => {
                        e.preventDefault();

                        setOpen(false)
                      }}>
                        <Modal.Body>
                          <Form.Group>
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control
                              type="text"
                              required
                              value={name}
                              onChange={e => setName(e.target.value)}
                            />
                          </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={closeModal}>
                            Close
                          </Button>
                          <Button variant="success" type="submit">
                            Update Folder
                          </Button>
                        </Modal.Footer>
                      </Form>
                    </Modal>
                    <Folder folder={childFolder} />
                  </div>
                ))}
              </div>
            )}
            {childFolders.length > 0 && childFiles.length > 0 && <hr />}
            {childFiles.length > 0 && (
              <div className="folder_file_container_inner">
                {childFiles.map(childFile => (
                  <div
                    key={childFile.id}
                    style={{ maxWidth: "250px" }}
                    className="p-2"
                  >
                    <File file={childFile} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {
          (localStorage.getItem("moveId") || localStorage.getItem("moveFileId")) &&
          <button className="move-btn" onClick={moveHere}>
          Move Here
        </button>
        }

      </section>
    </>
  )
}
