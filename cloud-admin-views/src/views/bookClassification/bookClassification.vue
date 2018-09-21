<template>
    <div>
        <h2>图书分类</h2>
        <el-table :data="bookCategory">
            <el-table-column prop="icon" label="图标" width="530">
                <template slot-scope="scope">
                    <img :src="scope.row.icon" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="title" label="类型" width="120">

            </el-table-column>
            <el-table-column prop="index" label="索引" width="100">

            </el-table-column>
            <el-table-column prop="_id" label="id" width="100">

            </el-table-column>
            
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" size="small" type="primary">
                        编辑
                    </el-button>
                    <el-button @click="handleCheck(scope.row._id)" size="small" type="primary">
                        查看该分类
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
        name: 'bookClassification',
        data() {
            return {
                bookCategory: [],
                page:1,
                count:0
            }
        },
        methods: {
            initData() {

            },
            getCategory() {
                this.$axios.get('/category',{pn:this.page, size:100}).then(res => {
                    this.bookCategory = res.data
                })
            },
            handleEdit(row) {
                console.log(row)
                this.$store.commit('CLASSIFICATION_EDIT', row)
                this.$router.push('/layout/changeClassification')
            },
            handleCheck(id) {
                this.$router.push({path:'/layout/categoryBook', query:{category_id: id}})
            },
            handleDelete(id) {
                this.$confirm('请确保该分类下没有图书, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(`/category/${id}`).then(res => {
                    console.log(res)
                    if(res.code == 200) {
                        this.$message({
                        type: 'success',
                        message: res.msg
                        });
                    }
                    this.getCategory()
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
            this.getCategory()
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
.el-table-column{
    height: 300px;
}
</style>
