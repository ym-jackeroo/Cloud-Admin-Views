<template>
    <div>
        <h2>全部图书</h2>
        <el-table :data="allBook">
            <el-table-column prop="img" label="封面" width="220">
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
            <el-table-column prop="desc" label="图书简介" width="300"> 

            </el-table-column>
            
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" size="small" type="primary">
                        编辑
                    </el-button>
                    <el-button @click="handleAddSwiper(scope.row)" size="small" type="primary">
                        添加轮播图
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
        name: 'allBook',
        data() {
            return {
                allBook:[],
                page:1
            };
        },
        methods: {
            getAllBook(){
                this.$axios.get('/book',{pn:this.page, size:100}).then(res => {
                    console.log(res)
                    this.allBook = res.data
                })
            },
            handleEdit(row){
                console.log(row)
                this.$store.commit('BOOK_EDIT', row)
                this.$router.push('/layout/bookEdit')
            },
            handleAddSwiper(row){
                this.$router.push({path:'/layout/addSwiper',query:{book:row._id}})
            },
            handleDelete(id) {
                this.$confirm('此操作将永久删除该图书, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(`/book/${id}`).then(res => {
                        console.log(res)
                        if(res.code == 200) {
                            this.$message({
                            type: 'success',
                            message: res.msg
                            });
                        }
                        this.getAllBook()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            pageChange(page) {
                this.page = page
                this.getAllBook()
            }
        },
        created() {
            this.getAllBook()
        }
    }
</script>

<style scoped>
    img{
        height: 250px;
        width: 200px;
    }
    h2{
        text-align: center;
        margin-bottom: 20px;
    }
  
</style>
