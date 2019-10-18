<template>
  <div>
    <form @submit.prevent>
      <div v-if="!isResetEmailSent">
        <h1 class="heading-1">Reset Password</h1>
        <p class="paragraph">
          We will send you an email to reset your password
        </p>

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
        <button @click="resetPassword" class="btn">Submit</button>
      </div>
      <div v-else>
        <hi class="heading-1">Email Sent</hi>
        <p class="paragraph">
          Check your email for a link to reset your password
        </p>
      </div>
    </form>
  </div>
</template>

<script>
const fb = require('../firebase.config.js')
export default {
  data() {
    return {
      email: '',
      errorMsg: '',
      isLoading: false,
      isResetEmailSent: false
    }
  },
  methods: {
    resetPassword() {
      this.isLoading = true

      fb.auth
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.isLoading = false
          this.isResetEmailSent = true
          this.email = ''
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
