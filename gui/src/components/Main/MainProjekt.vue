<template>
    <div>
        <!-- Main Body -->
        <div class="text-left w-full  mt-36">
            <div class="inner px-8 py-6 bg-white rounded">
                <button class="hidden outline-none focus:outline-none" onclick="history.back()">
                    <img class="inline h-5" src="/svgs/left-arrow.svg" />
                </button>
                <div class="text-remGray text-lg font-semibold">
                    Projekt
                </div>
                <div class="mt-4 pb-8 text-xl text-font-semibold border-b border-remGrayBorder">
                    # {{projectData.stProjekta}}
                </div>
                <div class="flex mt-8 justify-between">
                    <div class="grid grid-cols-3 justify-between text-tableNumber tracking-wide">
                        <div class="innerBox ">
                            <div class="text-remGray font-medium">
                                Lokacija objekta
                            </div>
                            <div class="mt-4 text-remTableGray">
                                {{projectData.lokacijaObjekta.kraj}}
                            </div>
                        </div>
                        <div class="innerBox -ml-2">
                            <div class="text-remGray font-medium">
                                Število modulov
                            </div>
                            <div class="mt-4 text-remTableGray">
                                {{projectData.informacijeOObjektu.steviloModulov}}
                            </div>
                        </div>
                        <div class="innerBox -ml-4">
                            <div class="text-remGray font-medium">
                                Status
                            </div>
                            <div class="w-52  mt-4 py-2 rounded-full bg-green-100 text-green-500 text-center text-tableCells">
                                {{projectData.status}}
                            </div>

                        </div>
                    </div>
                    <div class="rightBox flex flex-wrap content-end">
                        <div class="flex">
                            <div class="text-xs font-medium tracking-wide">
                                <span v-if="readMore"></span>
                                <span v-else></span>
                                <button class="btn btn-success flex text-remGray-100 outline-none focus:outline-none text-tableCells"
                                    @click="readMore = !readMore">
                                    <span>Poglej oddano povpraševanje</span>
                                    <div class="ml-2">
                                        <img class="inline" src="/svgs/downarrow.svg" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="readMore" class="text-center mt-24">
                    <div class="heading">
                        <div class="text-3xl mb-2 font-semibold mainHeading">
                            Povpraševanje
                        </div>
                        <div class="text-sxl mb-8">
                            Pregled oddanega povpraševanja
                        </div>
                    </div>
                    <div class="main-content mt-28 grid grid-cols-5">
                        <div class="leftBar col-span-1 mb-24">
                            <div class="text-left text-l ml-11 text-remGray-100">
                                <div @click="currentShownCompontentIndex = 0"
                                    class="mb-4 leading-loose cursor-pointer font-medium hover:text-black"
                                    v-bind:class="[currentShownCompontentIndex == 0 ? 'text-green-300' : '']">
                                    Lokacija
                                </div>
                                <div @click="currentShownCompontentIndex = 1"
                                    class="mb-4 leading-loose cursor-pointer font-medium hover:text-black"
                                    v-bind:class="[currentShownCompontentIndex == 1 ? 'text-green-300' : '']">
                                    Informacije o objektu</div>
                                <div @click="currentShownCompontentIndex = 2"
                                    class="mb-4 leading-loose cursor-pointer font-medium hover:text-black"
                                    v-bind:class="[currentShownCompontentIndex == 2 ? 'text-green-300' : '']">Okvir
                                </div>
                                <div @click="currentShownCompontentIndex = 3"
                                    class="mb-4 leading-loose cursor-pointer font-medium hover:text-black"
                                    v-bind:class="[currentShownCompontentIndex == 3 ? 'text-green-300' : '']">Pod</div>
                                <div @click="currentShownCompontentIndex = 4"
                                    class="mb-4 leading-loose cursor-pointer font-medium hover:text-black"
                                    v-bind:class="[currentShownCompontentIndex == 4 ? 'text-green-300' : '']">Zunanje
                                    stene
                                </div>
                                <div @click="currentShownCompontentIndex = 5"
                                    class="mb-4 leading-loose cursor-pointer font-medium hover:text-black"
                                    v-bind:class="[currentShownCompontentIndex == 5 ? 'text-green-300' : '']">Predelne
                                    stene
                                </div>
                                <div @click="currentShownCompontentIndex = 6"
                                    class="mb-4 leading-loose cursor-pointer font-medium hover:text-black"
                                    v-bind:class="[currentShownCompontentIndex == 6 ? 'text-green-300' : '']">Strop
                                </div>
                                <div @click="currentShownCompontentIndex = 7"
                                    class="mb-4 leading-loose cursor-pointer font-medium hover:text-black"
                                    v-bind:class="[currentShownCompontentIndex == 7 ? 'text-green-300' : '']">Streha
                                </div>
                                <div @click="currentShownCompontentIndex = 8"
                                    class="mb-4 leading-loose cursor-pointer font-medium hover:text-black"
                                    v-bind:class="[currentShownCompontentIndex == 8 ? 'text-green-300' : '']">Okna in
                                    zasteklitve</div>
                                <div @click="currentShownCompontentIndex = 9"
                                    class="mb-4 leading-loose cursor-pointer font-medium hover:text-black"
                                    v-bind:class="[currentShownCompontentIndex == 9 ? 'text-green-300' : '']">Električne
                                    inštalacije</div>
                                <div @click="currentShownCompontentIndex = 10"
                                    class="mb-4 leading-loose cursor-pointer font-medium hover:text-black"
                                    v-bind:class="[currentShownCompontentIndex == 10 ? 'text-green-300' : '']">Vodovodne
                                    inštalacije</div>
                                <div @click="currentShownCompontentIndex = 11"
                                    class="mb-4 leading-loose cursor-pointer font-medium hover:text-black"
                                    v-bind:class="[currentShownCompontentIndex == 11 ? 'text-green-300' : '']">Ogrevanje
                                    in
                                    hlajenje</div>
                                <div @click="currentShownCompontentIndex = 12"
                                    class="mb-4 leading-loose cursor-pointer font-medium hover:text-black"
                                    v-bind:class="[currentShownCompontentIndex == 12 ? 'text-green-300' : '']">Dodatno
                                </div>
                            </div>
                        </div>
                        <div class="rightContent col-span-4 ml-14 border-l border-color-remBorderRightGray">
                            <div class="">
                                <div class="povprasevanjeHeading text-2xl font-semibold mainHeading text-center">
                                    Informacije o objektu
                                </div>
                                <div class="povprasevanjeContent text-base tracking-wide mt-7">
                                    <div class="povprasevanjeLastnosti">
                                        <div v-for="(detailData, index) in currentDetailData[currentShownCompontentIndex]" :key="index">
                                            <div class="text-right mr-3 mb-4 font-semibold inline-block w-2/5 capitalize"><span v-html="detailData.key"></span></div>
                                            <div class="text-left ml-3 mb-4 inline-block w-2/5"><span v-html="detailData.value"></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="text-xs font-medium text-remGray-100 tracking-wide outline-none focus:outline-none mt-20" @click="readMore = false">
                        Zapri
                        <img class="inline ml-2" src="/svgs/uparrow.svg" />
                    </button>
                </div>
            </div>
        </div>
        <!-- Spodnji del pod projektom -->
        <div class="text-left w-full mt-10 mb-10">
            <div class="inner p-8 bg-white rounded">
                <div v-for="(comment, index) in projectData.comments" :key="index" class="flex mt-20 first:mt-4 mb-4" style="min-height: 100px">

                    <div class="logo pl-8">
                        <img v-if="comment.from != user.displayName" class="inline ml-2 object-cover w-16 h-16 mr-2 rounded-full" src="/svgs/logo.svg" />
                        <img v-else class="inline ml-2 object-cover w-16 h-16 mr-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />
                    </div>
                    <div class="ml-5">
                        <div class="flex tracking-wide text-base">
                            <div class="name font-semibold">
                                {{comment.from}}
                            </div>
                            <div class="date pl-2 text-remGray font-medium">
                                {{comment.timestamp}}
                            </div>
                        </div>
                        <div class="message col-span-2 mt-4">
                            <span style="white-space: pre;">{{comment.message}}</span>
                        </div>
                    </div>
                </div>

                <!-- Napiši sporočilo... -->
                <div class="mt-10">

                    <div class="textarea">
                        <textarea id="commentField" placeholder="Napiši sporočilo..."
                            class=" h-64 border placeholder-gray-500 w-full px-6 py-8 text-gray-700 rounded focus:outline-none focus:shadow-sm"
                            rows="4"></textarea>
                    </div>
                    <div class="bottom flex justify-end pb-8 absolute right-80 -mt-24 mr-4">
                        <div class="flex-1 justify-end  bg-grey-lighter mr-11">
                            <label class="flex tracking-wide  cursor-pointer py-2">
                                <img class="" src="/svgs/file.svg" />
                                <span class="ml-4 mt-1 text-base text-remGray font-semibold">Priloži datoteko</span>
                                <input type='file' class="hidden" />
                            </label>
                        </div>
                        <div class="button">
                            <button
                                @click="submitComment()" class="flex w-full outline-none focus:outline-none bg-remBlue hover:bg-remBlueHover text-sm text-white font-semibold tracking-wide py-4 px-12 rounded-full">
                                <span class="mr-4">Pošlji sporočilo</span>
                                    <img class="" src="/svgs/send.svg" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { fetchMixins } from "@/mixins/fetchMixins";
    import moment from 'moment'
    moment.locale('sl');

    export default {
        props: [],
        components: {},

        data() {
            return {
                projectData: {},
                readMore: false,
                currentShownCompontentIndex: 0,
                currentDetailData: []
            };
        },

        mixins: [fetchMixins],

        created() {
            this.getProjectData();
        },

        methods: {
            loadDetailData(){
                this.currentDetailData = [
                    [
                        {"key": "Ulica postavitve", "value": this.projectData.lokacijaObjekta.ulicaPostavitve},
                        {"key": "Postna stevilka", "value": this.projectData.lokacijaObjekta.postnaStevilka},
                        {"key": "kraj", "value": this.projectData.lokacijaObjekta.kraj},
                        {"key": "Država", "value": this.projectData.lokacijaObjekta.drzava},
                    ],
                    [
                        {"key": "sistemGradnje", "value": this.projectData.informacijeOObjektu.sistemGradnje},
                        {"key": "steviloModulov", "value": this.projectData.informacijeOObjektu.steviloModulov},
                        {"key": "risbaProjekta", "value": this.projectData.informacijeOObjektu.risbaProjekta},
                        {"key": "dodatnaPriponka", "value": this.projectData.informacijeOObjektu.dodatnaPriponka},
                    ],
                    [
                        {"key": "sneznaObremenitev", "value": this.projectData.okvir.sneznaObremenitev},
                        {"key": "vetrnaObremenitev", "value": this.projectData.okvir.vetrnaObremenitev},
                        {"key": "barvaOkvirja", "value": this.projectData.okvir.barvaOkvirja},
                        {"key": "vroceCinkanje", "value": this.projectData.okvir.vroceCinkanje},
                        {"key": "nalepkaNaOkvirju", "value": this.projectData.okvir.nalepkaNaOkvirju},
                        {"key": "odprtineZaVilicarja", "value": this.projectData.okvir.odprtineZaVilicarja},
                    ],
                    [
                        {"key": "toplotnaPrevodnost", "value": this.projectData.pod.toplotnaPrevodnost},
                        {"key": "tipIzolacije", "value": this.projectData.pod.tipIzolacije},
                        {"key": "nosilnaPlosca", "value": this.projectData.pod.nosilnaPlosca},
                        {"key": "nosilnaPloscaDrugo", "value": this.projectData.pod.nosilnaPloscaDrugo},
                        {"key": "nosilnostPoda", "value": this.JSONtoPrettyText(this.projectData.pod.nosilnostPoda)},
                        {"key": "talnaObloga", "value": this.JSONtoPrettyText(this.projectData.pod.talnaObloga)},
                        {"key": "dodatneOpombe", "value": this.projectData.pod.dodatneOpombe},
                    ],
                    [
                        {"key": "toplotnaPrevodnost", "value": this.projectData.zunanjeStene.toplotnaPrevodnost},
                        {"key": "tipIzolacije", "value": this.projectData.zunanjeStene.tipIzolacije},
                        {"key": "notranjeObdelaveSten", "value": this.JSONtoPrettyText(this.projectData.zunanjeStene.notranjeObdelaveSten)},
                        {"key": "zunanjaBarvaFasadnihPanelov", "value": this.projectData.zunanjeStene.zunanjaBarvaFasadnihPanelov},
                        {"key": "sekundarnaFasada", "value": this.projectData.zunanjeStene.sekundarnaFasada},
                        {"key": "sekundarnaFasadaText", "value": this.projectData.zunanjeStene.sekundarnaFasadaText},
                        {"key": "pozarneZahteve", "value": this.projectData.zunanjeStene.pozarneZahteve},
                        {"key": "dodatneOpombe", "value": this.projectData.zunanjeStene.dodatneOpombe},
                    ],
                    [
                        {"key": "predelnaStena", "value": this.JSONtoPrettyText(this.projectData.predelneStene.predelnaStena)},
                        {"key": "dodatneOpombe", "value": this.projectData.predelneStene.dodatneOpombe},
                    ],
                    [
                        {"key": "toplotnaPrevodnost", "value": this.projectData.strop.toplotnaPrevodnost},
                        {"key": "tipIzolacije", "value": this.projectData.strop.tipIzolacije},
                        {"key": "notranjaObdelavaStropa", "value": this.JSONtoPrettyText(this.projectData.strop.notranjaObdelavaStropa)},
                    ],
                    [
                        {"key": "atika", "value": this.projectData.streha.atika},
                        {"key": "tipAtike", "value": this.projectData.streha.tipAtike},
                        {"key": "sekundarnaStreha", "value": this.projectData.streha.sekundarnaStreha},
                        {"key": "tipSekundarneStrehe", "value": this.projectData.streha.tipSekundarneStrehe},
                        {"key": "podkonstrukcijaSekundarneStrehe", "value": this.projectData.streha.podkonstrukcijaSekundarneStrehe},
                        {"key": "nacrtStreheSPodkonstrukcijo", "value": this.projectData.streha.nacrtStreheSPodkonstrukcijo},
                    ],
                    [
                        {"key": "zunanjaVrata", "value": this.JSONtoPrettyText(this.projectData.oknaInZasteklitve.zunanjaVrata)},
                        {"key": "notranjaVrata", "value": this.JSONtoPrettyText(this.projectData.oknaInZasteklitve.notranjaVrata)},
                        {"key": "okna", "value": this.JSONtoPrettyText(this.projectData.oknaInZasteklitve.okna)},
                        {"key": "tipStekla", "value": this.projectData.oknaInZasteklitve.tipStekla},
                        {"key": "uVrednost", "value": this.projectData.oknaInZasteklitve.uVrednost},
                        {"key": "sencenje", "value": this.projectData.oknaInZasteklitve.sencenje},
                        {"key": "tipSencenja", "value": this.projectData.oknaInZasteklitve.tipSencenja},
                        {"key": "barvaSencil", "value": this.projectData.oknaInZasteklitve.barvaSencil},
                        {"key": "pogonSencenja", "value": this.projectData.oknaInZasteklitve.pogonSencenja},
                        {"key": "oznacenaRisba", "value": this.projectData.oknaInZasteklitve.oznacenaRisba},
                    ],
                    [
                        {"key": "standard", "value": this.projectData.elektricneInstalacije.standard},
                        {"key": "razporeditevElektricnihOmaric", "value": this.projectData.elektricneInstalacije.razporeditevElektricnihOmaric},
                        {"key": "svetila", "value": this.JSONtoPrettyText(this.projectData.elektricneInstalacije.svetila)},
                        {"key": "nacrtElektroInstalacij", "value": this.projectData.elektricneInstalacije.nacrtElektroInstalacij},
                        {"key": "dodatneOpombe", "value": this.projectData.elektricneInstalacije.dodatneOpombe},
                    ],
                    [
                        {"key": "izvedba", "value": this.projectData.vodovodneInstalacije.izvedba},
                        {"key": "tipSanitarnihElementov", "value": this.JSONtoPrettyText(this.projectData.vodovodneInstalacije.tipSanitarnihElementov)},
                        {"key": "nacrtVodovodnihInstalacij", "value": this.projectData.vodovodneInstalacije.nacrtVodovodnihInstalacij},
                    ],
                    [
                        {"key": "tipPrezracevanja", "value": this.projectData.ogrevanjeInHlajenje.tipPrezracevanja},
                        {"key": "tipOgrevanja", "value": this.projectData.ogrevanjeInHlajenje.tipOgrevanja},
                        {"key": "tipHlajenja", "value": this.projectData.ogrevanjeInHlajenje.tipHlajenja},
                        {"key": "lokalnoHlajenje", "value": this.projectData.ogrevanjeInHlajenje.lokalnoHlajenje},
                        {"key": "nacrtStrojnihInstalacij", "value": this.projectData.ogrevanjeInHlajenje.nacrtStrojnihInstalacij},
                    ],
                    [
                        {"key": "uradnaStatika", "value": this.projectData.dodatno.uradnaStatika},
                        {"key": "cetrifikatnaMapa", "value": this.projectData.dodatno.cetrifikatnaMapa},
                    ],                    
                ]
            },
            JSONtoPrettyText(input){
                input = JSON.stringify(input);
                input = input.replaceAll("[", "");
                input = input.replaceAll("]", "");
                input = input.replaceAll("\"", "");
                input = input.replaceAll("},{", "<br><br>");
                input = input.replaceAll("{", "");
                input = input.replaceAll("}", "");
                input = input.replaceAll(":", ": ");
                input = input.replaceAll(",", ", ");
                input = input.trim();

                return input;
            },
            getProjectData() {
                let projectID = this.$route.params.projektID;
                let projects = this.$store.getters.getProjects;
                let projectData = projects.find(project => project.id == projectID);

                this.projectData = projectData;
                this.loadDetailData();
                this.getProjectComments();
            },
            getProjectComments(){
                let projectID = this.$route.params.projektID;
                this.axios.get('http://'+process.env.VUE_APP_BASE_URL+'/api/mfiles/users/'+this.user.id+'/projects/'+projectID+'/comments').then((response) => {
                    this.projectData.comments = response.data.data;
                });

            },
            submitComment() {
                if (document.querySelector('#commentField').value.trim() == "") return;
                
                let comment = {
                    from: this.user.displayName,
                    timestamp: moment().format('Do MMMM YYYY'),
                    message: document.querySelector('#commentField').value
                }
                console.log(comment);

                let projectID = this.$route.params.projektID;
                let projects = this.$store.getters.getProjects;
                let projectIndex = projects.find(project => project.id == projectID);

                this.axios.post('http://'+process.env.VUE_APP_BASE_URL+'/api/mfiles/users/'+this.user.id+'/projects/'+projectID+'/comments', comment)
                .then((response) => {
                    console.log(response)
                    if(response.status == 200){
                        this.projectData.comments.push(comment);
                        projects[projectIndex] = this.projectData;
                        this.$store.commit('setPovprasevanja', projects);
                        document.querySelector('#commentField').value = "";
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
</style>