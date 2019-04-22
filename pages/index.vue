<template>

<div>

  <h1 class="titulo-home">Ferramentas do Sistema</h1>

  <ul class="container opcoes">

    <li class="item grid-4">
      <nuxt-link to="/courses">
        <span>Novo Curso</span>
        <i class="fa fa-plus" aria-hidden="true"></i>
      </nuxt-link>
    </li>

    <li class="item grid-4">
      <nuxt-link to="/categories">
        <span>Nova Categoria</span>
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      </nuxt-link>
    </li>

    <li class="item grid-4">
      <nuxt-link to="/courses">
        <span>Meus Cursos</span>
        <i class="fa fa-folder-open" aria-hidden="true"></i>
      </nuxt-link>
    </li>
    
  </ul>

</div>

</template>

<script>


export default {
  layout: 'page'
}
</script>

<style scoped>

  .titulo-home {
	text-align: center;
	padding: 30px 0;
}

.opcoes {
	background-color: #33363a;
	border-radius: 10px;
	padding: 30px 0px;
  margin-bottom: 130px;
}

.item {
	padding: 40px 10px;
	text-align: center;
}

.item a {
	color: #fff;
	font-size: 1.2em;
	font-weight: bolder;
	margin-bottom: 10px;
}

.item i {
	font-size: 2em;
  color: #000;
  display: block;
}


@media only screen and (max-width: 980px) {
    .grid-4 {
      width: calc(100% - 20px);
    }



}

</style>
