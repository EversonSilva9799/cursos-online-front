<template>
  <header class="cabecalho">
    <div class="container">
      <div class="grid-4">
        <nuxt-link class="logo" to="/">Cursos Online</nuxt-link>
      </div>
      <div class="grid-8">
        <span @click="btnMenu($event)" class="menu-mobile-btn"></span>
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


  methods: {
    btnMenu(event) {
      event.target.classList.toggle('active');
      document.getElementsByClassName('navbar')[0].classList.toggle('mobile-menu');
      document.getElementsByClassName('navbar')[0].classList.toggle('active');

    }
  }

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



.menu-mobile-btn {
  display: block;
  color: #fff;
  width: 36px;
  height: 36px;
  margin: 20px 20px 0 0;
  border-top: 4px solid;
  position: relative;
  float: right;
  bottom: 3px;
  cursor: pointer;
  /* -webkit-backface-visibility: hidden; */
  display: none;
}

.menu-mobile-btn::after, .menu-mobile-btn::before {
  content: '';
  display: block;
  margin-top: 6px;
  height: 4px;
  background: currentColor;
  position: relative;
  transition: transform .2s ease;

}

.menu-mobile-btn.active {
  border-top-color: transparent;
}

.menu-mobile-btn.active::after {
  margin-top: 0px;
  top: 2px;
  transform: rotate(45deg);
}

.menu-mobile-btn.active::before {
  margin-top: 0px;
  top: 6px;
  transform: rotate(135deg);
}

.navbar.mobile-menu {
  background: #4286f4;
  padding: 10px;
  position: absolute;
  z-index: 10;
  margin-top: 75px;
  right: 0;
  left: 0;
  display: none;
  transform: translate3d(60px, 0px, 0px);
  transition: 0.8s;

}

.navbar.mobile-menu.active {
    display: block;
    transform: translate3d(0px, 0px, 0px);
}

.navbar.mobile-menu li {
  margin-bottom: 10px;
  width: 100%;
  max-width: 100%;
  border-bottom: 2px solid #fff;

}

@media only screen and (max-width: 750px) {

  .logo {
    font-size: 1.6em;
  }

  .navbar {
    display: none;
  }

  .menu-mobile-btn {
    display: block;
  }
}

</style>



