<script>
import { AuthApiService } from "../services/auth.service";
import changelangComponent from "../../public/components/changelang.component.vue";

export default {
  name: "login.vue",
  components: { changelangComponent },
  data() {
    return {
      users: null,
      email: '',
      password: '',
      errorMessage: null,
      api: new AuthApiService()
    }
  },
  methods: {
    goToRegister() {
      this.$router.push('/register');
    },
    login() {

      if (!this.email || !this.password) {
        this.errorMessage = "Please, enter your username and password";
        return;
      }

      console.log(this.email + " " + this.password);
      this.api.login(this.email, this.password)
        .then((response) => {
          const data = response.data;

          if (data.length > 0) {
            alert('Login successful.')
            if (data[0].type === 'client')
              this.$router.push('/client/profile');
            else
              this.$router.push('/doctor/profile');
          }
          else
            this.errorMessage = "username or password is incorrect";
        })
        .catch((error) => {
          this.errorMessage = "problem with the authentication" + error.message;
        });
    }
  },


}
</script>

<template>
  <pv-toolbar class="w-full fixed top-0 left-0 flex items-center justify-between p-4">
    <template #end>

      <changelangComponent></changelangComponent>
    </template>
  </pv-toolbar>
  <div>
    <div class="flex gap-24 items-center">
      <pv-image src="img/gato.png" width="80%" class="w-1/2"></pv-image>
      <div>
        <div class="flex flex-col items-center justify-center">
          <pv-image src="img/ezvet.png" width="190px"></pv-image>
          <h1 class="mt-8 mb-8 text-center" style="font-size: 50px">{{ $t('Access.Login') }}</h1>
        </div>
        <div class="flex flex-col gap-3">
          <label for="username" class="text-left">{{ $t('Access.Username') }}</label>
          <pv-inputtext id="username" class="custom-input" v-model="email" type="text" size="small"
            placeholder="enter your email" />

          <label for="password" class="text-left">{{ $t('Access.Password') }}</label>
          <pv-inputtext type="password" id="password" class="custom-input" v-model="password" size="small" toggleMask
            placeholder="enter your password" />

          <!-- Mostrar mensaje de error si lo hay -->
          <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>

          <pv-button class="mt-4 button" @click="login">{{ $t('Access.Login') }}</pv-button>
          <a class="underline cursor-pointer text-1xl" @click="goToRegister">{{ $t('Access.ToRegister') }}</a>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.custom-input {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #B9B9D2;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  color: mediumpurple;
}


.button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #00BFB2;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  color: white;
}

.button:hover {
  background-color: #B9B9D2;
  color: black;
  border-color: #2C3E50;


}
</style>

<style></style>