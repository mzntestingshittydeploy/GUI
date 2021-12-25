import { toolsMixins } from './toolsMixins'

export const fetchMixins = {
    data() {
        return {
            mfilesID:               this.$store.getters.getMfilesID,
            jwt:                    this.$store.getters.getJwt,
            user:                   this.$store.getters.getUser,
            config: {},
        };
    },

    created() {
        this.infoLookup();
        this.loadConfiguration();
    },

    mixins: [toolsMixins],

    watch: {
        '$store.getters.getMfilesID':          function() { this.mfilesID = this.$store.getters.getMfilesID; },
        '$store.getters.getJwt':               function() { this.jwt = this.$store.getters.getJwt; },
        '$store.getters.getUser':              function() { this.user = this.$store.getters.getUser; },
    },

    methods: {
        loadConfiguration(){
            this.config = require('@/config.json');
        },
        infoLookup(){
        },
    }
  }