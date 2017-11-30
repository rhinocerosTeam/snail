/**
 * Created by user on 2017/10/24.
 */

export default {
  SET_USER_INFO(state,data){
    Object.assign(state.userInfo,data);
  },
  GET_USER_INFO(state){
    return state.userInfo;
  }
}
