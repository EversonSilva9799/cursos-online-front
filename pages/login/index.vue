<template>
  <div class="login">
    <h1>Login</h1>
    <p class="error" v-if="error">Email ou senha Inválidos</p>
    <form action="" @submit.prevent="login">
      <input type="email" name="username" placeholder="E-mail" v-model="form.email">
      <input type="password" name="password" placeholder="Senha" v-model="form.password">

      <button type="submit" >{{ btnText }}</button>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      btnText: 'Login',
      form: {
        email: null,
        password: null
      }
    }
  },

  methods: {
    async login() {
      try {
        this.btnText = "Aguarde..."
        const res = await this.$axios.post('http://127.0.0.1:3333/sessions', this.form);
        Cookie.set('jwt', res.data.token);
        this.$router.push('/admin');
      } catch (error) {
        this.error = true;
        //console.log(error);
      }
      finally {
        this.btnText = "Login";
      }
    }
  }
}
</script>


<style scoped>

  .login {
    width: 600px;
    max-width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .error {
    color: red;
  }

  h1 {
    margin: 30px 0 30px 0;
    text-align: center;
  }

  input {
  display: block;
  margin: 0 auto;
  width: 500px;
	max-width: calc(100% - 20px);
	height: 35px;
	padding-left: 10px;
	border: 2px solid rgba(0,0,0,0.3);
	margin-bottom: 20px;

  }

  button {
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
</style>


