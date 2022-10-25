import React, { useContext,useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { database } from "../../firebase"
import { useAuth } from "../../contexts/AuthContext"
import { ROOT_FOLDER } from "../../hooks/useFolder"
import { Container } from './Container'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { UserContext } from "../App"
import { storage } from "../../firebase"
import { doc, getDoc } from "firebase/firestore";
import { useKeyboardShortcut } from "./Navbar"
import './AddFolder.scss'

export default function AddFolderButton({ currentFolder }) {

  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const { currentUser } = useAuth()

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  const data = useContext(UserContext);

  function handleSubmit(e) {//create new folder

    e.preventDefault()
    if (currentFolder == null) return

    const path = [...currentFolder.path]
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id })
    }

    // console.log(database.folders);
    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrentTimestamp(),
    })
    // console.log(database.folders.path);

    setName("")
    closeModal()
  }

  function moveHere() {
    var docRef = storage.collection("folders").doc(currentFolder.id);

docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
  }
 
  


  return (
    <>

      {!data && <label onClick={openModal} className="add_folder_icon_outer" variant="outline-success" size="sm">
        <FontAwesomeIcon icon={faFolderPlus} className="icon" />
      </label>}

      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
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
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {data &&
        <DndProvider backend={HTML5Backend}>
          <Container setOpen={setOpen} />
        </DndProvider>
      }
    </>
  )
}
