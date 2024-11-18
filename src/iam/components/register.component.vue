<script>
import changelangComponent from '../../public/components/changelang.component.vue';
import { AuthApiService } from "../services/auth.service";

export default {
  name: "register.component",
  components: { changelangComponent },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      speciality: '',
      dni: '',
      phone: '',
      errorMessage: null,
      api: new AuthApiService()
    }
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    register() {
      this.api.register(this.name, this.email, this.password, this.speciality, this.dni, this.phone)
        .then((response => {
          if (response.status == 201) {
            alert('Account created.')
            this.$router.push("/doctor/profile");
          }
          else
            alert('Account not created.')
        }))
        .catch((e => alert('Error: ', e)));
    }
  }
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
      <pv-image src="/img/gato.png" width="80%" class="w-1/2" />

      <div>
        <div class="flex flex-col items-center justify-center">
          <pv-image src="/img/ezvet.png" width="190px" />
          <h1 class="mt-8 mb-8 text-center" style="font-size: 50px">
            {{ $t('Access.Register') }}
          </h1>
        </div>

        <div class="flex flex-col gap-1">
          <label for="username" class="text-left">
            {{ $t('Access.Fullname') }}
          </label>
          <pv-inputtext id="username" class="custom-input cursor-text" v-model="name" type="text" size="small"
            placeholder="enter your username" />

          <label for="email" class="text-left">
            E-mail
          </label>
          <pv-inputtext type="email" id="email" class="custom-input cursor-text" v-model="email" size="small" toggleMask
            placeholder="enter your email" />

          <label for="dni" class="text-left">
            DNI
          </label>
          <pv-inputtext id="dni" class="custom-input cursor-text" v-model="dni" size="small" toggleMask
            placeholder="enter your email" />

          <label for="phone" class="text-left">
            {{ $t('Access.Phone') }}
          </label>
          <pv-inputtext id="phone" class="custom-input cursor-text" v-model="phone" size="small" toggleMask
            placeholder="enter your phone" />

          <label for="tuition" class="text-left">
            {{ $t('Access.Speciality') }}
          </label>
          <pv-inputtext type="text" id="tuition" class="custom-input cursor-text" v-model="speciality" size="small"
            toggleMask placeholder="enter your tuition" />

          <label for="password" class="text-left">
            {{ $t('Access.Password') }}
          </label>
          <pv-inputtext type="password" id="password" class="custom-input cursor-text" v-model="password" size="small"
            toggleMask placeholder="enter your password" />

          <pv-button class="mt-4 button" @click="register">
            {{ $t('Access.SignIn') }}
          </pv-button>

          <a class="underline cursor-pointer text-1xl" @click="goToLogin">{{ $t('Access.ToLogin') }}</a>
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
  color: black;
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