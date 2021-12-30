import {LOADING} from "../constants/actionTypes"


export default (data=false,action) => {
    switch (action.type) {
        case LOADING:
            console.log("loading")
            console.log(action.payload)
            return action.payload

        default:
            return data;
    }
}