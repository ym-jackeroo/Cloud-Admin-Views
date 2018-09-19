<template>
    <div>
        <h2>添加图书分类</h2>
        <el-form label-width="300px">
            <el-form-item label="上传封面">
                <imgUpload v-model="formData.icon"></imgUpload>
            </el-form-item>
            <el-form-item label="分类名">
                <el-input v-model="formData.title" class="w500"></el-input>
            </el-form-item>
            
            
            <el-form-item>
                <el-button type="primary" @click="submitForm" class="submit">提交</el-button>
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
        name: 'addCategory',
        data() {
            return {
                formData: {
                    title: '',
                    icon: ''
                }
            }
        },
        methods: {
            submitForm() {
                this.$axios.post('/category', this.formData).then(res => {
                    console.log(res)
                    if(res.code == 200) {
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push('/layout/bookClassification')
                        }, 1000)
                    }
                })
            }
        }
    }
</script>

<style scoped>
.w500{
    width: 500px;
}
h2{
    text-align: center;
    margin-bottom: 20px;
}
.submit{
    margin-left: 200px;
}
</style>
