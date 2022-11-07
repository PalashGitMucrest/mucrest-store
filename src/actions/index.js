export const incNumber = () => {
    // debugger;
    return {type:"INCREMENT"}
}

export const decNumber = () => {
    return {type:"DECREMENT"}
}

export const editDrive = () => {
    return {type: 'edit'}
}

export const readDrive = () => {
    return {type: 'read'}
}