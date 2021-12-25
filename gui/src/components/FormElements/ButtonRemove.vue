<template>
<div>
    <button @click="$emit('buttonRemoveClicked')" class="flex justify-center w-full outline-none focus:outline-none bg-transparent hover:bg-gray-300 text-sm border border-black text-black font-semibold tracking-wide py-4 mt-5 mb-10 rounded-full">
        <img class="inline mr-4 " src="/svgs/removeProject.svg" />
        <span>{{buttonRemove.text}}</span>
    </button>
</div>
</template>

<script>


export default {
    props: ['buttonRemove'],
    data() {
        return {
        };
    },

    mixins: [],

    created() {
        this.loadMethods();
    },

    methods: {
        loadMethods() {
            
        },
    }
}
/*
//Script that adds class to textarea onclick 
Vue.config.devtools = true
var vm = new Vue({
    el: '#buttonFrame',
    data: {
        isAddClass: false,
    },
    methods: {
            addClass: function() {
                this.isAddClass = true;
                document.querySelector('.textareaShow').remove.add('hidden');
                document.querySelector('.textareaShow').classList.add('block');
        }
    }
});*/
</script>

<style scoped>
    input[type="radio"]:checked + label span {
        background-color: #3490DC;
        box-shadow: 0px 0px 0px 2px white inset;
    }
    .break {
        flex-basis: 100%;
        height: 0;
    }
</style>