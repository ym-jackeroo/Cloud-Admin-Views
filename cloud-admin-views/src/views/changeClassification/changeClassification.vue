<template>
    <div>
        <el-form :model="classification" label-width="300px">
            <el-form-item label="封面">
                <imgUpload v-model="classification.icon"></imgUpload>
            </el-form-item>
            <el-form-item label="索引">
                <el-input v-model="classification.index" class="w500"></el-input>
            </el-form-item>
            <el-form-item label="id">
                <el-input v-model="classification._id" class="w500" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="类别">
                <el-input v-model="classification.title" class="w500"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="submit" @click="handleSubmit">保存修改</el-button>
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
        name: "changeClassification",
        data() {
            return {
                classification: {
                    title: '',
                    icon: '',
                    index: '',
                    _id: ''
                }
            }
        },
        methods: {
            initData() {
                this.classification = {
                    ...this.$store.state.classification
                }
            },
            editClassification() {
                this.$axios.put(`/category/${this.classification._id}`, this.classification).then(res => {
                    console.log(res)
                    if(res.code == 200) {
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push('/layout/bookClassification')
                        },1000)
                    }
                })
            },
            handleSubmit() {
                this.editClassification()
            }
        },
        created() {
            this.initData()
        }
    }
</script>

<style scoped>
    .w500{
        width: 500px;
    }

    .submit{
        margin-left: 200px;
    }

</style>
