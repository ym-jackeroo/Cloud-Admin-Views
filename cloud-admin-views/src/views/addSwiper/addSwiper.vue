<template>
    <div>
        <el-form :data="swiperData">
            <el-form-item label="轮播图标题">
                <el-input v-model="swiperData.title"></el-input>
            </el-form-item>
            <el-form-item label="轮播图头图">
                <imgUpload v-model="swiperData.img"></imgUpload>
            </el-form-item>
            <el-form-item label="索引">
                <el-input v-model="swiperData.index"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="postSwiper">提交</el-button>
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
        name: "addSwiper",
        data() {
            return {
                swiperData: {
                    title: '',
                    img: '',
                    book: '',
                    index:1
                }
            }
        },
        methods: {
            postSwiper() {
                this.$axios.post('/swiper', this.swiperData).then(res => {
                    if(res.code == 200) {
                        this.$message.success(res.msg)
                        this.$router.push('/layout/allSlideshow')
                    }
                })
            }
        },
        created() {
            this.swiperData.book = this.$route.query.book
        }
    }
</script>

<style scoped>

</style>
