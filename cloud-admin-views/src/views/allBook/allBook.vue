<template>
    <div>
        <el-table :data="allBook">
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
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  img{
      height: 250px;
  }
</style>
