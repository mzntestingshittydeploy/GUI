<template>
<div>
    
            <div v-if="message" class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 mb-4" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p>{{ message }}</p>
            </div>

            <div class="borderShadowProject rounded-sm tracking-wide bg-white pt-4 mt-8 mb-6">
                <div class="text-center p-6 text-2xl font-bold">
                    Schedule execution
                </div>
                <div class="px-20 border-t pt-4">
                    Mzn instances:
                    <div v-for="(mznInstance, index) of mznFiles" :key="mznInstance.fileUUID" class="flex items-center mb-4 mt-2">
                        <input :id="'mznInstance-option-' + index" type="checkbox" name="solver" :value="mznInstance.fileUUID" class="mznInstance h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="mznInstance-option" aria-describedby="mznInstance-option">
                        <label :for="'mznInstance-option-' + index" class="mznInstance text-sm font-medium text-gray-900 ml-2 block" style="text-transform: capitalize">
                            {{mznInstance.fileName}}
                        </label>
                    </div>
                </div>
                <div class="px-20 py-4">
                    Dzn instances:
                    <select id="dznSelect" style="text-transform: capitalize" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">None</option>
                        <option v-for="(dznFile, index) of dznFiles" :value="dznFile.fileUUID" :key="dznFile.fileUUID" style="text-transform: capitalize">ID: {{index}} {{dznFile.fileName}}</option>
                    </select>
                </div>
                <div class="px-20 pb-4">
                    Solvers:
                    <div v-for="(solver, index) of solvers" :key="solver.id" class="flex items-center mb-4 mt-2">
                        <input :id="'solver-option-' + index" type="checkbox" name="solver" :value="solver.id" class="solverOption h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="solver-option" aria-describedby="solver-option">
                        <label :for="'solver-option-' + index" class="solverOption text-sm font-medium text-gray-900 ml-2 block" style="text-transform: capitalize">
                            {{solver.name}}
                        </label>
                    </div>
                </div>
                <div class="px-20 pb-4">
                    <div class="flex mb-4 mt-2">
                        <div class="pl-2">Timeout (in seconds)</div>
                        <div class="pl-20">Memory limit (in Megabytes)</div>
                        <div class="pl-4">vCPUs</div>
                    </div>
                    <div class="flex mb-4 mt-2">
                        <input id="timeoutInput" value="60" type="number" placeholder="Timeout in seconds" class="border-2 text-black border-gray-900 rounded-lg mx-2 p-2">
                        <input id="memoryInput" value="300" type="number" placeholder="Memory limit in MB" class="border-2 text-black border-gray-900 rounded-lg mx-2 p-2">
                        <input id="vcpusInput" value="1" type="number" placeholder="No. of vCPUs" class="border-2 text-black border-gray-900 rounded-lg mx-2 p-2">
                    </div>
                </div>
                <div class="px-20 pb-4">
                    Solver options:
                    <div class="flex items-center mb-4 mt-4">
                        <input id="solverConf-option-1" type="radio" name="solverConf" value="Free search" class="solverConfOption h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="solverConf-option-1" aria-describedby="solverConf-option-1" checked>
                        <label for="solverConf-option-1" class="text-sm font-medium text-gray-900 ml-2 block">
                            Free search
                        </label>
                    </div>

                    <div class="flex items-center mb-4">
                        <input id="solverConf-option-2" type="radio" name="solverConf" value="Return all solutions" class="solverConfOption h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="solverConf-option-2" aria-describedby="solverConf-option-2">
                        <label for="solverConf-option-2" class="text-sm font-medium text-gray-900 ml-2 block">
                            Return all solutions
                        </label>
                    </div>
                </div>
                <div class="flex px-20 pb-4 justify-center">
                    <button @click="scheduleExecution" class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full text-xl">
                        Execute
                    </button>
                </div>
            </div>

<div v-if="queue.length > 0">
    <h1 class="text-3xl mb-6 font-bold">Queue</h1>

    <div class="flex flex-col mb-8">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Id
                    </th>

                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Memory
                    </th>

                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        vCPUs
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Stop</span>
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">

                <tr :key="job.id" v-for="job in queue">
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ job.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ job.memory }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    {{ job.vcpus }}
                </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button @click="removeJobFromQueue(job)" class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" :disabled="busy">
                            Dequeue       
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

</template>

<script>

export default {
    

    components: {

    },
    data() {
        return {
            solvers: [],
            mznFiles: [],
            dznFiles: [],
            user: null,
            jwt: null,
            queue: [],
            message: null,
            busy: false,
        };
    },

    created() {
        this.user = this.$store.getters.getUser;
        this.jwt = this.$store.getters.getJwt;
    },

    mounted() {
        this.refreshSolvers();
        this.refreshFiles();
        this.axios.defaults.headers.common = {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + this.jwt
        };

        this.fetchJobs();
    },

    watch: {

    },

    methods: {
        async fetchJobs() {
            this.axios.get('http://'+window.localStorage.getItem('ip')+'/api/scheduler/computations/' + this.user.id)
            .then( response => {
                this.queue = response.data;
            }).finally( () => this.busy = false)
        },

        removeJobFromQueue(job) {
            this.message = null;
            this.busy = true;
            this.axios.delete('http://'+window.localStorage.getItem('ip')+'/api/scheduler/computation/' + job.id)
            .then( () => {
                this.message = "Job was dequeued."
            }).finally( () => this.fetchJobs())
        },


        async refreshSolvers() {
            this.solvers = await (await fetch('http://'+window.localStorage.getItem('ip')+'/api/solvers/Solvers', {
                headers: {
                    Authorization: "Bearer " + this.jwt}
                })).json();
        },
        async refreshFiles() {
            let files = await (await fetch('http://'+window.localStorage.getItem('ip')+'/api/minizinc/' + this.user.id, {
                headers: {
                    Authorization: "Bearer " + this.jwt}
                })).json();
            this.mznFiles = [];
            this.dznFiles = [];
            for(let file of files){
                if (file.fileName.includes(".mzn"))         this.mznFiles.push(file);
                else if (file.fileName.includes(".dzn"))    this.dznFiles.push(file);
            }
        },
        async scheduleExecution(){
            let mzn_ids = Array.from(document.querySelectorAll(".mznInstance")).filter(el => el.checked).map(el => el.value);
            let dzn_id = document.querySelector("#dznSelect").value || null;
            let timeout = document.querySelector("#timeoutInput").value;
            let memory = document.querySelector("#memoryInput").value;
            let vcpus = document.querySelector("#vcpusInput").value;

            let solvers = Array.from(document.querySelectorAll(".solverOption")).filter(el => el.checked).map(el => el.value);
            let solverConf = document.querySelector('input[name="solverConf"]:checked').value;

            if (solvers.length == 0) { alert("No solvers selected"); return;}

            console.log(mzn_ids)

            for(let mzn_id of mzn_ids){

                let reqBody = {
                    solver_ids: solvers, 
                    mzn_file_id: mzn_id,
                    vcpus: vcpus,
                    memory: memory,
                    timeout_seconds: timeout,
                    solver_options: solverConf,
                    user_id: this.user.id
                }

                if (dzn_id) reqBody["dzn_file_id"] = dzn_id;

                console.log(reqBody);


                this.axios.post('http://'+window.localStorage.getItem('ip')+'/api/scheduler/computation', reqBody, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + this.jwt
                    }
                })
                .then(axiosRes => {
                    let axiosJson = axiosRes.data;
                    console.log(axiosJson);
                })
                .catch(axiosErr => {
                    console.log("Axios error: " + axiosErr);
                    alert("Axios error: " + axiosErr);
                }).finally( () => this.fetchJobs());
            }
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
