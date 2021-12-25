<template>
<div v-if="quota">

    <div v-if="message" class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 mb-4" role="alert">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
        <p>{{ message }}</p>
    </div>
    

    <!-- Update memory -->
    <div>
        <form class="bg-white shadow-md rounded px-8 pt-4 pb-4 mb-4">
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="memory">
                Memory
            </label>
            <input v-model="quota.memory" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" >
            </div>
            <button @click="updateMemory" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline " type="button" :disabled="busy">
            Update
            </button>
        </form>
        
    </div>

    <!-- Update cpu -->
    <div>
        <form class="bg-white shadow-md rounded px-8 pt-4 pb-4 mb-4">
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="vCpu">
                vCpu
            </label>
            <input v-model="quota.vCpu" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" :disabled="busy">
            </div>
            <button @click="updateCpu" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Update
            </button>
        </form>
    </div>


</div>
</template>

<script>
export default {
    props: ['user'],

    data() {
        return {
            quota: null,
            busy: false,
            message: null
        }
    },

    watch: {
        user() {
            this.fetchQuota();
        }
    },

    mounted() {
        this.fetchQuota();
    },

    methods: {
        fetchQuota() {
            this.axios.get('http://'+window.localStorage.getItem('ip')+'/api/quotas/quota/' + this.user._id, {
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': "Bearer " + this.$store.getters.getJwt
             }
         }).then( response => {
             this.quota = response.data
         }).catch( () => {
             this.quota = null;
             alert("Could not find resources for this user.")
         })
        },

        updateMemory() {
            this.busy = true
            this.message = null;
            this.axios.put('http://'+window.localStorage.getItem('ip')+'/api/quotas/quota/memory/' + this.user._id, {
                  "memoryLimit": this.quota.memory
            } ,{
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': "Bearer " + this.$store.getters.getJwt
             }
         }).then(() => {
             this.message = "Memory quota was updated!"
         }).catch( () => {
              this.message = "Failed to update memory quota."
         }).finally(() => this.busy = false)
        },

        updateCpu() {
            this.busy = true
            this.message = null;
            this.axios.put('http://'+window.localStorage.getItem('ip')+'/api/quotas/quota/Vcpu/' + this.user._id, {
                  "vcpuLimit": this.quota.vCpu
            } ,{
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': "Bearer " + this.$store.getters.getJwt
             }
         }).then(() => {
             this.message = "vCpu quota was updated!"
         }).catch( () => {
              this.message = "Failed to update vCpu quota."
         }).finally(() => this.busy = false)
        }
    }
}
</script>
