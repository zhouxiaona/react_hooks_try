import * as actionTypes from '../constants/actionTypes'
export const home = (state = {
    userdata: {},
}, action: any) => {
    switch (action.type) {
        case actionTypes.SAVE_USERDATA:
            return {
                ...state,
                userdata: { ...action.data }
            };
        case actionTypes.UPDATA_USERINFO:
            return {
                ...state,
                userdata: { ...state.userdata, ...action.data }
            };
        default:
            return state;
    }
}




