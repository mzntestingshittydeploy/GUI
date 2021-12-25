<template>
  <div v-if="user">
    <div class="ml-2 flex flex-col h-screen pb-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600 left-0 bg-white">
      <div class="text-3xl font-bold text-left mt-6 mb-4 ml-6 text-blue-600">Cloud Solver</div>
      <hr class="mb-0">
      <div class="flex cursor-default ml-4 py-4">
        <img class="object-cover w-10 h-10 mr-2 rounded-full" :src="'https://avatars.dicebear.com/api/identicon/' + user.email +'.svg'" alt="avatar">
        <div class="">
          <h4 class="mx-2 font-medium text-sm dark:text-gray-200 hover:underline mainHeading">{{user.displayName}}</h4>
          <div class="mx-2 text-xs font-medium text-remSideBarGray dark:text-gray-400 hover:underline">{{user.email}}</div>
        </div>
      </div>
      <hr>
      <div style="min-height: 400px; height: 100%" >
      <div style="height: 100%;" class="flex flex-col justify-between flex-1 mt-1 relative h-full">
        <nav class="">
          <!-- <router-link :to="{ name: 'MainDashboard' }" class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
            <img class="inline mr-2" src="/svgs/dashboard.svg" />

            <span class="mx-4 font-medium text-black tracking-wide hover:text-remSideBarHoverBlue">Nadzorna plošča</span>
          </router-link> -->

          <!--
          <router-link :to="{ name: 'povprasevanje' }" class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <span class="mx-4 font-medium">Povpraševanje</span>
          </router-link>

          -->
          <div class="py-4 px-4">
          <h3 class=" text-xl mb-2 font-bold">Menu</h3>
          <router-link :to="{ name: 'DashboardView' }" class="flex items-center  py-2  text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
            <span class="mx-4 font-medium text-black tracking-wide hover:text-remSideBarHoverBlue">Dashboard</span>
          </router-link>

          <router-link :to="{ name: 'ManageInstances' }" class="flex items-center  py-2  text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
            <span class="mx-4 font-medium text-black tracking-wide hover:text-remSideBarHoverBlue">Instances</span>
          </router-link>

          <router-link :to="{ name: 'ManageSolutions' }" class="flex items-center  py-2  text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
            <span class="mx-4 font-medium text-black tracking-wide hover:text-remSideBarHoverBlue">Solutions</span>
          </router-link>

          <router-link :to="{ name: 'ManageScheduling' }" class="flex items-center  py-2  text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
            <span class="mx-4 font-medium text-black tracking-wide hover:text-remSideBarHoverBlue">Schedule</span>
          </router-link>



          <!-- <a class="flex items-center  py-2 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
            <img class="inline mr-2" src="/svgs/dokumenti.svg" />

            <span class="mx-4 font-medium text-black tracking-wide hover:text-remSideBarHoverBlue">Dokumenti</span>
          </a> -->    
        </div>

        <div class="" v-if="user.userRole == 'admin'">
          <hr>
          <div class="px-4 py-4">
          <h3 class="text-xl mb-2 font-bold">Admin</h3>
          <router-link  :to="{ name: 'UserManagement' }" class="flex items-center  py-2 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700">
           
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>

              <span class="mx-4 font-medium text-black tracking-wide hover:text-remSideBarHoverBlue">Users</span>
            </router-link>

          <router-link  :to="{ name: 'SolverManagement' }" class="flex items-center  py-2 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
              <span class="mx-4 font-medium text-black tracking-wide hover:text-remSideBarHoverBlue">Solvers</span>
            </router-link>
        </div>
        </div>

        <div class="flex-grow" ></div>

          <a v-if="$store.getters.getJwt" v-on:click="logout()" class="absolute bottom-0 w-full px-4 py-2  text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 mt-auto mb-0" href="#/">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="mx-4 font-medium text-black tracking-wide hover:text-remSideBarHoverBlue">Logout</span>
          </a>
        </nav>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchMixins } from "@/mixins/fetchMixins";
import { toolsMixins } from "@/mixins/toolsMixins";

export default {
  data() {
    return {
      user: "",
    };
  },

  created() {
    this.user = this.$store.getters.getUser;
  },

  mixins: [toolsMixins, fetchMixins],

  methods: {
    logout() {
      this.$store.commit('setJwt', "");
      this.$store.commit('setUser', "");
      //this.$store.commit('setProjects', "");
      //this.$store.commit('setMfilesID', "");
      //console.log(this.$store.state);
      sessionStorage.clear();
      this.$router.push({ name: 'MainLogin' });
    },
  },
};
</script>

<style>
@media (max-width: 600px) {
  .nav-item {
    font-size: 2em;
    width: 100%;
    text-align: center;
  }

  body > .container {
    padding: 0;
  }

  ul.navbar-nav {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .navbar-toggler.hidden {
    visibility: hidden;
  }

  .navbar-toggler.hidden.collapsed {
    display: none;
  }
}
</style>
