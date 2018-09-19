<template>
    <div>
       <el-table :data="categoryBooks">
            <el-table-column prop="img" label="封面" width="200">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" width="120">

            </el-table-column>
            <el-table-column prop="author" label="作者" width="120">

            </el-table-column>
            <el-table-column prop="createTime" label="日期" width="100">

            </el-table-column>
            <el-table-column prop="desc" label="图书简介" width="400">

            </el-table-column>
            
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" size="small" type="primary">
                        编辑
                    </el-button>
                    <el-button @click="handleDelete(scope.row._id)" size="small" type="danger">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div> 
</template>

<script>
    export default {
        name: "categoryBook",
        data() {
            return {
                books_id: '',
                categoryBooks: [] 
            }
        },
        methods: {
            initData() {
                this.books_id = this.$route.query.books_id
                console.log(this.books_id)
            },
            getCatecoryBooks() {
                this.$axios.get(`/category/${this.books_id}/books`).then(res => {
                    this.categoryBooks = res.data.books
                    console.log(this.categoryBooks)
                })
            }
        },
        created() {
            this.initData()
            this.getCatecoryBooks()
        }
    }
</script>

<style scoped>
    img{
        height: 250px;
        width: 200px;
    }
</style>
