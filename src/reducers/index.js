import changeNumber from "./upDown";
import { rolePermission } from "./upDown";
import { combineReducers } from "redux";

const rootReducer = combineReducers(
    {
        changeNumber: changeNumber,
        rolePermission: rolePermission
    }
)
export default rootReducer;