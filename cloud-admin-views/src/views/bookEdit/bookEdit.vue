<template>
    <div>
        <h2>编辑图书</h2>
       <el-form :model="bookItems" label-width="300px">
           <el-form-item label="封面">
                <imgUpload v-model="bookItems.img"></imgUpload>
            </el-form-item>
            <el-form-item label="图书id">
                <el-input v-model="bookItems.book_id"  class="w500" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="索引">
                <el-input v-model="bookItems.index" class="w500" ></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-input v-model="bookItems.type_title" class="w500" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="bookItems.author" class="w500"></el-input>
            </el-form-item>
            <el-form-item label="书名">
                <el-input v-model="bookItems.title" class="w500"></el-input>
            </el-form-item>
            <el-form-item label="上传日期">
                <el-input v-model="bookItems.createTime" class="w500" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="喜欢的人数">
                <el-input v-model="bookItems.looknums" class="w500" :disabled="true"></el-input>
            </el-form-item>
            
            <el-form-item label="图书简介">
                <el-input type="textarea" :rows="5" v-model="bookItems.desc" class="w500 h500"></el-input>
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
    import imgUpload from '@/components/img-upload'

    export default {
        name: 'bookEdit',
        components: {
            imgUpload
        },
        data() {
            return {
                bookItem: {
                    
                },
                bookItems: {
                    title: '',
                    book_id: '',
                    index: '',
                    desc: '',
                    author: '',
                    img: '',
                    type: '',
                    createTime: '',
                    looknums: '',
                    type_title: ''
                }
            }
        },
        methods: {
            getItem() {
                this.$axios.put('/book', this.bookItems).then(res => {
                    this.$message.success(res.msg)
                })
            },
            initData() {
                this.bookItem = {
                    ...this.$store.state.bookItem
                }
                this.bookItems.book_id = this.bookItem._id
                this.bookItems.index = this.bookItem.index
                this.bookItems.desc = this.bookItem.desc
                this.bookItems.author = this.bookItem.author
                this.bookItems.img = this.bookItem.img
                this.bookItems.type = this.bookItem.type._id
                this.bookItems.title = this.bookItem.title
                this.bookItems.createTime = this.bookItem.createTime
                this.bookItems.looknums = this.bookItem.looknums
                this.bookItems.type_title = this.bookItem.type.title
                this.imageUrl = this.bookItems.img
                console.log(this.bookItem)
            },
            handleSubmit() {
                this.getItem()
                setTimeout(() => {
                    this.$router.push('/layout/allBook')
                },1000)
            },
        },
        created() {
            this.initData()
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
</style>

