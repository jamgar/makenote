<template>
  <div id="tasks">
    <form @submit.prevent class="form task__form">
      <input
        v-model.trim="task.content"
        type="text"
        placeholder="Enter Task"
        id="task"
        class="input__textbox task__textbox"
      />
      <button
        @click="addTask"
        class="btn btn--outline task__btn"
        :disabled="task.content === ''"
      >
        Add
      </button>
    </form>
    <div v-if="tasks">
      <div v-for="(task, idx) in tasks" :key="idx">
        <TaskItem
          :task="task"
          @toggleComplete="toggleComplete"
          @deleteTask="deleteTask"
        />
      </div>
    </div>
    <div v-else>
      <p>No tasks created.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TaskItem from '@/components/TaskItem.vue'

export default {
  components: {
    TaskItem
  },
  data() {
    return {
      task: {
        content: ''
      }
    }
  },
  created() {
    this.$store.dispatch('fetchTasks')
  },
  computed: {
    ...mapState(['tasks'])
  },
  methods: {
    addTask() {
      this.$store.dispatch('addTask', this.task.content)
      this.task.content = ''
    },
    toggleComplete(task) {
      task.completed = !task.completed
      this.$store.dispatch('updateTask', task)
    },
    deleteTask(task) {
      this.$store.dispatch('deleteTask', task)
    }
  }
}
</script>

<style lang="scss" scoped>
.task__form {
  display: flex;
  padding: 1rem;
  margin-bottom: 0.5rem;
}
.task__textbox {
  flex-grow: 1;
}
.task__btn {
  margin: 0;
  &:disabled {
    border-color: #dee1ec;
    color: gray;
  }
}
</style>
