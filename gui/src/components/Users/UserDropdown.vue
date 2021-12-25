<template>
<div>

    <select @change="update" v-model="selected" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option v-for="(user) in users" :key="user._id" :value="user"> {{ user.displayName }} - {{ user.email}} </option>
    </select>

</div>
</template>

<script>

export default {

    props: ['value'],

    data() {
        return {
            selected: this.value,
            users: []
        }
    },

    watch: {
        value(v) {
            this.selected = v
        }
    },
    
    mounted() {
        this.axios.get('http://'+window.localStorage.getItem('ip')+'/api/users/users', {
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': "Bearer " + this.$store.getters.getJwt
             }
         }).then( response => {
             this.users = response.data.data
         })
    },


    methods: {
        update()
        {
            this.$emit('input', this.selected)
        }
    }
}
</script>


