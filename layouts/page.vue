<template>
  <div class="page">

    <nav-bar-component></nav-bar-component>


    <nuxt/>


    <footer-component></footer-component>

  </div>
</template>



<script>
import navBarComponent from '~/components/navBarComponent'
import footerComponent from '~/components/footerComponent'

export default {
  components: {
    navBarComponent,
    footerComponent

  }
}
</script>



<style scoped>

</style>


