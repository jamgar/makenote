<template>
  <div id="auth" class="card form form--center">
    <LoginForm v-if="isLogin" />
    <SignUpForm v-if="isRegister" />
    <ForgotPassword v-if="isPasswordReset" />

    <div class="authExtras">
      <a v-if="!isLogin" @click="toggleForm('login')">Back to Login</a>
      <a v-if="!isPasswordReset" @click="toggleForm('passwordReset')"
        >Forgot Password</a
      >
      <a v-if="!isRegister" @click="toggleForm('register')"
        >Create an Account</a
      >
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import ForgotPassword from '@/components/ForgotPassword.vue'

export default {
  components: {
    LoginForm,
    SignUpForm,
    ForgotPassword
  },
  data() {
    return {
      isLogin: true,
      isPasswordReset: false,
      isRegister: false
    }
  },
  methods: {
    toggleForm(form) {
      if (form == 'passwordReset') {
        this.isLogin = false
        this.isPasswordReset = true
        this.isRegister = false
      } else if (form == 'register') {
        this.isLogin = false
        this.isPasswordReset = false
        this.isRegister = true
      } else {
        this.isLogin = true
        this.isPasswordReset = false
        this.isRegister = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
