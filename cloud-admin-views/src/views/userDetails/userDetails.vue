<template>
    <div>
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
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "userDetails"
    }
</script>

<style scoped>

</style>

