<template>
  <div id="main">
    <!-- <img src="./assets/logo.png"> -->
    <header style="width:100%;height:60px;background:#58B7FF;"></header>
    <div class="nav">
      <el-row class="tac">
          <el-col :span="24">
            <!-- <h5>带 icon</h5> -->
            <el-menu class="el-menu-vertical-demo" 
                :default-active="active_page" 
                :router="true" 
                @open="handleopen" 
                @close="handleclose">
              
              <!--<el-menu-item index="loglist" v-show="false"><i class="el-icon-setting"></i>日志列表</el-menu-item>
              <el-menu-item index="2" v-show="false"><i class="el-icon-menu"></i>管理员重置系统用户密码</el-menu-item>-->

              <el-submenu :index="n.key" v-if="!n.show" v-for="(n,index) in navs" :key="index">
                <template slot="title">{{n.name}}</template>
                  <div v-for="(v,i) in n.nav" :key="i" v-if="!v.show">
                    <el-menu-item
                        :index="v.url" 
                        :route="{'path':'/'+v.url}">{{v.title}}</el-menu-item>
                  </div>
                  
              </el-submenu>

            </el-menu>
          </el-col>

        </el-row>
    </div>
    <router-view  class="main"/>
  </div>
</template>

<script>
export default {
  name: 'main',
  data(){
      return {
        active_page: 'index',
        navs:[
            {name:'主页面',key:'index',show:false,nav:[
                {url:"main",title:"main",show:false},
                {url:"demo",title:"demo",show:false},
                // {url:"login",title:"登录页",show:false},
                // {url:"main",title:"角色列表",show:false},
            ]},
        ]
    }
  },
  methods: {
    handleopen(){

    },
    handleclose(){

    },
  }
}
</script>

<style>
.main{
    overflow: scroll;
    height: calc(100% - 60px);
    margin-left: 240px;
    padding: 20px;
    box-sizing: border-box;
}
.nav{
    position: fixed;
    left: 0;
    width: 240px;
    top: 60px;
    bottom: 0;
    background-color: #58B7FF;
    box-shadow: 0 2px 6px 0 rgba(50,63,87,.25);
    overflow-y: auto;
  }

  .header{
    /*position: fixed;
    left: 0;
    right: 0;*/
    box-sizing: border-box;
    box-shadow: 0 2px 6px 0 rgba(50,63,87,.25);
    background-color: #324057;
    /*z-index: 9999;*/
    width: 100%;
    height: 60px;
  }
</style>
