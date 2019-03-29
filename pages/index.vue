<template>

<div>

  <h1 class="titulo-home">Ferramentas do Sistema</h1>

  <ul class="container opcoes">
    <li class="item grid-4">
      <nuxt-link to="/courses">Novo Curso</nuxt-link>
      <i class="fa fa-plus" aria-hidden="true"></i>
    </li>
    <li class="item grid-4">
      <nuxt-link to="/categories">Nova Categoria</nuxt-link>
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
    </li>
    <li class="item grid-4">
      <nuxt-link to="/courses">Meus Cursos</nuxt-link>
      <i class="fa fa-folder-open" aria-hidden="true"></i>
    </li>
  </ul>

</div>

</template>

<script>


export default {
  layout: 'page'
}
</script>

<style>

  .titulo-home {
	text-align: center;
	padding: 30px 0;
}

.opcoes {
	background-color: #33363a;
	border-radius: 10px;
	padding: 30px 0px;
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

.opcoes i {
	font-size: 2em;
}

</style>
