<template>
  <div>
    <section class="create-course">
      <h1 class="title-page">Meus Cursos</h1>

      <form  action="" @submit.prevent="registerCourse" method="post" class="form-create-course">
          <input type="text" name="name" id="course" placeholder="Curso" v-model="form.name">
          <textarea class="description" name="description" placeholder="Informe uma descrição para o curso" v-model="form.description"></textarea>
          <select name="" class="categories" v-model="form.category_id">
            <option disabled selected value="">Selecionar Categoria</option>
            <option v-for="category of categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
          <button name="acao">Criar</button>
      </form>
    </section>

    <section class="courses-category" >
          <cursoComponent :courses="courses"></cursoComponent>
     </section>   <!--- Lista de cursos aqui -->
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
      courses: [],
      categories: [],
      form: {
        name: '',
        description: '',
        category_id: ''
      }
    }
  },

  created() {
    this.index();
    this.getCategories();
  },

  methods: {

    async index() {
      try {

        const res = await this.$axios.get('courses')
        this.courses = res.data;

      } catch (error) {
        console.log(error);
      }
    },

    async getCategories() {
      try {
        const res = await this.$axios.get('categories');
        this.categories = res.data;

      } catch (error) {
        console.log(error);
      }


    },

    async registerCourse() {
      try {
        const res = await this.$axios.post('courses', this.form)
        this.index();

        this.form.name = '';
        this.form.description = '';
        this.form.category_id = '';

      } catch(error) {
        console.log(error);
      }
    }

  }
}
</script>


<style scoped>

  .form-create-course {
	max-width: 100%;
	margin: 0 auto;
}

.form-create-course input {
	display: block;
	margin: 0 auto;
	max-width: 100%;
	width: 600px;
	height: 35px;
	padding-left: 10px;
	border: 2px solid rgba(0,0,0,0.3);
	margin-bottom: 10px;
}

.form-create-course textarea {
	display:  block;
	margin: 0 auto;
	width: 600px;
	max-width: 100%;
	height: 90px;
	padding-left: 10px;
	border: 2px solid rgba(0,0,0,0.3);
	margin-bottom: 10px;
}

.form-create-course .categories {
  width: 600px;
	max-width: 100%;
	height: 35px;
  display:  block;
	margin: 0 auto;
}


.form-create-course button {
	display:  block;
	margin: 20px auto 20px;
	font-size: 1.1em;
	width: 140px;
	height: 35px;
	background-color: #33363a;
	color: #fff;
	border: 1px solid #000;
	cursor: pointer;
}



  .title-page {
    text-align: center;
    margin: 40px 0 40px 0;
  }

  .courses-category {
    padding: 60px 0 60px 0;
  }

        .course {
          background: #d5dbe5;
          cursor: pointer;
          -webkit-box-shadow: 0px 3px 14px 0px rgba(0,0,0,0.75);
          -moz-box-shadow: 0px 3px 14px 0px rgba(0,0,0,0.75);
          box-shadow: 0px 3px 14px 0px rgba(0,0,0,0.75);
          border-radius: 8px;
          margin-bottom: 20px;
          height: 190px;
        }


        .box-name-course {
          width: 100%;
          background: #37404f;
          padding: 10px 0 10px 0;
          color: white;
          text-align: center;
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

