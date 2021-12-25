<template>
<!-- This example requires Tailwind CSS v2.0+ -->

<div>

<h1 class="text-3xl mb-6 font-bold">Solvers</h1>
<div class="mb-8">

<div v-if="solvers.length == 0 && !busy">
    There are currently no solvers.
</div>
<div v-if="solvers.length != 0" class="flex flex-col">
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
                Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>

              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">

            <tr :key="solver.id" v-for="solver in solvers">
              <td class="px-6 py-4 whitespace-nowrap">
                  {{ solver.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                  {{ solver.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                  {{ solver.image }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="deleteSolver(solver.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" :disabled="busy">
                    Delete
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


<h2 class="text-3xl mb-6 font-bold">Create New</h2>

<div class="w-full">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Name
      </label>
      <input v-model="form.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
        Image
      </label>
      <input v-model="form.image" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="image">
    </div>
    <div class="flex items-center justify-between">
      <button @click="createSolver" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" :disabled="busy">
        Create
      </button>
    </div>
  </form>

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
            busy: false,

            form: {
                name: null,
                image: null
            }
        };
    },

    mounted() {
        this.fetchSolvers();
    },

    methods: {

        createSolver() {
            this.busy = true;
            this.axios.post('http://'+window.localStorage.getItem('ip')+'/api/solvers/Solvers', this.form , {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.$store.getters.getJwt
                }
            }).then( () => {
                this.form.name = null;
                this.form.image = null;
            }).finally( () => {
                this.fetchSolvers();
            })
        },

        fetchSolvers() {
            this.busy = true;
            this.axios.get('http://'+window.localStorage.getItem('ip')+'/api/solvers/Solvers', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.$store.getters.getJwt
                }
            }).then( response => {
                this.solvers = response.data;
            }).finally( () => {
                this.busy = false;
            })
        },

        deleteSolver(id) {
            this.busy = true;
            this.axios.delete('http://'+window.localStorage.getItem('ip')+'/api/solvers/Solvers/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.$store.getters.getJwt
                }
            }).then( () => {
            }).finally( () => {
                this.fetchSolvers();
            })
        }
    },
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
