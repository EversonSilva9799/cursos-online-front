<template>

  <div class="grid-12">
    <div>
      <h2 class="title">Adicione comentários sobre está aula</h2>
      <form action="" method="post" class="form" @submit.prevent="registerNewComment">
        <input type="text" name="title" placeholder="Título para a postagem. EX: Encapsulamento na orientação a objetos" v-model="title">
        <textarea name="comment" id="comment" cols="30" rows="10" v-model="content"></textarea>
        <button>Comentar</button>
      </form> <!-- Formulário para o usuario cadastrar um novo comentário -->
    </div>
  </div>

</template>


<script>
export default {
  props: {
    video_id: null
  },

  data() {
    return {
      title: null,
      content: null
    }
  },

  methods: {

    async registerNewComment() {
      try {

        const res = await this.$axios.post('videos/comments', {
        'title': this.title,
        'content': this.content,
        'video_id': this.video_id
        });
        this.title = '';
        this.content = '';
        this.$emit('newcomments');

      } catch (error) {
        console.log(error);
      }

    }
  }
}
</script>


<style scoped>

  .title {
    margin-top: 90px;
    font-size: 1.6em;
    font-family: 'Times New Roman', Times, serif;
    text-align: center;
  }

  .form {
    width: 700px;
    max-width: 100%;
    margin: 0 auto;
    margin-top: 50px;
  }

  .form input {
    width: 100%;
    max-width: 100%;
    height: 37px;
    border: 2px solid rgb(170, 168, 168);
    border-radius: 3px;
    margin-bottom: 15px;
  }

  .form textarea {
    width: 100%;
    max-width: 100%;
    border: 2px solid rgb(170, 168, 168);
    border-radius: 3px;
  }

  .form button {
    background-color: #33363a;
    height: 37px;
    width: 120px;
    border-radius: 3px;
    color: #fff;
    font-size: 1.2em;
    border: none;
    cursor: pointer;
  }

</style>


