<template>
    <div v-if="quota != null">
    <ul class="list-disc">
        <li class="my-2">
            Memory: <span class="font-bold">{{ quota.memory }}</span> MB
        </li>
        <li class="my-2">
            vCPUs: <span class="font-bold">{{ quota.vCpu }}</span> vCPUs
        </li>
    </ul>
    </div>
</template>


<script>

export default {
    props: ['quota']
}

</script>