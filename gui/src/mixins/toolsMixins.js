export const toolsMixins = {

    methods: {
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return false;
        },
        //checkIfLoggedIn(redirectf){
        checkIfLoggedIn(){
            return true;
/*             if(this.jwt){
                if(this.$route.name == "login" || this.$route.name == "register"){
                    if(redirectf) this.$router.push({ name: 'resources' });
                }
                return true;
            }
            else {
                if(this.$route.name != "login" && this.$route.name != "register"){
                    if(redirectf) this.$router.push({ name: 'MainLogin' });
                } 
                return false;
            } */
        },
        async doApiRequest(path, method, data, jsonf) {
            let response;
            console.log('/api/' + path);
            if (jsonf){
                response = await fetch('/api/' + path, {
                    method: method,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            } else {
                response = await fetch('/api/' + path, { method: method, credentials: 'include' });
            }
            return response;
        },
        async getUser(userId){
            return await(await(await this.doApiRequest("users/" + userId, "GET", "", false)).json()).data;
        },
        /* updateCurrentFormValue(key, value){
            this.currentFormValue[key] = value;
            this.$emit('projectDataUpdate', 'zunanjeStene', this.currentFormValue);
        },
        updateCurrentFormValueRepeater(key, index, innerKey, value){
            this.$set(this.currentFormValue[key][index], innerKey, value);
            this.$emit('projectDataUpdate', 'zunanjeStene', this.currentFormValue);
        } */
    }
}