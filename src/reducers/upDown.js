const initialState = 'test';

const changeNumber = (state = initialState, actions) => {

    switch(actions.type) {
        case 'INCREMENT': return 'red';
        
        case 'DECREMENT': return 'blue';
        
        default: return state;
    }

}
const initialState2 = 'test';
export const rolePermission = (state = initialState2, actions) => {

    switch(actions.type) {
        case 'edit': return 'edit';
        
        case 'read': return 'read';
        
        default: return state;
    }

}

export default changeNumber;
