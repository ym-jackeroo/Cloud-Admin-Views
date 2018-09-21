<template>
    <div>
        <h2>{{this.classname}}</h2>
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
                category_id: '',
                categoryBooks: [],
                classname: '',
                page: 1,
                count: 0
            }
        },
        methods: {
            initData() {
                this.category_id = this.$route.query.category_id
            },
            getCatecoryBooks() {
                this.$axios.get(`/category/${this.category_id}/books`,{pn:this.page, size:100}).then(res => {
                    this.classname = res.data.title
                    this.categoryBooks = res.data.books
                })
            },
            handleEdit(row) {
                this.$store.commit('BOOK_EDIT', row)
                this.$router.push('/layout/bookEdit')
            },
            handleDelete(id) {
                this.$confirm('此操作将永久删除该分类下的书籍, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(`/category/${this.category_id}/book/${id}`).then(res => {
                    console.log(res)
                    if(res.code == 200) {
                        this.$message({
                        type: 'success',
                        message: res.msg
                        });
                    }
                    this.getCatecoryBooks()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });  
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
    h2{
        text-align: center;
        margin-bottom: 20px;
    }

    img{
        height: 250px;
        width: 200px;
    }
</style>
