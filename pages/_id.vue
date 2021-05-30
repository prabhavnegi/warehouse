<template>
    <div class="flex flex-col items-center bg-gray-50 w-screen min-h-screen">
        <Navbar/>
        <div v-if="isLoading" class="flex flex-col items-start justify-center my-8 p-10 w-full md:w-11/12 lg:w-1/2 bg-white shadow-lg rounded-md ">
            <form class="w-full" action="">
                <div class="flex flex-row w-full justify-between my-4">
                    <p class="text-xl p-4" >Name: </p><input class=" bg-gray-200 px-6 py-2 w-4/5 rounded-md placeholder-gray-900 font-semibold text-xl" v-model="warehouseName" type="text" :placeholder="data.name">
                </div>
                <div class="flex flex-row w-full justify-between my-4">
                    <p class="text-xl  p-4">Code: </p><input class=" bg-gray-200 px-6 py-2 w-4/5 w-4/5 rounded-md placeholder-gray-900 font-semibold text-xl" v-model="code" type="text" :placeholder="data.code">
                </div>
                <div class="flex flex-row w-full justify-between my-4">
                    <p class="text-xl p-4">City: </p><input class=" bg-gray-200 px-6 py-2 w-4/5 w-4/5 rounded-md placeholder-gray-900 font-semibold text-xl" v-model="city" type="text" :placeholder="data.city">
                </div>
                <div class="flex flex-row w-full justify-between my-4">
                    <p class="text-xl p-4">Type: </p><input class=" bg-gray-200 px-6 py-2 w-4/5 w-4/5 rounded-md placeholder-gray-900 font-semibold text-xl" v-model="type" type="text" :placeholder="data.type">
                </div>
                <div class="flex flex-row w-full justify-between my-4">
                    <p class="text-xl p-4">Space:</p><input class=" bg-gray-200 px-6 py-2 w-4/5 w-4/5 rounded-md placeholder-gray-900 font-semibold text-xl" v-model="space" type="text" :placeholder="data.space_available">
                </div>
                <div class="flex flex-row w-full justify-between my-4">
                    <p class="text-xl p-4">Registered: </p><input class=" bg-gray-200 px-6 py-2 w-4/5 w-4/5 rounded-md placeholder-gray-900 font-semibold text-xl" v-model="registered" type="text" :placeholder="data.is_registered?data.is_registered:'false'">
                </div>
                <div class="flex flex-row w-full justify-between my-4">
                    <p class="text-xl p-4">Status: </p><input class=" bg-gray-200 px-6 py-2 w-4/5 w-4/5 rounded-md placeholder-gray-900 font-semibold text-xl" v-model="status" type="text" :placeholder="data.is_live?data.is_live:'false'">
                </div>
                <div class="flex flex-row w-full justify-center my-4">
                    <button @click="goto"  type="button" class="bg-purple-200 py-4 mx-4 px-6 hover:bg-purple-400 shadow rounded-md">home</button>
                    <button type="button" @click="clearData" class="focus:outline-none bg-red-200 py-4 px-6 mx-4 hover:bg-red-400 shadow rounded-md">Clear</button>
                    <button @click="updateData" class="bg-green-200 py-4 px-6 mx-4 hover:bg-green-400 shadow rounded-md">Save</button>
                </div>
            </form>
        </div>    
    </div>
</template>
<script>
import Navbar from '../components/Navbar'
export default {
    components : {
        Navbar
    },
    data() {
        return {
            id : this.$route.params.id,
            data : {},
            city : '',
            code : '',
            type : '',
            warehouseName : '',
            cluster : '',
            space : '',
            registered : '',
            status : '',
            isLoading : false
        }
    },
    computed : {
        getById() {
            return this.$store.getters.getById(this.id)
        }
    },
    methods : {
        async getData() {
            var id = this.id
            this.data = await this.$store.dispatch('getDataID',{id})
            this.isLoading = true
        },
        clearData() {
            console.log("hello")
            this.city = ''
            this.code = ''
            this.warehouseName = ''
            this.cluster = ''
            this.space = ''
            this.registered = ''
            this.status = ''
            this.type = ''
        },
        goto() {
            this.$router.push('/')
        },
        async updateData(e) {
            e.preventDefault()
            if (this.city == '' && this.code == '' && this.warehouseName == '' && this.cluster == '' && this.space == '' && this.registered == '' && this.status == '' && this.type == '')
                return
            var id = this.id
            var city = this.city
            var warehouseName = this.warehouseName
            var cluster = "cluster-"+this.cluster
            var space = this.space == '' ?'': parseInt(this.space)
            var registered = this.registered
            var status = this.status
            var type = this.type
            await this.$store.dispatch('updateData',{id,warehouseName,city,cluster,space,registered,status,type})
            await this.getData()
        }
    },
    mounted() {
        this.getData()
    }
}
</script>