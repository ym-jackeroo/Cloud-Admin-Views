<template>
    <el-upload class="avatar-uploader"
        :data="uploadData"
        action="https://upload-z1.qiniup.com"
        :show-file-list="false"
        :on-success="uploadSuccess"
        >
        <img v-if="currentValue" :src="currentValue" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>                   
</template>

<script>
    import axios from 'axios'

    export default {
        props: {
            value: {
                type: String
            }
        },
        data() {
            return {
                uploadData: {
                    token: ''
                },
                currentValue: this.value
            }
        },
        methods: {
            uploadSuccess (file) {
                this.$emit('input', file.url)
            },
            getToken () { // 获取上传凭证
                axios.get('http://upload.yaojunrong.com/getToken').then(res => {
                console.log(res.data.data)
                this.uploadData.token = res.data.data
                })
            },
        watch: {
            value (val) {
                this.currentValue = val
            }
        },
        created() {
            this.getToken()
        }
    }
}
</script>

<style scoped>
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