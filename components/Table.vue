<template>
    <div class="flex flex-col items-center my-8 p-10 w-full md:w-11/12 lg:w-4/5 bg-white shadow-lg rounded-md ">
        <div class="flex flex-row flex-wrap lg:flex-nowrap items-center justify-between py-5 w-full">
            <p class="text-2xl font-semibold">List of warehouses</p>
            <div class="flex flex-row w-full lg:w-3/5 xl:w-2/4 justify-between mt-3 lg:m-0 lg:justify-end items-center">
                <input v-model="search" @keyup.enter="getSearch" class="w-3/4 p-2 mr-4 rounded-md bg-gray-200 shadow" type="text" placeholder="search">
                <div class="w-1/4 group relative">
                     <button class="rounded-md bg-gray-200 w-full p-2 hover:bg-gray-600 hover:text-white focus:outline-none shadow" type="button">Filter</button>
                     <ul v-if="!isLoading" class="absolute bg-gray-100 shadow transform scale-0 mt-1 group-hover:scale-100 absolute rounded-md transition duration-150 ease-in-out origin-top w-full">
                         <li class="flex flex-col items-center hover:bg-blue-100 w-full">
                            <button @click="showCity = !showCity" class="py-2 w-full focus:outline-none">City</button>
                             <ul v-show="showCity" class="flex flex-col items-start w-full bg-gray-300">
                                <li v-if=" selectedCity != '' " class="w-full"><button class="text-center hover:bg-gray-400 p-2 focus:outline-none w-full" name="city" @click="uncheck" >Clear</button></li>
                                <li v-for="city in cityList" :key="city" class="p-2 w-full"><input class="mr-2" name="city" type="radio" v-model="selectedCity" :value="city">{{city}}</li>
                            </ul>
                         </li>
                         <li class="flex flex-col items-center hover:bg-blue-100 w-full">
                            <button @click="showCluster = !showCluster" class="py-2 w-full focus:outline-none">Cluster</button>
                            <ul v-show="showCluster" class="flex flex-col items-start w-full bg-gray-300">
                                <li v-if=" selectedCluster != '' " class="w-full"><button class="text-center hover:bg-gray-400 p-2 focus:outline-none w-full" name="cluster" @click="uncheck" >Clear</button></li>
                                <li class="p-2 w-full"><input class="mr-2" v-model="selectedCluster" name="cluster" type="radio" value="a-1">a-1</li>
                                <li class="p-2 w-full"><input class="mr-2" v-model="selectedCluster" name="cluster" type="radio" value="a-2">a-2</li>
                                <li class="p-2 w-full"><input class="mr-2" v-model="selectedCluster" name="cluster" type="radio" value="a-21">a-21</li>
                                <li class="p-2 w-full"><input class="mr-2" v-model="selectedCluster" name="cluster" type="radio" value="a-32">a-32</li>
                                <li class="p-2 w-full"><input class="mr-2" v-model="selectedCluster" name="cluster" type="radio" value="v-2">v-2</li>
                            </ul>
                         </li>
                         <li class="flex flex-col items-center hover:bg-blue-100 w-full">
                            <button @click="showSpace = !showSpace" class="py-2 w-full focus:outline-none">Space</button>
                            <ul v-show="showSpace" class="flex flex-col items-start w-full bg-gray-300">
                                <li v-if=" selectedSpace != '' " class="w-full"><button class="text-center hover:bg-gray-400 p-2 focus:outline-none w-full" name="space" @click="uncheck" >Clear</button></li>
                                <li class="p-2 w-full"><input class="mr-2" v-model="selectedSpace" name="space" type="radio" value="100">1-100</li>
                                <li class="p-2 w-full"><input class="mr-2" v-model="selectedSpace" name="space" type="radio" value="1000">100-1000</li>
                                <li class="p-2 w-full"><input class="mr-2" v-model="selectedSpace" name="space" type="radio" value="1000+">> 1000</li>
                            </ul>    
                         </li>
                     </ul>
                </div>
            </div>
        </div>
       <table v-if="!isLoading" class=" w-full">
            <thead class="bg-blue-100">
                <tr>
                <th class="py-5">Name</th>
                <th class=" py-5">City</th>
                <th class="py-5">Type</th>
                <th class="py-5">Status</th>
                </tr>
            </thead>
            <tbody class="text-center border-t-4 border-gray-800">
                <tr v-for="warehouse in data" :key="warehouse.id">
                 <NuxtLink :to="'/'+warehouse.id">
                    <td class=" py-5 cursor-pointer hover:bg-blue-300" >{{warehouse.name}}</td>
                 </NuxtLink>
                <td class=" py-5" >{{warehouse.city}}</td>
                <td class="py-5" >{{warehouse.type}}</td>
                <td class="py-5" >{{warehouse.is_live}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading : true,
            search : '',
            data : [],
            showCity : false,
            showCluster : false,
            showSpace : false,
            selectedCity : '',
            selectedCluster : '',
            selectedSpace : '',
            filter : ['','','']
        }
    },
    watch : {
        selectedCity: {
            handler() {
                this.getFilter()
            }
        },
        selectedCluster: {
             handler() {
                this.getFilter()
            }
        },
        selectedSpace: {
             handler() {
                this.getFilter()
            }
        }
    },
    mounted() {
        this.getWarehouse()
    },
    computed : {
        warehouseData() {
            return this.$store.state.data.data
        },
        searchByName() {
            return this.$store.getters.getByName(this.search)
        },
        applyFilter() {
            return this.$store.getters.getFilterData(this.selectedCity, this.selectedCluster, this.selectedSpace)
        },
        cityList() {
            return this.$store.getters.getCityList()
        }
    },
    methods : {
        async getWarehouse() {
            await this.$store.dispatch('setData')
            this.isLoading = false
            this.data=this.warehouseData
        },
        getSearch() {
            var result = this.searchByName
            if(typeof(result) == 'undefined')
                return
            else
                this.data = [result]
        },
        async getFilter() {
            console.log("wow")
            if (this.selectedCity == '' && this.selectedCluster == '' && this.selectedSpace == '') {
                await this.getWarehouse()
                return
            }
            var result = this.applyFilter
            this.data = result
        },
        uncheck(e) {
            if (e.target.name == 'city')
                this.selectedCity = ''
            else if (e.target.name == 'cluster')
                this.selectedCluster = ''
            else
                this.selectedSpace = ''
        }
    }
}
</script>