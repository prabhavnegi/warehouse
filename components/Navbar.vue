<template>
    <div @click="goto" class="flex justify-center pt-10 items-end">
        <p class="text-6xl cursor-pointer font-semibold">Warehouses</p>
        <img class="w-24 cursor-pointer " src="~/assets/warehouse.svg" alt="warehouse">
    </div>    
</template>

<script>
export default {
    methods : {
        goto() {
            this.$router.push('/')
        }
    }
}
</script>