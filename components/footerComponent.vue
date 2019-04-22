<template>


    <footer class="footer">
    <div class="container">
      <div class="grid-6">
        <p class="copy">Todos os direitos reservados para Everson Silva - Produzido por Everson Silva - 2019</p>
      </div>
      <div class="grid-6">
          <p class="frase">Sistema de cursos online</p>
      </div>
    </div>
    </footer>


</template>



<script>
export default {

}
</script>



<style scoped>
  .footer {
    background-color: #4286f4;
    margin-top: 30px;
    padding: 40px 0 10px 0;
  }

  .footer .copy {
    font-size: 1.2em;
    color:  #fff;
    margin-bottom: 22px;
  }

  .footer .frase {
    font-size: 1.2em;
    color:  #fff;
    float: right;
  }

  @media only screen and (max-width: 750px) {

    .grid-6 {
      width: calc(100% - 20px);
    }

    .footer .copy {
      text-align: center;
    }

    .footer .frase {
      font-size: 1.5em;

    }


  }

</style>


