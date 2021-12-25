<template>
<div>
    <div v-for="(radioData, index) in radiosData" :key="index" class="border border-t-0 first:border-t first:rounded-t-md last:rounded-b-md border-gray-200 bg-white">
        <div class="flex items-center mr-4 px-5"  v-bind:class="[radioData.subtext ? 'py-5' : 'py-6']">
            <div>
                <input @change="$emit('radiosDataUpdate', $event.target.value)" :value="radioData.text" v-bind:id="radioData.name + index" type="radio" :name="radioData.name" class="hidden" :checked="radioData.checked"/>
                <label v-bind:for="radioData.name + index" class="flex items-center cursor-pointer text-xl">
                    <span class="w-8 h-8 inline-block mr-10 rounded-full border border-grey flex-no-shrink outsideCircle" ></span>
                    <span class="w-3 h-3 inline-block mr-10 rounded-full flex-no-shrink bg-white insideCircle"></span>
                </label>
            </div>
            <div>
                <div class="text-base font-normal">{{radioData.text}}</div>
                <div class="text-sm text-gray-400" >{{radioData.subtext}}</div>
            </div>
        </div>
    </div>
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
        this.checkRadio();
    },

    methods: {
        checkRadio() {
            //console.log("checkRadio", this.radiosData)
            if(this.radiosData.find(radioData => radioData.text == this.radiosData[0].value)){
                this.radiosData.find(radioData => radioData.text == this.radiosData[0].value).checked = true;
            }
            if(this.radiosData.find(radioData => radioData.inputValue == this.radiosData[0].value)){
                this.radiosData.find(radioData => radioData.inputValue == this.radiosData[0].value).checked = true;
            }
            if(this.radiosData[0].value == "Yes"){
                this.radiosData[0].checked = true;
            }
            else if(this.radiosData[0].value == "No"){
                this.radiosData[1].checked = true;
            }
        },
    }
}
</script>

<style scoped>
    .insideCircle {
        position: absolute;
        margin-left: 0.66rem;
    }
    input[type="radio"]:checked + label span.outsideCircle {
        background-color: #2156A7;
    }
    .break {
        flex-basis: 100%;
        height: 0;
    }
</style>