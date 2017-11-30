/**
 * Created by user on 2017/10/24.
 */

export default {
  login:({commit},data) => {
    return function(){
      let username = data["username"];
      let password = data["password"];

      commit('SET_USER_INFO', data);

    }
  },

}
