import Vue from 'vue'
import VueResource from 'vue-resource'
import router from '../router'
import store from '../store'
// import * as types from '../store/mutation-types'
Vue.use(VueResource);
// Vue.http.options.emulateJSON = true;
export const apiActions = {
    houses: {//判断活动状态
        url: '/api/buildings/{id}/houses',
        method: 'GET'
    },
};

// workplus获取
export const othersApi = {
   
}

Vue.resource.actions = Object.assign(apiActions);//使用自定义的vue-resource action
// Vue.resource.actions = apiActions;//使用自定义的vue-resource action

// 使用vue-resource调用接口
export const webService = ({ dispatch, commit, apiAction }, { params = {}, apiOptions = {
    progress: (evt) => {
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            // console.log(percentComplete + "%");
        }
    }
} } = {}) => {
    // commit(types.SET_API_TOGGLE_LOADING, { apiAction });//将state中的状态设为加载中
    // Vue.$indicator.open();
    return Vue.resource(null, null, null, apiOptions)[apiAction](params)
    .then((response) => {
        // debugger;
        if (typeof response.data == 'string') {
            response.data = JSON.parse(response.data);
        }
        // Vue.$indicator.close();
        // return response.data
        // alert(JSON.stringify(response))
        if (response.data.status === 200) {
            // commit(types.SET_API_TOGGLE_SUCCESS, { apiAction });//将state中的状态设为加载成功
            // Vue.$indicator.close();
            // commit(types.SET_API_DATA, { apiAction, data: response.data });//将数据赋值到state
            return response.data;
        }else {
            var statusArr = [403,201,2012,2011]
            // commit(types.SET_API_TOGGLE_FAIL, { apiAction });//将state中的状态设为加载失败
            // Vue.$indicator.close();

            // 不是这些的状态码就自动弹出提示
            if(statusArr.indexOf(response.data.status)==-1){
                // router.app.$toast({duration:3000,message:response.data.message+':)'})
            }
            // if(response.data.status != 2012 && response.data.status != 201){
            //     router.app.$toast({duration:3000,message:response.data.message+':)'})
            // }
            if(response.data.status == 403 || response.data.status == 2011){
                // 需要去登录的情况
                // try{
                //     if(RF_NativeAPI){
                //         let userinfo = RF_NativeAPI.RFN_GetUserInfo()
                //     }
                // }catch(err){
                    if(!params.noLogin){
                        // 需要自动跳去登录
                        let that = router.app.$route
                        // store.beforeLogin = {path:that.$route.name,query:that.$route.query,params:that.$route.params}
                        // store.commit('SET_PATH', { data:{path:that.name,query:that.query,params:that.params}})
                        // router.push('login')
                    }
                // }
            }
            return response.data;
        }

    }/*,(response)=>{
        // console.log(response);
        let msg = '';
        if (response.status >= 0) {
            msg = 'error: ' + response.status;
            if (response.status == 0) {
                msg = '网络不给力哦！';
            }
        }
        else {
            if (response.toString() == '[object Object]') {
                msg = 'error: ' + JSON.stringify(response);
            }
            else {
                msg = 'error: ' + response;
            }
        }
        console.log(msg);
        commit(types.SET_API_TOGGLE_FAIL, apiAction);
        // return Promise.reject(response);
    }*/).catch(function (response) {
            // console.log(response);
            let msg = '';
            if (response.status >= 0) {
                //  + ': (' + response.status + ')'
                msg = apiAction;
                if (response.status == 0) {
                    msg = '网络不给力哦！';
                    // router.app.$notify.error({duration:3000,title:'出错了',message:msg});
                }
                else if(response.status >= 200 && response.status < 400){
                    if(response.data.status < 1000){
                        msg = response.data.message;
                        //  + '(' + response.data.status + ')'
                        // router.app.$notify.error({duration:3000,title:'出错了',message:msg});
                    }
                    // else {
                    //     // msg = response.data; + '(' + response.data.status + ')'
                    //     msg = response.data.message;
                    // }
                }
                else {
                    // router.app.$notify.error({duration:3000,title:'出错了',message:msg});
                }
            }
            else {
                if (response.toString() == '[object Object]') {
                    msg = apiAction + ': ' + JSON.stringify(response);
                }
                else {
                    msg = apiAction + ': ' + response;
                }
                // router.app.$notify.error({duration:3000,title:'出错了',message:msg});
            }
            // commit(types.SET_API_TOGGLE_FAIL, { apiAction });//将state中的状态设为加载失败
            // Vue.$indicator.close();
            
            // router.app.$toast({duration:3000,message:msg+':)'})
            throw response.body;//抛出错误信息
        });
};