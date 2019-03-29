<template>
  <div class="admin">
    <nav>
      <ul>
        <li><nuxt-link to="/admin/categories">Categorias</nuxt-link></li>
        <li><nuxt-link to="/admin/courses">Cursos</nuxt-link></li>
        <li><nuxt-link to="#">Logout</nuxt-link></li>
      </ul>
    </nav>


      <main>
        <nuxt/>
      </main>
  </div>
</template>

<style scoped>
   nav {
    background: #fff;
    width: 300px;
    height: 100vh;
    position: fixed;
    top: 0;
    border-right: 1px solid #667184;
  }

  li {
    border-bottom: 1px solid #667184;
  }

  a {
    padding: 20px;
  }

  main {
    margin-left: 300px;
  }
</style>

