<template>
<div>
    <div class="mt-2 border border-gray-200 rounded-md">
        <input @change="$emit('inputTextDataUpdate', $event.target.value)" :value="inputText.value" :type="[inputText.type ? inputText.type : 'text']" :placeholder="inputText.placeholder" :min="[inputText.min ? inputText.min : '']" :onkeypress="[inputText.int ? 'return event.charCode >= 48 && event.charCode <= 57' : '']" class="p-5 placeholder-gray-500 text-gray-500 relative bg-white rounded-md border-0 outline-none focus:outline-none focus:shadow-sm w-full"/>
    </div>

</div>
</template>

<script>


export default {
    props: ['inputText'],
    data() {
        return {
        };
    },

    mixins: [],

    created() {
    },

    methods: {
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