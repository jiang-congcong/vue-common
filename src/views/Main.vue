
import router from '../router';

<template>
    <div>
        <el-container>
            <el-aside :width="asideWidth" style="min-height: 100vh; background-color: #001529;">
               <div style="height: 60px; line-height: 60px;color: white; display: flex; align-items: center;justify-content: center">
                    <img src="@/assets/logo.jpg" style="width: 40px;height: 40px;">
                    <Transition name="el-fade-in-linear">
                    <span style="margin-left: 5px;font-size: 20px;" v-show="!isCollapse">项目名</span>
                    </Transition>
                </div>

               <el-menu :collapse-transition="false" :collapse="isCollapse" router background-color="#001529" text-color="rgba(255,255,255,0.65)" active-text-color="#fff" style="border: none; " :default-active="$route.path">
                    <el-menu-item index="/home">               
                        <i class="el-icon-house"></i>
                        <span slot="title">系统首页</span>                        
                    </el-menu-item>
                    <el-menu-item index="/1">                        
                        <i class="el-icon-s-data"></i>
                        <span slot="title">统计页签</span>                       
                    </el-menu-item>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>信息管理</span>
                        </template>
                            <el-menu-item index="/user">用户信息</el-menu-item>
                            <el-menu-item index="/managerInfo">管理员信息</el-menu-item>
                    </el-submenu>
               </el-menu>

            </el-aside>

            <el-container>
                <el-header>
                    <!-- 面包屑 -->
                    <i :class="collapseIcon" style="font-size: 16px;" @click="handleCollapse"></i>
                    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 20px;">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                    </el-breadcrumb>

                    <!--用户信息 -->
                    <div style="flex: 1; width: 0; display: flex; align-items: center; justify-content: flex-end;">
                        <el-dropdown placement="bottom">
                            <div style="display: flex; align-items: center; cursor: default;">
                                <img src="@/assets/logo.jpg" style="width: 40px; height: 40px;">
                                <span>用户名</span>
                            </div>                       
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="userInfo">个人信息</el-dropdown-item>
                                <el-dropdown-item @click.native="modifyPassword">修改密码</el-dropdown-item>
                                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>                       
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-header>

                <el-main>
                    <router-view />
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>


<script>

import axios from 'axios';  

export default {
    data() {
        return {
            isCollapse : false,
            asideWidth : '200px',
            collapseIcon : 'el-icon-s-fold'
        }
    },
    //页面加载好后触发的操作
    mounted() {
        
    },
    methods: {
        handleCollapse() {
            this.isCollapse = !this.isCollapse
            this.asideWidth = this.isCollapse ? '64px' : '200px'
            this.collapseIcon = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'  
        },
        logout() {
            localStorage.removeItem("token");
            this.$router.push("/login");
        },
        modifyPassword() {
            
        },
        userInfo() {
            console.log("用户信息")
        }
    }
}
</script>

<style>
.el-menu--inline {
    background-color: #000c17 !important;
}
.el-menu--inline .el-menu-item {
    background-color: #000c17 !important;
    padding-left: 49px !important;
}
.el-menu-item:hover, .el-submenu__title:hover {
    color: #fff !important;
}
.el-submenu__title:hover i {
    color: #fff !important;
}
.el-menu-item.is-active {
    background-color: #1890ff !important;
    border-radius: 5px !important;
}
.el-menu-item {
    height: 40px !important;
    line-height: 40px !important;
}
.el-submenu__title {
    height: 40px !important;
    line-height: 40px !important;
    padding: 0 60px 0 0;
}
.el-submenu__icon-arrow {
    margin-top: -5px;
}
.el-aside {
    transition: width .3s;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 35);
}
.el-header {
    box-shadow: 2px 0 6px rgba(0, 21, 41, 35);
    display: flex;
    align-items: center;
}
.el-dropdown-menu__item, .el-menu-item{
    padding: 0 40px 0 0  !important;
}
.el-menu--inline .el-menu-item {
    padding-left: 75px !important;
    text-align: left;
}

</style>