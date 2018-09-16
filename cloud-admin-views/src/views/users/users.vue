<template>
    <div class="user-manage">
        <div class="bread-crumb">
            <el-breadcrumb>
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-button type="primary" class="addBtn" @click="handleAdd">添加管理员</el-button>
            </el-breadcrumb>
            
            <el-table :data="tableData">
                <el-table-column prop="nickname" label="昵称" width="130">

                </el-table-column>
                <el-table-column prop="createdTime" label="日期" width="200">

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
                        <el-button @click="handleDetails(scope.row._id)" size="small" type="primary">
                            查看详细
                        </el-button>
                        <el-button @click="handleDelete(scope.row._id)" size="small" type="primary">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            getData() {
                this.$axios.get('/user').then(res => {
                    if(res.code == 200) {
                        this.tableData = res.data
                    }
                })
            },
            handleDetails(id) {
                console.log(this.tableData)
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
                        })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            handleAdd() {
                this.$router.push('/layout/addManager')
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped lang="scss">
    .user-manage{
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
    }
</style>
