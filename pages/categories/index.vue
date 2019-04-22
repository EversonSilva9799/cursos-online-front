<template>

  <div class="container">
    <h1 class="titulo-categoria">Categorias</h1>

    <div class="grid-12">
      <form  action="" @submit.prevent="registerCategory" method="post" class="form-create-categoria">
        <!-- <label for="categoria">Categoria</label> -->
        <input type="text" name="name" id="categoria" placeholder="Categoria" v-model="name">
        <textarea class="description" name="description" placeholder="Informe uma descrição para a categoria" v-model="description"></textarea>
        <button name="acao">Criar</button>
      </form>

    </div>

    <div class="grid-12">
      <aside class="categorias-cadastradas">
        <h1>Minhas Categorias</h1>
        <table class="categorias-cadastradas">
          <tr>
            <th>Categoria</th>
            <th>Cursos</th>
          </tr>

          <tr v-for="category of categories" :key="category.id">
            <td><nuxt-link :to="'/categories/watch/' + category.id">{{ category.name }}</nuxt-link></td>
             <td>{{ category.qtd_courses }}</td>
          </tr>


        </table>
      </aside>
    </div>

  </div>
</template>

<script>
export default {
  layout: 'page',

  data() {
    return {
      categories: [],
      name: null,
      description: null,

    }
  },

  created() {
    this.index()
  },

  methods: {
    async index() {
      try {

        const res = await this.$axios.get('categories')
        this.categories = res.data;


      } catch (error) {
        console.log(error);
      }
    },

    async registerCategory() {
      try {
        const res = await this.$axios.post('categories', {"name": this.name, "description": this.descrption })
        this.name = '';
        this.description = '';
        this.index();

      } catch(error) {
        console.log(error);
      }
    }
  }
}
</script>


<style scoped>
  .titulo-categoria {
	text-align: center;
	padding: 60px 0 30px 0;
}

.form-create-categoria {
	max-width: 100%;
	margin: 0 auto;
}

.form-create-categoria input {
	display: block;
	margin: 0 auto;
	max-width: 100%;
	width: 600px;
	height: 35px;
	padding-left: 10px;
	border: 2px solid rgba(0,0,0,0.3);
	margin-bottom: 10px;
}

.form-create-categoria textarea {
	display:  block;
	margin: 0 auto;
	width: 600px;
	max-width: 100%;
	height: 90px;
	padding-left: 10px;
	border: 2px solid rgba(0,0,0,0.3);
	margin-bottom: 10px;
}


.form-create-categoria button {
	display:  block;
	margin: 0 auto;
	margin-bottom: 20px;
	font-size: 1.1em;
	width: 140px;
	height: 35px;
	background-color: #33363a;
	color: #fff;
	border: 1px solid #000;
	cursor: pointer;
}

.categorias-cadastradas h1 {
	margin-bottom: 20px;
	text-align: left;
}

.categorias-cadastradas {
	font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
 	border-collapse: collapse;
  	width: 100%;
  	max-width: 100%;
  	margin-bottom: 20px;
}

.categorias-cadastradas th, .categorias-cadastradas td {
	padding: 15px;
}

.categorias-cadastradas tr:nth-child(even){
	background-color: #f2f2f2;
}

.categorias-cadastradas tr:hover {background-color: #ddd;}

.categorias-cadastradas th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #33363a;
  color: white;

}

</style>


