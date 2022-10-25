export const useKeyboardShortcut = (callback,targetKeys) => {
    console.log('tesaja')
     let currentPressed = [];
     const checkPressedKeys = () =>{
       
       let counter  = targetKeys.length;
       targetKeys.forEach(
         targetKey =>{
           if(currentPressed.find((pressedKey) => targetKey === pressedKey)){
          counter -= 1;
           }
         }
       )
       return counter;
     }
     const keydownHandler = (event) =>{
  
       if(!currentPressed.find(e => e === event.key)){
         currentPressed.push(event.key);
       }
       if(currentPressed.length === targetKeys.length){
         if(checkPressedKeys() === 0){
           callback();
         }
       }
     }
     const keyupHandler = (event) =>{
       currentPressed = currentPressed.filter(e => e !== event.key)
       
     }
  
     window.addEventListener('keydown', keydownHandler); 
    window.addEventListener('keyup', keyupHandler);
  
    return () =>{
     window.removeEventListener('keydown', keydownHandler);
     window.removeEventListener('keyup', keyupHandler);
    
    }
  
   }