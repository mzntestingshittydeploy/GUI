<template>
    <div v-if="0">
        <div class="h3 my-3 text-center" >Upgrades:</div>        
        <div class="d-flex justify-content-between">
            <h5><img style="width: 1.0rem;height: 0.9rem;cursor: pointer;" src="/images/del.gif">
                (Level 1)
            </h5>
            <h5 class="text-center">
                in <span id="upgradeCD1">321</span>
            </h5>
            <h5 class="text-right">
                done at 123
            </h5>
        </div>
    </div>
</template>

<script>
import { fetchMixins } from '@/mixins/fetchMixins'
import { toolsMixins } from '@/mixins/toolsMixins'


export default {
    data() {
        return {
        };
    },

    mixins: [fetchMixins,toolsMixins],

    created() {
    },
    watch: {
    },
    methods: {
    }
    
}
</script>