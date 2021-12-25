<template>
<div>
    <div class="mt-2 p-5 border border-gray-200 rounded bg-white">
        <label class="text-gray-500 cursor-pointer hover:bg-remBlue hover:text-black">
            <span class="mt-2 text-base leading-normal">Izberi datoteko...</span>
            <input type='file' multiple class="hidden" />
        </label>
    </div>
    <div class="text-sm text-gray-400" >Sprejemamo datoteke v  .jpg, .pdf fromatu. Max. velikost 20mb</div>
</div>
</template>

<script>


export default {
    props: ['radiosData'],
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