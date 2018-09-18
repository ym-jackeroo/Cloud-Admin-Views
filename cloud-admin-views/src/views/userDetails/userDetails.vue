<template>
    <div>
        <h2>{{`${this.detailsItem.nickname}的个人信息`}}</h2>
        <el-form :model="detailsItem" label-width="120px" label-position="left">
            <el-form-item label="管理员头像">
                <img :src="imageUrl"  class="avatar">
            </el-form-item>
            <el-form-item label="管理员用户名">
                <el-input v-model="detailsItem.username"  class="w500" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="管理员邮箱">
                <el-input v-model="detailsItem.email" class="w500" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="管理员个性签名">
                <el-input type="textarea" v-model="detailsItem.desc" class="w500" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "userDetails",
        data() {
            return {
                imageUrl:'',
                detailsItem: {
                    username: '',
                    nickname: '',
                    desc: '',
                    avatar: '',
                    email: ''
                }
            }
        },
        methods: {
            initData() {
                this.detailsItem = {
                    ...this.$store.state.detailsItem
                }
                this.imageUrl = this.detailsItem.avatar
                console.log(this.detailsItem)
            }
        },
        created() {
            this.initData()
        }
    }
</script>

<style scoped>
.avatar{
    width: 100px;
    height: 100px;
}

h2{
    text-align: center;
    margin-bottom: 30px;
}

.w500{
    width: 500px;
}
</style>

