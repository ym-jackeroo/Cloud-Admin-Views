<template>
    <div>
        <h2 v-if="$route.name =='addSlideshow'">添加轮播图</h2>
        <h2 v-else>修改轮播图</h2>
        <el-form :model="formData" label-width="300px">
            <el-form-item label="轮播图标题" >
                <el-input v-model="formData.title" class="form-500"></el-input>
            </el-form-item>

            <el-form-item label="轮播图书籍">
                <el-select v-model="formData.category" @change="categoryChange">
                    <el-option v-for="(item, index) in categoryData"
                    :key="index"
                    :label="item.title"
                    :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <div v-if="getBookItem[0]" class="book-item clearfix">
                <div class="img-wrap">       
                    <img :src="getBookItem[0].img">
                </div>
                <div class="book-desc">
                    <div class="title">
                        标题: {{getBookItem[0].title}}
                    </div>
                    <div class="author">
                        作者: {{getBookItem[0].author}}
                    </div>
                </div>
            </div>

            <el-form-item label="轮播图头图" class="swiper-img">
                <upload-img v-model="formData.img"></upload-img>
            </el-form-item>

            <el-form-item label="轮播图排序" class="swiper-index">
                <el-input-number v-model="formData.index" :min="1"></el-input-number>
            </el-form-item>
        </el-form>

        <el-button type="primary" @click="handleSubmit" v-if="$route.name =='addSlideshow'" class="btn">
            提交
        </el-button>
        <el-button type="primary" @click="handleSaveEdit" v-else class="btn">
            保存更改
        </el-button>
        <el-dialog title="书籍列表" :visible.sync="isShowDialog">
            <el-table :data="bookData">
                <el-table-column prop="title" label="书名" width="200">
                    
                </el-table-column>
                <el-table-column label="书籍头图" width="180">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" class="img-item">
                    </template>
                </el-table-column>
                <el-table-column prop="author" label="作者" width="150">

                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="handleAddBook(scope.row._id)">
                            添加
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "addSlideshow",
        data() {
            return {
                formData: {
                    title: '',
                    img: '',
                    book: '',
                    index: '',
                    category: ''
                },
                categoryData: [],
                bookData: [],
                bookCount: 0,
                isShowDialog: false
            }
        },
        methods: {
            getCategoryData() {
                this.$axios.get('/category').then(res => {
                    console.log(res)
                    this.categoryData = res.data
                })
            },
            async getBookData() {
                const res = await this.$axios.get(`/category/${this.formData.category}/books`)
                this.bookData = res.data.books
                this.bookCount = res.count
            },
            categoryChange() {
                this.isShowDialog = true
                this.getBookData()
            },
            handleAddBook(id) {
                this.formData.book = id
                this.isShowDialog = false
            },
            handleSubmit() {
                let isCanSubmit = true
                for(let key in this.formData) {
                    if(!this.formData[key]) {
                        isCanSubmit = false
                    }
                }

                if(isCanSubmit) {
                    this.$axios.post('/swiper', this.formData).then(res => {
                        if(res.code == 200) {
                            this.$message.success(res.msg)
                            this.$router.push('/layout/allSlideshow')
                        }
                    })
                } else {
                    this.$message.error('缺少必要参数')
                }
            },
            getInitData() {
                this.$axios.get(`/swiper/${this.$route.query.id}`).then(res => {
                    this.formData = {
                        ...this.formData,
                        ...res.data,
                        book: res.data.book._id,
                        category: res.data.book.type
                    }
                    this.getBookData()
                })
            },
            handleSaveEdit() {
                this.$axios.put(`/swiper/${this.$route.query.id}`, this.formData).then(res => {
                    if(res.code == 200) {
                        this.$message.success(res.msg)
                        this.$router.push('/layout/allSlideshow')
                    }
                })
            }
        },
        created() {
            this.getCategoryData()
            if (this.$route.name == 'addSlideshow') {
                this.formData = {
                    title: '',
                    img: '',
                    book: '',
                    index: '',
                    category: ''
                }
            }else {
                this.getInitData()
            }
        },
        computed: {
            getBookItem() {
                if(this.formData.book) {
                    return this.bookData.filter(item => item._id == this.formData.book)
                }else {
                    return []
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    h2{
        text-align: center;
        margin-bottom: 20px;
    }
    .form-500{
        width: 500px;
    }
    .img-item{
        width: 100px;
        height: 120px;
    }
    .swiper-index{
        margin-top: 20px;
    }
    .swiper-img{
        margin-top: 20px;
    }
    .btn{
        margin-left: 500px;
    }

    .book-item {
        margin-top: 20px;
        width: 430px;
        padding: 15px;
        border: 1px solid #999;
        border-radius: 6px;
        margin-left: 300px;

        .img-wrap {
            float: left;
            width: 100px;
            height: 120px;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        .book-desc {
            float: left;
            margin-left: 20px;

            .title {
                color: #333;
                font-weight: 700;
                font-size: 15px;
                width: 300px;
            }

            .author {
                color: #555;
                margin-top: 10px;
            }
        }
    }
</style>
