<template>
    <div class="user-manage">
        <div class="bread-crumb">
            <el-breadcrumb>
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
            
            <h2>用户管理页面</h2>
            <el-table :data="tableData">
                <el-table-column prop="nickname" label="昵称" width="180">

                </el-table-column>
                <el-table-column prop="createdTime" label="日期" width="250">

                </el-table-column>
                <el-table-column prop="desc" label="个性签名" width="400">

                </el-table-column>
                <el-table-column prop="avatar" label="用户头像" width="100">
                    <template slot-scope="scope">
                        <img :src="scope.row.avatar" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleDetails(scope.row)" size="small" type="primary">
                            查看详细
                        </el-button>
                        <el-button @click="handleDelete(scope.row._id)" size="small" type="danger">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="pageChange"
                :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                count:0,
                page:1
            }
        },
        methods: {
            getData() {
                this.$axios.get('/user', {pn: this.page, size: 10}).then(res => {
                    if(res.code == 200) {
                        this.count = res.count
                        this.tableData = res.data
                        console.log(res)
                    }
                })
            },
            handleDetails(row) {
                let detailsItem = row
                console.log(detailsItem)
                this.$store.commit('DETAIL_USERINFO', detailsItem)
                this.$router.push('/layout/userDetails')
            },
            handleDelete(id) {
                this.$confirm('此操作将删除一位管理员, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$axios.post('/user/delete', {userIds: [id]}).then(res => {
                            this.$message.success(res.msg)
                            this.getData()
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
                this.getData()
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped lang="scss">
    .user-manage{
        h2{
            text-align: center;
            margin-top: 20px;
            margin-bottom: 30px;
        }

        .addBtn{
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 998;
        }

        img{
            width: 60px;
            height: 60px;
        }

        .el-pagination{
            margin-top: 30px;
            text-align: center;        
        }
    }
    
</style>
