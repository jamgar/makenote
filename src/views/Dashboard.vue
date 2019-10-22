<template>
  <div>
    <h3>Dashboard</h3>
    <Notes />
    <Tasks />
  </div>
</template>

<script>
import Notes from '@/views/Notes.vue'
import Tasks from '@/views/Tasks.vue'

export default {
  name: 'Dashboard',
  components: {
    Notes,
    Tasks
  }
}
</script>

<style lang="scss" scoped></style>
