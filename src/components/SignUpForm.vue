<template>
  <div class="signUpForm">
    <form @submit.prevent>
      <h1 class="heading-1">Get Started</h1>

      <div class="input__group">
        <label for="name" class="input__label">Full Name</label>
        <input
          v-model.trim="name"
          type="text"
          placeholder="Enter Name"
          id="name"
          class="input__textbox"
        />
      </div>

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
      <button @click="signup" class="btn">Sign Up</button>
    </form>
  </div>
</template>

<script>
const fb = require('../firebase.config.js')

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      isLoading: false,
      errorMsg: ''
    }
  },
  methods: {
    signup() {
      this.isLoading = true

      fb.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.commit('setCurrentUser', user.user)

          // create user object
          fb.usersCollection
            .doc(user.user.uid)
            .set({
              name: this.name
            })
            .then(() => {
              this.$store.dispatch('fetchUserProfile')
              this.isLoading = false
              this.$router.push('/dashboard')
            })
            .catch(err => {
              console.log(err)
              this.isLoading = false
              this.errorMsg = err.message
            })
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
