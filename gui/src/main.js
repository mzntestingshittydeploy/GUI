import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import createPersistedState from "vuex-persistedstate";
//import Cookies from 'js-cookie';
import './index.css';
import './assets/tailwind.css';

import App from './components/app.vue';
import MainLogin from './components/MainLogin.vue';
import MainProfile from './components/MainProfile.vue';
import MainRegister from './components/MainRegister.vue';
import MainDashboard from './components/MainDashboard.vue';
import DashboardView from './components/Main/DashboardView.vue';
import UserManagement from './components/Main/UserManagement.vue';
import ManageInstances from './components/Main/ManageInstances.vue';
import SolverManagement from './components/Main/SolverManagement.vue';
import ManageScheduling from './components/Main/ManageScheduling.vue';
import ManageSolutions from './components/Main/ManageSolutions.vue';

// Povprasevanje

// Left Sidebar
Vue.component('sidebarLeft', require('./components/Main/Sidebar_left/Sidebar_left.vue').default);

// Right Sidebar
Vue.component('sidebarProduction', require('./components/Main/Sidebar_right/SidebarRightProduction.vue').default);

//Footer
Vue.component('footerBuildingQueue', require('./components/Main/Footer/BuildingQueue.vue').default);

//FormElements
//Vue.component('radios', require('./components/FormElements/Radios.vue').default);
Vue.component('fileUpload', require('./components/FormElements/FileUpload.vue').default);
Vue.component('buttonNext', require('./components/FormElements/ButtonNext.vue').default);
Vue.component('buttonAdd', require('./components/FormElements/ButtonAdd.vue').default);
Vue.component('inputText', require('./components/FormElements/InputText.vue').default);

//Projekti
Vue.component('projektData', require('./components/Main/Projekti/ProjektData.vue').default)

Vue.use(VueRouter);
Vue.use(Vuex);

window.axios = axios;

Vue.use(VueAxios, window.axios)
Vue.use(require('vue-moment'));

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/register',
            name: 'MainRegister',
            component: MainRegister
        },
        {
            path: '/login',
            name: 'MainLogin',
            component: MainLogin
        },
        {
            path: '/dashboard',
            name: 'MainDashboard',
            component: MainDashboard
        },
        {
            path: '/instances',
            name: 'ManageInstances',
            component: ManageInstances
        },
        {
            path: '/schedule',
            name: 'ManageScheduling',
            component: ManageScheduling
        },
        {
            path: '/solutions',
            name: 'ManageSolutions',
            component: ManageSolutions
        },
        {
            path: '/profile/:uid?',
            name: 'MainProfile',
            component: MainProfile
        },
        {
            path: '/',
            name: 'DashboardView',
            component: DashboardView
        },
        {
            path: '/admin/users',
            name: 'UserManagement',
            component: UserManagement
        },
        {
            path: '/admin/solvers',
            name: 'SolverManagement',
            component: SolverManagement
        }
    ]
});

const store = new Vuex.Store({
    state: {
        jwt: "",
        user: "",
        povprasevanja: []
    },

    mutations: {
        setJwt(state, jwt)                      { state.jwt = jwt; },
        setUser(state, user)                    { state.user = user; },
        setPovprasevanja(state, povprasevanja)  { state.povprasevanja = povprasevanja; },
        addProject(state, project)              { state.projects.unshift(project); },
    },
    actions: {
        async fetchJwt(context) {
            return context.getters.getJwt;
        },
        async fetchUser(context) {
            return context.getters.getUser;
        },
        async fetchPovprasevanja(context) {
            /* let mfid = context.getters.getUser.mfid;
            await Vue.axios.get('http://'+process.env.VUE_APP_BASE_URL+'/api/mfiles/users/'+mfid+'/projects').then((response) => {
                response.data.data = response.data.data.reverse();
                context.commit('setProjects', response.data.data);
            }); */
            await Vue.axios.get(`${process.env.VUE_APP_BASE_PROTOCOL}://${process.env.VUE_APP_BASE_URL}/api/povprasevanja/`).then((response) => {
                response.data.data = response.data.data.reverse();
                context.commit('setPovprasevanja', response.data.data);
            });
        }
    },
    getters: {
        getJwt:             state => { return state.jwt; },
        getUser:            state => { return state.user; },
        getPovprasevanja:   state => { return state.povprasevanja; },
    },
    plugins: [createPersistedState()],
})

router.beforeResolve((to, from, next) => {
    if ( to.name !== 'MainLogin' && to.name !== 'MainRegister' && !store.getters.getJwt) next({ name: 'MainLogin' })
    else if (to.name == 'MainLogin' && store.getters.getJwt) next({ name: 'dashboard' })
    else next();
});


Vue.config.productionTip = false;


window.Bus = new Vue();

new Vue({
    el: '#app',
    components: {
        App
    },

    router,
    store,
    render: h => h(App),
});

/* function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
} */