<template>
  <div class="block col-12 mt-5 row align-items-center">
    <div class="col-10">
      <p class="ml-4 my-2"> {{title}}</p>
    </div>
    <div class="col-2 iconContainer">
      <router-link :to=address class="link">
        <font-awesome-icon class="icon mr-3" icon="fa-solid fa-plus"></font-awesome-icon>
      </router-link>
      <button class="iconButton ml-3" v-on:click="contentHidden=!contentHidden, $emit('contentHidden', contentHidden)">
        <font-awesome-icon class="icon" icon="fa-solid fa-angle-down"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverBar',
  data () {
    return {
      contentHidden: false
    }
  },
  props: {
    title: String,
    address: String
  }
}
</script>

<style scoped>
  .block {
    background-color: #005b52;
    border-radius: 15px;
    box-shadow: 2px 2px 4px;
  }
  p, .icon{
    color: white;
    text-align: left;
    font-size: 1.7em;
    font-weight: bold;
  }
  .icon {
    font-size: 2.2em;
  }
  .iconContainer {
    text-align: right;
  }
  .iconButton {
    border: none;
    background-color: transparent;
    padding: 0;
  }
</style>
