<template>
    <div class="container">
        <h1 class="title">欢迎来到Cloud-Book后台管理系统</h1>
        <div class="login-box">
            <h2 class="login-box-title">请登录</h2>
            <el-form class="form" ref="form" :rules="rule" :model="formData">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" type="password" placeholder="请输入密码" @keyup.enter.native="validateLogin"></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="validateLogin" type="primary" class="login-btn " :loading="isLoading">
                登录
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name:"login",
        data() {
            const validateUsername = (rule, value, callback) => {
                if(!value) {
                    callback(new Error('请输入合法的用户名!'))
                }else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if(!value) {
                    callback(new Error('密码不能为空!'))
                }else if(value.length < 5) {
                    callback(new Error('密码长度不能小于5位!'))
                }else {
                    callback()
                }
            }
            return {
                formData: {
                    username: '',
                    password: ''
                },
                isLoading: false,
                rule: {
                    username: [
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePassword, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleLogin() {
                this.isLoading = true
                this.$axios.post('/login', this.formData).then(res => {
                    console.log(res)
                    if(res.code == 200){
                        this.$store.commit('CHANGE_USERINFO', res.data)
                        this.$message.success('登录成功')
                        setTimeout(() => {
                            this.$router.push('/layout/index')
                        }, 1000)
                    }else{
                        this.$message.error(res.msg)
                    }
                    this.isLoading = false
                }).catch(err => {
                    this.isLoading = false
                })
            },
            validateLogin() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.handleLogin()
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
.container{
    height: 100vh;
    background-color: #525b64;
    overflow: hidden;

    .title{
        margin-top:80px;
        text-align:center;
        color:#fff;
        font-weight:400;
    }

    .login-box{
        width: 400px;
        height: 300px;
        border: 1px solid #e8e8e8;
        background-color: #fff;
        border-radius: 6px;
        padding:40px;
        margin: 20px auto 0;

        .login-box-title{
            color: #444;
            font-weight: 400;
            text-align: center;
        }

        .form{
            margin-top: 20px;
        }

        .login-btn{
            text-align: center;
            width: 100%;
        }
    }
}
</style>

