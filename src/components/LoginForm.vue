<template>
  <div id="loginForm">
    <form @submit.prevent>
      <h1 class="heading-1">Welcome Back</h1>

      <div class="input__group">
        <label for="email" class="input__label">Email</label>
        <input
          v-model.trim="email"
          type="email"
          placeholder="your@email.com"
          id="email"
          class="input__textbox"
        />
      </div>

      <div class="input_group">
        <label for="password" class="input__label">Password</label>
        <input
          v-model.trim="password"
          type="password"
          placeholder="********"
          id="password"
          class="input__textbox"
        />
      </div>
      <button @click="login" class="btn">Log In</button>
    </form>
  </div>
</template>

<script>
const fb = require('../firebase.config.js')
export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: '',
      errorMsg: ''
    }
  },
  methods: {
    login() {
      this.isLoading = true

      fb.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.commit('setCurrentUser', user.user)
          this.$store.dispatch('fetchUserProfile')
          this.isLoading = false
          this.$router.push('/dashboard')
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
          this.errorMsg = err.message
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
