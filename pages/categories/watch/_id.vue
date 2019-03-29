<template>
  <div>

    <h1 class="name-category">{{ nameCategory }}</h1>

    <section class="courses-category" >
      <cursoComponent :courses="courses"></cursoComponent>
    </section>

  </div>
</template>

<script>
import cursoComponent from '~/components/cursoComponent';

export default {
  layout: 'page',

  components: {
    cursoComponent
  },

  data() {
    return {

      error: false,
      url: null,
      nameCategory: null,
      courses: []
    }
  },

  created() {
    this.url = parseInt(this.$route.params.id),
    this.show();
  },

  methods: {

    async show() {
      try {
        const res = await this.$axios.get('http://127.0.0.1:3333/categories/' + this.url);
        this.nameCategory = res.data.name;
        this.courses = res.data.courses;


      } catch (error) {
        this.error = true;

      }
    }
  }

}
</script>

<style scoped>
  .name-category {
    text-align: center;
    margin: 40px 0 40px 0;
  }

  
</style>


