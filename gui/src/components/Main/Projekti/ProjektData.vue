<template>
<div>
    <div class="rounded-sm flex flex-wrap py-3 bg-remProjectBG hover:shadow-shadowProjectHover">
        <div class="flex-1 py-2 font-medium text-remTableBlack text-tableNumber text-center flex flex-col">
            Datum:
            <input type="text" :value="povprasevanjeData.datum" class="block p-3 mt-2 text-center placeholder-gray-500 text-gray-500 bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm">
        </div>
        <div class="flex-1 py-2 font-medium text-remTableBlack text-tableNumber text-center flex flex-col">
            Plačnik:
            <input type="text" :value="povprasevanjeData.placnik.ime+' '+povprasevanjeData.placnik.priimek" class="block p-3 mt-2 text-center placeholder-gray-500 text-gray-500 bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm">
        </div>
        <div class="flex-1 py-2 font-medium text-remTableBlack text-tableNumber text-center flex flex-col">
            Skupaj:
            <input type="text" :value="povprasevanjeData.skupaj" class="block p-3 mt-2 text-center placeholder-gray-500 text-gray-500 bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm">
        </div>
        <div class="flex-1 py-2 font-medium text-remTableBlack text-tableNumber text-center flex flex-col">
            Status:
            <input type="text" :value="povprasevanjeData.status" class="block p-3 mt-2 text-center placeholder-gray-500 text-gray-500 bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm">
        </div>
        <!-- <div class="flex-1 py-2 font-normal text-tableCells text-remTableGray">{{projectData.ustvarjen}}</div>
        <div class="flex-1 py-2 font-normal text-tableCells text-remTableGray">{{projectData.zadnjaSprememba}}</div> -->
    </div>
    <div class="rounded-sm flex flex-wrap py-3 bg-remProjectBG hover:shadow-shadowProjectHover">
        <div class="flex-1 py-2 font-medium text-remTableBlack text-tableNumber text-center flex flex-col">
            Razpon:
            <input type="text" :value="povprasevanjeData.izdelki[0].razpon" class="block p-3 mt-2 text-center placeholder-gray-500 text-gray-500 bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm">
        </div>
        <div class="flex-1 py-2 font-medium text-remTableBlack text-tableNumber text-center flex flex-col">
            Višina:
            <input type="text" :value="povprasevanjeData.izdelki[0].visina" class="block p-3 mt-2 text-center placeholder-gray-500 text-gray-500 bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm">
        </div>
        <div class="flex-1 py-2 font-medium text-remTableBlack text-tableNumber text-center flex flex-col">
            Kolicina:
            <input type="text" :value="povprasevanjeData.izdelki[0].kolicina" class="block p-3 mt-2 text-center placeholder-gray-500 text-gray-500 bg-white rounded border-0 outline-none focus:outline-none focus:shadow-sm">
        </div>
        <!-- <div class="flex-1 py-2 font-normal text-tableCells text-remTableGray">{{projectData.ustvarjen}}</div>
        <div class="flex-1 py-2 font-normal text-tableCells text-remTableGray">{{projectData.zadnjaSprememba}}</div> -->
    </div>
    <div class="rounded-sm flex flex-row-reverse flex-wrap py-3 mb-5 bg-remProjectBG hover:shadow-shadowProjectHover">
        <button class="block w-64 outline-none focus:outline-none bg-green-600 hover:bg-green-700 text-sm text-white font-semibold tracking-wide py-3 mb-4 mr-8 rounded-full self-end">
            Pošlji ponudbo
        </button>
    </div>
</div>
</template>

<script>

export default {
    props: ['povprasevanjeData'],

    data() {
        return {
        };
    },

    mixins: [],

    created() {
    },

    methods: {
        getStatusColorFromStatus() {
            switch(this.povprasevanjeData.status) {
                case 'Ponudba v pripravi':
                    return 'bg-yellow-100 text-yellow-500';
                case 'Projekt potrjen':
                    return 'bg-green-100 text-green-500';
                default:
                    'bg-gray-100'
                }
        },
        getRouterLink() {
            if (this.povprasevanjeData.status == "Projekt potrjen"){
                return {path: '/projekti/' + this.projectData.id}
            }
            
            return {path: '/povprasevanje/' + this.projectData.id}
        }
    }
}
</script>

<style scoped>

</style>
