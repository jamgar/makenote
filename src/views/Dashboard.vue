<template>
  <div>
    <div class="dashboard__container">
      <Notes class="notes" />
      <Tasks class="tasks" />
    </div>
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

<style lang="scss" scoped>
.dashboard__container {
  display: flex;
  width: 100%;
}
.notes {
  min-width: 75%;
}
.tasks {
  min-width: 25%;
}
</style>
