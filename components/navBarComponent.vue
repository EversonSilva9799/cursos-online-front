<template>
  <header class="cabecalho">
    <div class="container">
      <div class="grid-4">
        <nuxt-link class="logo" to="/">PRO - Cursos</nuxt-link>
      </div>
      <div class="grid-8">
        <nav class="navbar">
          <ul>
            <li><nuxt-link  to="/categories">Categorias</nuxt-link></li>
            <li><nuxt-link  to="/courses">Meus Cursos</nuxt-link></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style scoped>
  .cabecalho {
	background-color: #4286f4;
	padding: 20px 0;
}

.logo {
	font-size: 2.2em;
	color: #fff;
}

.navbar ul li {
	display: inline-block;
	font-size: 1.4em;
	float: right;
}



.navbar ul li a {
	color: #fff;
	padding: 10px 0 0 18px;

}

.navbar ul li a:hover {
	text-decoration: underline;
}


</style>



