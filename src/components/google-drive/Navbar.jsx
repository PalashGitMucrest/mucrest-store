import React from "react"
import { Link } from "react-router-dom"
import './Navbar.scss';
import { incNumber, decNumber, editDrive, readDrive } from "../../actions";
import { useSelector, useDispatch } from 'react-redux';


export default function NavbarComponent() {
  let myState = useSelector((state) => state.changeNumber);
  let roleState = useSelector((state) => state.rolePermission)
  let dispatch = useDispatch();
  const editor = (e) =>{
  console.log(e.target.checked);
  if(e.target.checked){
    debugger;
    dispatch(editDrive());
    console.log(roleState);
  }

   
  }
const readOnly = (e) =>{
  // debugger;
  console.log(e.target.checked);
  if(e.target.checked){
    dispatch(readDrive())
  }
  console.log(roleState);
}

  return (
    <nav className="navbar_outer">
      <div className="brand_nav">
        <p className="m-0">MuCrest Drive</p>
      </div>
      <div>
        Theme
      </div>
      <div className='quantity'>
          <button className='quantity_minus' title='Decrement' onClick={() => { dispatch(decNumber()) }}>white</button>
          {/* <input name='quantity' type='text' className='quantity_input' value={myState} /> */}
          {
            (myState === 'red') ? (document.body.style.backgroundColor = 'brown') : (document.body.style.backgroundColor = 'white')
          }
          <button className='quantity_plus' title='Increment' style={{backgroundColor:'brown', color: 'white'}}  onClick={() => { dispatch(incNumber()); console.log(myState); }}>gray</button>

        </div>
        <div>
          Role
        </div>
        <div>
          <label>
            Editor
          </label>
          <input type='checkbox' onClick = {editor} />
        </div>
          

         <div>
          <label>
            Read Only
          </label>
          <input type='checkbox' onClick = {readOnly} />
         </div>
          

       
      <div className="profile_nav">
        <p className="m-0"><Link to='/user'> Profile </Link> </p>
      </div>
    </nav>
  )
}
