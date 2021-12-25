<template>
<div>
    <h1 class="text-3xl mb-6 font-bold">Dashboard</h1>

    <div class="mb-8" >
        <h2 class="text-2xl mb-6 font-bold">Resource Consumption</h2>
        <div v-if="quota != null" class="row flex w-full justify-start" >
            <div class="max-w-sm rounded px-8 py-4 overflow-hidden shadow-lg mr-6">    
                <span class="font-bold text-2xl">{{ currentMemoryConsumption }} / {{ quota.memory }} MB</span>
            </div>   
            <div class="max-w-sm rounded px-8 py-4 overflow-hidden shadow-lg mr-6">    
                <span class="font-bold text-2xl">{{ currentCpuConsumption }} / {{ quota.vCpu }} vCPUs</span>
            </div>
        </div>
    </div>
    <div>
        <h2 class="text-2xl mb-6 font-bold">Computations</h2>
        <div v-if="computations.length == 0">
            There are currently no computations.
        </div>
        <div v-else>
            <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Computation ID:
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Memory
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    vCPU
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" class="relative px-6 py-3">
                                    <span class="sr-only">Stop</span>
                                </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="c in computations" :key="c.id">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        {{ c.computation_id }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        {{ c.memory_usage }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        {{ c.vcpu_usage }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Executing
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button @click="terminateComputation(c.computation_id)" class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" >
                                            Stop       
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
/* import ProjektData from '@/components/Main/Projekti/ProjektData.vue'; */
import moment from 'moment'
moment.locale('sl');

//import UserResourceLimit from '@/components/Quotas/UserResourceLimit.vue'

export default {
    
    components: {
       
    },

    data() {
        return {
            povprasevanjaData: this.$store.getters.getPovprasevanja,
            fetchingPovprasevanja: false,
            quota: null,
            computations: [],
        };
    },

    mixins: [],

    created() {
        this.user = this.$store.getters.getUser;
        this.jwt = this.$store.getters.getJwt;
        this.axios.defaults.headers.common = {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + this.jwt
        };
    },

    computed: {
      currentMemoryConsumption() {
          return this.computations.map( c => c.memory_usage).reduce( (a,b) => a + b, 0);
      },
      currentCpuConsumption() {
          return this.computations.map( c => c.vcpu_usage).reduce( (a,b) => a + b, 0);
      }  
    },

    mounted(){
        this.fetchQuotas();
        this.getCurrentComputations();
    },

    methods: {
        async fetchQuotas() {
            this.axios.get('http://'+window.localStorage.getItem('ip')+'/api/quotas/quota/' + this.user.id)
            .then( response => {
                this.quota = response.data
                console.log(this.quota)
            });
        },

        getCurrentComputations(){
            this.axios.get('http://'+window.localStorage.getItem('ip')+'/api/monitor/processes/' + this.user.id, )
            .then(response => {
                this.computations = response.data;
            });
        },

        terminateComputation(computationId){
            console.log("Terminating computation: " + computationId)
            this.axios.delete('http://'+window.localStorage.getItem('ip')+'/api/scheduler/computation/running/' + computationId, {
                headers: {
                    'Authorization': "Bearer " + this.jwt
                }
            })
            .then(response => {
                let axiosJson = response.data;
                console.log("Computation stopped");
                console.log(axiosJson);
                this.getCurrentComputations()
            })
            .catch(axiosErr => {
                console.log("Axios error: " + axiosErr);
                alert("Axios error: " + axiosErr);
            });
        },
    }
}
</script>

<style scoped>
.borderShadowProject{
    filter: drop-shadow(0px 6px 18px rgba(0, 0, 0, 0.06));
}
.marginBottom{
    margin-bottom:1px;
}

textarea{
    padding: 1rem;
}

input[type=text]{
    padding: 0.5rem;
}

.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
