import * as actionTypes from '../constants/actionTypes';
import { browser } from '../../utils/index'
export function updataInfo(data: any) {
    return (dispatch: any) => {
        dispatch({
            type: actionTypes.UPDATA_USERINFO,
            data: data
        })
    }
}