<template>
<div class="list-comments grid-8">


  <div class="box-comment" v-for="comment of comments" :key="comment.id">
    <h2 class="title">{{ comment.title }}</h2>
    <span class="date-comment">{{ comment.created_at }}</span>
    <p class="content" >{{ comment.content }}</p>
  </div>



</div>
</template>


<script>
export default {
  props: {

    comments: {
      type: Array,
      required: true
    }

  },



}
</script>


<style scoped>

  .list-comments {
    padding-top: 60px;
  }

  .box-comment {
    margin-bottom: 20px;
  }

  .date-comment {
    font-size: 1em !important;
    margin-bottom: 22px;
    display: block;
  }

  .title {
    color: rgb(124, 125, 127);
    font-size: 1.8em;
    font-family: Arial, Helvetica, sans-serif;

  }

  .content {
    max-width: 100%;
    border-bottom: 2px solid #4286f4;
    padding-bottom: 15px;
    font-size: 1.1em;
    line-height: 1.4em;
  }

</style>


