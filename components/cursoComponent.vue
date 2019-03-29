<template>
  <ul class="container">
    <li class="grid-2 course" v-for="course of courses" :key="course.id">
        <nuxt-link :to="'/courses/watch/'+ course.id">
          <div class="box-name-course">
            <h1 class="name-course">{{ course.name }}</h1>
          </div>
          <div class="box-info-course">
            <p><span>Total de vídeos</span> {{ course.qtd_videos }}</p>
            <p><span>Concluído:</span> 56%</p>
          </div>
        </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    courses: ''
  }

}
</script>


<style scoped>

  .course {
    border-radius: 5px;
    -webkit-box-shadow: 0px 3px 13px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 3px 13px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 3px 13px 0px rgba(0,0,0,0.75);
    height: 210px;
  }


  .box-name-course {
    text-align: center;
    color: #000;
    padding: 4px 0;
    width: 100%;
    font-size: 0.9em;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
  }

  .box-info-course {
   padding: 40px 0 60px 0;
   text-align: center;
  }

  .box-info-course p span {
    font-size: 1.1em;
    font-weight: 600;

  }

  @media only screen and (max-width: 980px) {
    .grid-3 {
      width: calc(33% - 20px);
    }
  }

  @media only screen and (max-width: 650px) {
    .grid-3 {
      width: calc(100% - 20px);
    }
  }

</style>


