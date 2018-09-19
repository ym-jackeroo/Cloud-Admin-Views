<template>
    <div>
        <h2>修改个人信息</h2>
        <el-form :model="formData" label-width="300px">
            <el-form-item label="用户名">
                <el-input v-model="formData.username"  class="w500" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="formData.nickname" class="w500"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formData.email" class="w500"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <imgUpload v-model="formData.avatar"></imgUpload>
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input type="textarea" v-model="formData.desc" class="w500"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="submit" @click="handleSubmit">
                    保存更改
                </el-button> 
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'
    import imgUpload from '@/components/img-upload'

    export default {
        components: {
            imgUpload
        },
        data() {
            return {
                formData: {
                    username: '',
                    nickname: '',
                    email: '',
                    avatar: '',
                    desc: ''
                }
            }
        },
        methods: {
            initData() {
                this.formData = {
                    ...this.$store.state.userinfo
                }
            },
            handleSubmit() {
                this.$axios.put('/user/userInfo', this.formData).then(res => {
                    console.log(res)
                    if(res.code == 200) {
                        this.$store.commit('CHANGE_USERINFO', res.data)
                        this.initData()
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push('/layout/users')
                        }, 1000)
                    }
                })
            }
        },
        created() {
            this.initData()
        }
    }
</script>

<style scoped>
h2{
    text-align: center;
}

.el-form{
    margin-top: 30px;
}

.avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
}
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .w500 {
    width: 500px;
  }
  .submit{
    width: 100px;
    margin-left: 200px;      
  }
</style>

