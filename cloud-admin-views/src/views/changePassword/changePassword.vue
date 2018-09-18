<template>
    <div>
        <h2>修改密码</h2>
        <el-form :model="ruleForm2" status-icon  label-width="320px" class="demo-ruleForm" label-position="right">
            <el-form-item label="原密码" prop="password">
                <el-input v-model="ruleForm2.password" class="w500"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_password">
                <el-input type="password" v-model="ruleForm2.new_password" class="w500"></el-input>
            </el-form-item>
            <el-form-item label="再次输入" prop="checkPass">
                <el-input type="password" v-model="checkPass" class="w500" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm" class="btn">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'changePassword',
        data() {
            // var checkOld = (rule, value, callback) => {
            //     if(!value){
            //         callback(new Error('请输入旧密码'))
            //     }else if(value == this.$store.state.formData.password){
            //         callback();
            //     }else{
            //         callback(new Error('旧密码错误'))
            //     }
            // };
            // var validatePass = (rule, value, callback) => {
            //     if (value === '') {
            //     callback(new Error('请输入密码'));
            //     } else {
            //     if (this.checkPass !== '') {
            //         this.$refs.ruleForm2.validateField('checkPass');
            //     }
            //     callback();
            //     }
            // };
            // var validatePass2 = (rule, value, callback) => {
            //     if (value === '') {
            //     callback(new Error('请再次输入密码'));
            //     } else if (value !== this.ruleForm2.pass) {
            //     callback(new Error('两次输入密码不一致!'));
            //     } else {
            //     callback();
            //     }
            // };
            return {
                checkPass: '',
                ruleForm2: {
                    password: '',
                    new_password: ''
                },
                // rules2: {
                //     old: [
                //         { validator: checkOld, trigger: 'blur' }
                //     ],
                //     pass: [
                //         { validator: validatePass, trigger: 'blur' }
                //     ],
                //     checkPass: [
                //         { validator: validatePass2, trigger: 'blur' }
                //     ]
                // }
                };
            },
            methods: {
                submitForm(){
                    this.$axios.put('/user/password',this.ruleForm2).then(res => {
                        if(res.code == 400) {
                            this.$message.error(res.msg)
                        }else if(res.code == 200) {
                            this.$message.success(res.msg)
                            this.$router.push('/login')
                        }
                    })
                }
            }
        }
</script>

<style scoped>
h2{
    margin-bottom: 30px;
    text-align: center;
}
.w500{
    width: 500px;
}
.btn{
    margin-left: 200px;
}
</style>
