<template>
  <header>
    <section>
      <div class="navigation">
        <router-link to="dashboard">
          <h3>MakeNote</h3>
        </router-link>
        <ul>
          <li>
            <router-link to="dashboard">Dashboard</router-link>
          </li>
          <li>
            <router-link to="tasks">Tasks</router-link>
          </li>
          <li>
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
const fb = require('../firebase.config.js')

export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/auth')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  position: relative;
  background: #ffffff;
  box-shadow: 0 0 0.5rem 0 rgba(#000000, 0.5);
  z-index: 10;
}
.navigation {
  flex-grow: 1;
  flex-basis: 0;
  padding: 1.6rem;

  h3 {
    display: inline-block;
    margin: 0;
  }
  ul {
    display: flex;
    float: right;
    margin: 0;

    li {
      list-style: none;
      display: inline-block;
      // margin-top: 4px;
      margin-left: 0.6rem;

      a {
        display: block;
        font-size: 1.5rem;
        padding-left: 0.5rem;
      }
    }
  }
}
</style>
