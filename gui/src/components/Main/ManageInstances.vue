<template>
<div>

            <div class="borderShadowProject rounded-sm tracking-wide bg-white pt-4">
                <div class="text-center p-6 text-xl">
                    MZN instances
                </div>
                <div v-for="(mznFile, index) of mznFiles" :key="mznFile.fileUUID" class="flex px-20 py-4 justify-between border-t">
                    <div>
                        ID: {{index}}
                    </div>

                    <div style="min-width: 200px">
                        File: {{mznFile.fileName}}
                    </div>

                    <button @click="showFile(mznFile.fileUUID)" class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                        Show
                    </button>

                    <input type="file" :id="'mznUpdate' + index" @change="uploadFile('mzn', 'mznUpdate' + index, mznFile.fileUUID)" class="hidden">
                    <label :for="'mznUpdate' + index" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Update</label>
                    
                    <button @click="deleteFile(mznFile.fileUUID)" class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                        Delete
                    </button>
                </div>
                <div class="flex px-20 pb-4 pt-6 justify-center border-t">
                    <input type="file" id="mznUpload" @change="uploadFile('mzn', 'mznUpload')" class="hidden">
                    <label for="mznUpload" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Upload</label>
                </div>
            </div>

            <div class="borderShadowProject rounded-sm tracking-wide bg-white pt-4 mt-4">
                <div class="text-center p-6 text-xl">
                    DZN instances
                </div>
                <div v-for="(dznFile, index) of dznFiles" :key="dznFile.fileUUID" class="flex px-20 py-4 justify-between border-t">
                    <div>
                        ID: {{index}}
                    </div>

                    <div style="min-width: 200px">
                        File: {{dznFile.fileName}}
                    </div>

                    <button @click="showFile(dznFile.fileUUID)" class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                        Show
                    </button>

                    <input type="file" :id="'dznUpdate' + index" @change="uploadFile('dzn', 'dznUpdate' + index, dznFile.fileUUID)" class="hidden">
                    <label :for="'dznUpdate' + index" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Update</label>
                    
                    <button @click="deleteFile(dznFile.fileUUID)" class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                        Delete
                    </button>
                </div>
                <div class="flex px-20 pb-4 pt-6 justify-center border-t">
                    <input type="file" id="dznUpload" @change="uploadFile('dzn', 'dznUpload')" class="hidden">
                    <label for="dznUpload" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Upload</label>
                </div>
            </div>

</div>
</template>

<script>

export default {
    

    components: {

    },
    data() {
        return {
            mznFiles: [],
            dznFiles: [],
            user: null,
            jwt: null,
        };
    },

    created() {
        this.user = this.$store.getters.getUser;
        this.jwt = this.$store.getters.getJwt;
    },

    mounted() {
        this.refreshFiles();
    },

    watch: {

    },

    methods: {
        async refreshFiles() {
            let files = await (await fetch('http://'+window.localStorage.getItem('ip')+'/api/minizinc/' + this.user.id, {
                headers: {
                    Authorization: "Bearer " + this.jwt}
                })).json();
            this.mznFiles = [];
            this.dznFiles = [];
            for(let file of files){
                if (file.fileName.includes(".mzn"))         this.mznFiles.push(file);
                else if (file.fileName.includes(".dzn"))    this.dznFiles.push(file);
            }
        },
        async showFile(fileUUID){
            let fileUrl = await(await fetch('http://'+window.localStorage.getItem('ip')+'/api/minizinc/' + this.user.id + '/' + fileUUID, {
                headers: {
                    Authorization: "Bearer " + this.jwt
                }
            })).text();
            console.log(fileUrl);
            window.open(fileUrl.replace('"','').replace('"',''), '_blank');
        },
        async uploadFile(type, id, fileUUID){
            let googleFileData;
            if(fileUUID){
                googleFileData = await (await fetch(`http://'+window.localStorage.getItem('ip')+'/api/minizinc/upload?userID=${this.user.id}&fileUUID=${fileUUID}`, {
                headers: {
                    Authorization: "Bearer " + this.jwt}
                })).json();
            }
            else{
                googleFileData = await (await fetch('http://'+window.localStorage.getItem('ip')+'/api/minizinc/upload', {
                headers: {
                    Authorization: "Bearer " + this.jwt}
                })).json();
            }
            let formData = new FormData();
            let file = document.querySelector('#' + id);
            if(!file.files[0]) {alert("No file"); return;}
            let filename = file.files[0].name;

            if(type === "mzn" && !file.files[0].name.includes(".mzn")){ alert("Not a mzn file"); return; }
            else if(type === "dzn" && !file.files[0].name.includes(".dzn")){ alert("Not a dzn file"); return; }

            formData.append('file', file.files[0]);
            //file.value = "";

            this.axios.put(googleFileData.url, file.files[0], {
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            .then(axiosRes => {
                console.log("google storage response: ");
                console.log(axiosRes);

                this.axios.post('http://'+window.localStorage.getItem('ip')+'/api/minizinc/upload', {userID: this.user.id, fileName: filename, fileUUID: googleFileData.fileUUID}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + this.jwt
                    }
                })
                .then(axiosRes => {
                    let axiosJson = axiosRes.data;
                    console.log(axiosJson);
                    this.refreshFiles();
                })
                .catch(axiosErr => {
                    console.log("Axios error: " + axiosErr);
                    alert("Axios error: " + axiosErr);
                });

            })
            .catch(axiosErr => {
                console.log("Axios error: " + axiosErr);
                alert("Axios error: " + axiosErr);
            });

        },
        async deleteFile(fileUUID){
            console.log(fileUUID);
            let response = await fetch('http://'+window.localStorage.getItem('ip')+'/api/minizinc/' + this.user.id + '/' + fileUUID, {
                method: "DELETE",
                headers: {
                        'Authorization': "Bearer " + this.jwt
                    }
                });
            console.log(response);
            this.refreshFiles();
        },
    }
}
</script>

<style scoped>
.borderShadowProject{
    filter: drop-shadow(0px 6px 18px rgba(0, 0, 0, 0.06));
}
.marginBottom{
    margin-bottom:1px;
}

textarea{
    padding: 1rem;
}

input[type=text]{
    padding: 0.5rem;
}

.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
