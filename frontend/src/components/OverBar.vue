<template>
  <div class="block col-12 my-5 m-4">
    <p class="ml-4 my-2"> {{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'OverBar',
  props: {
    title: String
  }
}
</script>

<style scoped>
  .block {
    background-color: #005b52;
    border-radius: 15px;
    box-shadow: 2px 2px 4px;
  }
  p {
    color: white;
    text-align: left;
    font-size: 1.7em;
    font-weight: bold;
  }
</style>
