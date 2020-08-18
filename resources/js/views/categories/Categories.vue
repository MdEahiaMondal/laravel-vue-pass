<template>
    <div class="container-fluid">
        <h1 class="mt-4">Dashboard</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">
                Categories
            </li>
        </ol>
        <div class="card mb-4">
            <div class="card-header d-flex">
               <span>
                    <i class="fas fa-table mr-1"></i>
                    DataTable Example
               </span>
                <button class="btn btn-primary ml-auto" @click="showCreateCategory">Add</button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                        <tr>
                            <th>SI</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(category, index) in categories" :key="category.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ category.name }}</td>
                            <td><img width="150" :src="`${$store.state.serverPath}/storage/${category.image}`" alt=""></td>
                            <td>
                                <a href="#" @click.prevent="showEditcategoryModal(category)">Edit</a>
                                <a href="#" @click.prevent="delecteCategory(category)">Delete</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="text-center" v-if="moreExist">
                    <button class="btn btn-primary" @click.prevent="moreLoad">Load More</button>
                </div>

            </div>
        </div>

        <b-modal ref="category_modal" hide-footer title="Create New Category">
            <div class="d-block">
                <form>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" v-model="category.name" id="name">
                        <small class="text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
                    </div>
                    <div class="form-group">
                        <label for="image">Image</label>
                        <img v-if="category.image" width="100" src="" ref="displayCategoryImage" alt="">
                        <input type="file" @change="setNewImage" ref="neCategoryImage" class="form-control" id="image">
                        <small class="text-danger" v-if="errors.image">{{ errors.image[0] }}</small>
                    </div>
                </form>
            </div>
            <button type="button" class="mt-2 btn btn-danger" @click="hideCategory">Close Me</button>
            <button @click="createCategory" type="submit" class="mt-2 btn btn-primary">Save Me</button>
        </b-modal>
        <b-modal ref="editCategoryModal" hide-footer title="Update Category">
            <div class="d-block">
                <form>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" v-model="editCategory.name" id="name">
                        <small class="text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
                    </div>
                    <div class="form-group">
                        <label for="image">Image</label>
                        <img v-if="editCategory.image" width="100" :src="`${$store.state.serverPath}/storage/${editCategory.image}`" ref="displayEditCategoryImage" alt="">
                        <input type="file" @change="setEditNewImage" ref="editCategoryImage" class="form-control" id="image">
                        <small class="text-danger" v-if="errors.image">{{ errors.image[0] }}</small>
                    </div>
                </form>
            </div>
            <button type="button" class="mt-2 btn btn-danger" @click="hideEditCategory">Close Me</button>
            <button @click="updateCategory" type="submit" class="mt-2 btn btn-primary">Updated Me</button>
        </b-modal>
    </div>
</template>

<script>

import * as categories from "../../apis/categories";

export default {
    name: "Categories",
    data(){
        return {
            category: {
                name: '',
                image: ''
            },
            editCategory: {

            },
            moreExist: false,
            nextPage: '',
            errors: [],
            categories: []
        }
    },
    mounted() {
       this.loadAllcategories()
    },
    methods: {
        loadAllcategories:async function()
        {
           try {
               let res = await categories.all()
               if (res.data.categories.current_page < res.data.categories.last_page){
                   this.moreExist = true
                   this.nextPage = res.data.categories.current_page + 1
               }
               this.categories = res.data.categories.data
           }catch (error){
               console.log(error)
           }
        },
        moreLoad:async function(){
            try {
                let res =  await categories.loadMore(this.nextPage)
                if (res.data.categories.current_page < res.data.categories.last_page){
                    this.moreExist = true
                    this.nextPage = res.data.categories.current_page + 1
                }
                for (const category in res.data.categories.data){
                    this.categories.push(res.data.categories.data[category])
                }
            }catch (error){
                console.log(error)
            }
        },
        createCategory: async function ()
        {
            let formData = new FormData()
            for (const field in this.category){
                formData.append(field, this.category[field])
            }
           try {
                const res = await categories.create(formData)
                this.hideCategory();
                this.categories.unshift(res.data)
               this.flashMessage.success({
                   title: 'Category created success',
                   time: 2000
               });
            }catch (err){
                if(err.response.status === 422)
                {
                    switch (err.response.status){
                        case 422:
                            this.errors = err.response.data.errors;
                            break;
                    }
                }
            }
        },
        updateCategory: async function ()
        {
            let formData = new FormData()
            for (const field in this.editCategory){
                formData.append(field, this.editCategory[field])
            }
            formData.append('_method', 'put')
           try {
                const res = await categories.update(formData, this.editCategory.id)
                 this.categories.map(item => {
                   if (item.id === res.data.id){
                       for (let key in res.data){
                           item[key] = res.data[key]
                       }
                   }
               })

               this.$refs['editCategoryModal'].hide()
               this.flashMessage.success({
                   title: 'Category updated success',
                   time: 2000
               });
            }catch (err){
                if(err.response.status === 422)
                {
                    switch (err.response.status){
                        case 422:
                            this.errors = err.response.data.errors;
                            break;
                    }
                }
            }
        },
        delecteCategory:async function (category){
            try {
                let res = await categories.destroy(category.id)
                this.hideCategory();
                this.categories = this.categories.filter((item) => {
                    return category.id !== item.id;
                })
                this.flashMessage.success({
                    title: res.data.message,
                    time: 2000
                });
            }catch (error){
                console.log(error)
            }

        },
        showCreateCategory()
        {
            for (let field in this.category){
                this.category[field] = ''
            }
            this.$refs['category_modal'].show()
        },
        showEditcategoryModal(category)
        {
            this.editCategory = {...category}
            this.$refs['editCategoryModal'].show()
        },
        hideCategory()
        {
            this.$refs['category_modal'].hide()
        },
        hideEditCategory()
        {
            this.$refs['editCategoryModal'].hide()
            this.editCategory = {}
        },
        setNewImage(){
            this.category.image = this.$refs.neCategoryImage.files[0]
            let reader = new FileReader()
            reader.addEventListener('load', function (){
                this.$refs.displayCategoryImage.src = reader.result
            }.bind(this), false)
            reader.readAsDataURL(this.category.image)
        },
        setEditNewImage(){
            this.editCategory.image = this.$refs.editCategoryImage.files[0]
            let reader = new FileReader()
            reader.addEventListener('load', function (){
                this.$refs.displayEditCategoryImage.src = reader.result
            }.bind(this), false)
            reader.readAsDataURL(this.editCategory.image)
        },
    }
}
</script>

<style scoped>

</style>
