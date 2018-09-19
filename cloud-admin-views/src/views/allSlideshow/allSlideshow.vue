<template>
    <div>
        <h2>轮播图列表</h2>
        <el-table :data="swiperList">
            <el-table-column prop="book" label="图书" width="220">
                <template slot-scope="scope">
                    <img :src="scope.row.book.img" class="book-img">
                </template>
            </el-table-column>
            <el-table-column prop="title" label="书名" width="100">

            </el-table-column>
            <el-table-column prop="_id" label="id" width="220">

            </el-table-column>
            <el-table-column prop="index" label="索引" width="80">

            </el-table-column>
            <el-table-column prop="img" label="轮播图" width="320">
                <template slot-scope="scope">
                    <img :src="scope.row.img" class="swiper-img">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit" size="small" type="primary">
                       编辑 
                    </el-button>
                    <el-button @click="handleDelete" size="small" type="danger">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "allSlideshow",
        data() {
            return {
                swiperList: [],
                page:1,
                count:0
            }
        },
        methods: {
            getSwiper() {
                this.$axios.get('/swiper', {pn:this.page, size: 100}).then(res => {
                    console.log(res)
                    this.swiperList = res.data
                })
            },
            handleEdit() {

            },
            handleDelete() {

            }
        },
        created() {
            this.getSwiper()
        }
    }
</script>

<style scoped>
    h2{
        text-align: center;
        margin-bottom: 20px;
    }
    .book-img{
        width: 200px;
        height: 250px;
    }
    .swiper-img{
        width: 300px;
        height: 150px;
    }
</style>
