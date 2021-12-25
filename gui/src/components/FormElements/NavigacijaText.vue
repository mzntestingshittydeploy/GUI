<template>
<div>
    <div v-for="(inputText, index) in inputTexts" :key="index" class="mt-4 border border-gray-200 rounded">
        <input type="text" :placeholder="inputText.placeholder" class="p-5 placeholder-gray-500 text-gray-500 relative bg-white bg-white rounded border-0 outline-none focus:outline-none focus:ring w-full"/>
    </div>

</div>
</template>

<script>


export default {
    props: ['inputTexts'],
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