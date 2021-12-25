<template>
<div>
    <button @click="$emit('buttonNext-click-next')" v-for="(buttonNext, index) in buttonsNext" :key="index" class="flex justify-center w-full outline-none focus:outline-none bg-remBlue hover:bg-remBlueHover text-sm text-white font-semibold tracking-wide py-4 mt-7 rounded-full">
        <span>{{buttonNext.text}}</span>
            <img class="inline my-1 ml-4 " src="/svgs/next.svg" />
    </button>
    <button class="flex justify-center outline-none focus:outline-none w-full text-sm text-remBackButton font-light tracking-widemt-5 mt-5">
        <span @click="$emit('buttonNext-click-previous')" class="border-b border-gray-500">Nazaj</span>
    </button>

</div>
</template>

<script>


export default {
    props: ['buttonsNext'],
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