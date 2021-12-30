import * as api from '../api'
import {LOADING} from '../constants/actionTypes'



export const fetchLoading = (data) => async(dispatch) => {
    try{
        console.log(data)
        dispatch({type: 'LOADING', payload: data})
    }catch(error){
        console.log(error)
    }
}
