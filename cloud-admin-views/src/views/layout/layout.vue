<template>
    <div class="layout">
        <div class="header ml-200">
            <h1 class="title">云书后台操作系统
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </h1>
            
        </div>
        <div class="side-bar">
            <el-menu
            :router="true"
            background-color="#545c64"
            text-color="#fff">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/layout/index">首页</el-menu-item>
                        <el-menu-item index="/login">登录页</el-menu-item>
                        <el-menu-item index="/layout/users">用户管理页面</el-menu-item>
                        <el-menu-item index="/layout/addManager">添加管理员</el-menu-item>
                        <el-menu-item index="/layout/changeInfo">修改个人信息</el-menu-item>
                        <el-menu-item index="/layout/changePassword">修改密码</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>图书管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/layout/allBook">全部图书</el-menu-item>
                        <el-menu-item index="/layout/bookClassification">图书分类</el-menu-item>
                        <el-menu-item index="/layout/addCategory">添加分类</el-menu-item>
                        <el-menu-item index="/layout/addBook">添加图书</el-menu-item>
                        <el-menu-item index="/layout/allSlideshow">轮播图列表</el-menu-item>
                        <el-menu-item index="/layout/addSlideshow">添加轮播图</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="main-content ml-200">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
  name: "layout",
  data() {
      return {
          imageUrl: this.$store.state.userinfo.avatar
      }
  }
};
</script>

<style scoped lang="scss">
.layout {
  .title {
    text-align: center;
    font-weight: 400;
    line-height: 60px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 20px;
    height: 60px;
    margin-left: 60px;
  }

  img{
      width: 50px;
      height: 50px;
      float: right;
      margin-right: 10px;
      margin-top: 5px;
  }

  .ml-200 {
    margin-left: 200px;
  }

  .side-bar{
      padding-top: 60px;
      overflow: hidden;
      width: 200px;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      border-right: 1px solid #f1f1f1;
      background-color: #545c64;
  }

  .main-content{
      padding: 15px;
  }

  /deep/{
    .el-menu{
      border-right: none;
    }
  }
  
}
</style>-

