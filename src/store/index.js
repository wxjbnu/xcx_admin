import Vue from 'vue'
import Vuex from 'vuex'
import { apiActions, webService } from '../api'

Vue.use(Vuex);
const baseUrl = '';

// 变量
const state = {
//   record:{},
//   islogin:false,
//   component_auth:[],
}

const actions = {
  // 异步执行操作
  //dispatch
  LOGIN_IN({commit,dispatch},{params}){
    let url = '/system/user/login';
    return Vue.http.post(baseUrl+url,params).then((res)=>{
      // Indicator.close();
      if(res.status==200){
        //http状态码为200
        return res.json();
      }else {
        return Promise.reject(res);
      }
    },(res)=>{
      return Promise.reject(res);
    })
  },
}

for (let i in apiActions) {
  let obj = {
      [i]: function ({ commit, dispatch, state }, { params = {}, options = {} } = {}) {
          let apiAction = i;
          return webService({ commit, dispatch, apiAction }, { params, apiOptions: options }).then((data) => {
              // console.log(data);
              return data;
          }).catch((reason) => {
              throw reason;
          })
      },
  }
  Object.assign(actions, obj);
}
const vx = new Vuex.Store({
  state,
  mutations:{
    // 修改变量的值
    //commit
    SET_LOGIN_IN(state){
    //   state.islogin = true;
    },
    SET_COMPONENT_AUTH(state,auth){
    }
  },
  actions,
  getters:{
    // 可以直接在view里面使用 this.$store.state
    getUserInfo(state){
      return state.userInfo;
    },
  }

})

export default vx;
