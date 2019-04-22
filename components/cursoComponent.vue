<template>
  <ul class="container">
    <li class="grid-1-5 course" v-for="course of courses" :key="course.id">
        <nuxt-link :to="'/courses/watch/'+ course.id">

          <div class="box-img">
            <img src="https://www.portalgsti.com.br/media/uploads/andrerodrigues/laravel-1.jpg" alt="curso de">
          </div>
          <div class="box-info-course">
            <h1 class="name-course">{{ course.name}}</h1>
            <p>Criado em: {{ course.created_at | formatDate }}</p>
            <p><span>Total de vídeos</span> {{ course.qtd_videos }}</p>
            <p><span>Concluído:</span> {{ conclusionPercentage(course.complete_videos, course.qtd_videos)}}%</p>
            <span v-if="verificaCursoConcluido(course.complete_videos, course.qtd_videos)"
             class="info-concluido">Concluído <span>{{ course.updated_at | formatDate }}</span> </span>
          </div>

        </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {


  props: {
    courses: {},
  },

  filters: {

    formatDate(date) {
      let corte = date.indexOf(' ');
      date = date.substr(0, corte);
      let split = date.split("-");

      return split[2] +'/'+ split[1] + '/' + split[0];

    }

  },


  methods: {

    /**
     * Calcula a porcentagem de conclusão do curso.
     */
    conclusionPercentage(completed, total) {

      if (total == 0) {
        return 0
      }

      let valor = (completed/total) * 100
      return Math.round(valor)
    },

    /**
     * Verifica se um curso foi concluído
     */
    verificaCursoConcluido(complete, total) {
      const completed = this.conclusionPercentage(complete, total) === 100? true : false;
      return completed;

    }
  }

}
</script>


<style scoped>

  .course {
    position: relative;
    border-radius: 3px;
    -webkit-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.75);
    height: 300px;
    margin-bottom: 15px;
  }


  .box-img {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    height: 140px;
  }

  .box-img img {
    height: 100%;
    margin: 0 auto;
  }

  .box-info-course {
    padding: 20px 0 30px 0;
    text-align: center;
    color: #000;
    font-size: 1em;
  }

  .name-course {
    font-size: 1.2em;
    font-weight: 500;
  }

  .info-concluido {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: rgb(104, 245, 10);
    font-size: 1.4em;
  }

  @media only screen and (max-width: 1180px) {
    .grid-1-5 {
      width: calc(25% - 20px);
    }
  }

  @media only screen and (max-width: 980px) {
   .grid-1-5 {
      width: calc(33% - 20px);
    }
  }

  @media only screen and (max-width: 750px) {
    .grid-1-5  {
      width: calc(50% - 20px);
    }
  }

  @media only screen and (max-width: 500px) {
    .grid-1-5  {
      width: calc(100% - 20px);
    }
  }

</style>


