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
                <el-upload class="avatar-uploader"
                    :data="uploadData"
                    action="http://upload-z1.qiniup.com"
                    :on-success="handleAvatarSuccess"
                    :on-preview="handlePreview"
                    :before-upload="beforeAvatarUpload"
                    :show-file-list="false"
                >
                    <img v-if="imageUrl" :src="imageUrl"  class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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

    export default {
        data() {
            return {
                uploadData: {
                    token: ''
                },
                imageUrl: '',
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
                },
                this.imageUrl = this.formData.avatar
            },
            getToken() {
                axios.get('http://upload.yaojunrong.com/getToken').then(res => {
                    this.uploadData.token = res.data.data
                })
            },
            handlePreview(file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.formData.avatar = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleSubmit() {
                this.$axios.put('/user/userInfo', this.formData).then(res => {
                    console.log(res)
                    if(res.code == 200) {
                        this.$store.commit('CHANGE_USERINFO', res.data)
                        this.initData()
                        this.$message.success(res.msg)
                    }
                })
            }
        },
        created() {
            this.initData()
            this.getToken()
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

