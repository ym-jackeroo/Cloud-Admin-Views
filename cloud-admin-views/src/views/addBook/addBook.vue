<template>
    <div>
        <h2>添加图书</h2>
        <el-form :model="formData" label-width="300px">
            <el-form-item label="图书链接">
                <el-input v-model="formData.url" class="w500"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="formData.author" class="w500"></el-input>
            </el-form-item>
            <el-form-item label="图书头图" >
                <el-switch
                v-model="isUpload"
                inactive-text="手动上传"
                active-text="头图网址"
                >
                </el-switch>
                <el-input v-model="formData.img" v-if="isUpload" class="w500"></el-input>
                <imgUpload v-model="formData.img" v-else></imgUpload>
            </el-form-item>
            <el-form-item label="分类id"> 
                <el-select v-model="formData.typeId">
                    <el-option 
                    v-for="(item, index) in categoryData"
                    :key="index"
                    :label="item.title"
                    :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="postBook" class="submit">提交</el-button>
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
        name: "addBook",
        data() {
            return {
                isUpload: false,
                formData: {
                    url: '',
                    author: '',
                    img: '',
                    typeId: ''
                },
                categoryData: []
            }
        },
        methods: {
            async getCategoryData() {
                const res = await this.$axios.get('/category')
                this.categoryData = res.data
            },
            postBook() {
                this.$axios.post('/book', this.formData).then(res => {
                    if(res.code == 200) {
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push('/layout/allBook')
                        },1000)
                    }
                })
            }
        },
        created() {
            this.getCategoryData()
        }
    }
</script>

<style scoped>
    h2{
        text-align: center;
        margin-bottom: 20px;
    }
    .w500{
        width: 500px;
    }
    .submit{
        margin-left: 200px;
    }
</style>
