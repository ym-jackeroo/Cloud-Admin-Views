<template>
    <div>
        <h2>添加管理员</h2>
        <el-form label-width="300px">
            <el-form-item label="用户名">
                <el-input v-model="formData.username" class="w500"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.password" class="w500"></el-input>
            </el-form-item>
            <el-form-item label="再次输入">
                <el-input v-model="rewrite" class="w500"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="formData.nickname" class="w500"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formData.email" class="w500"></el-input>
            </el-form-item>
            <el-form-item label="头像" class="w500">
                <imgUpload v-model="formData.avatar"></imgUpload>   
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input v-model="formData.desc" class="w500" type="textarea"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="submitForm()" class="submit">提交</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
    import imgUpload from '@/components/img-upload'

    export default {
        components: {
            imgUpload
        },
        name: "addManager",
        data() {
            return {
                rewrite: '',
                formData: {
                    username:'',
                    password:'',
                    desc:'',
                    nickname:'',
                    email:'',
                    avatar: ''
                }
            };
        },
        methods: {
            submitForm() {
                this.$axios.post('/user', this.formData).then(res => {
                    if(res.code == 200){
                        if(this.formData.password == this.rewrite){
                            this.$message.success('添加成功')
                            setTimeout(() => {
                                this.$router.push('/layout/users')
                            },1000)
                            console.log(res)
                        }else{
                            this.$message.warning('两次输入的密码不一致')
                        }
                    }else if(res.code == 401){
                        this.$message.error(res.msg)
                        this.$router.push('/login')
                    }
                })
            }
        }
    }
</script>

<style scoped>
  h2 {
    text-align: center;
  }

  .el-form {
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

