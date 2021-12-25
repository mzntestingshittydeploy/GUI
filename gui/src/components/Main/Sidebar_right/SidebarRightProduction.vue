<template>
  <div v-if="1">
    <div class="h3 mt-3">Production:</div>
    <div class="d-flex justify-content-between">
      <h5>
        <img style="width: 1.5rem;height: 1rem;" src="/images/resources/wood.gif" /> Wood:
      </h5>
      <h5>
       <strong>{{ 123 }}</strong> per hour
      </h5>
    </div>
  </div>
</template>

<script>

export default {
    data() {
        return {
        };
    },

    mixins: [],

    watch: {
    }
}
</script>
