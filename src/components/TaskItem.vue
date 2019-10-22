<template>
  <div id="task" :class="classObject">
    <span class="task__content">{{ task.content }}</span>
    <div class="task__actions">
      <span class="icon task__complete">
        <CheckCircleIcon @click="toggleComplete" size="1.5x"></CheckCircleIcon>
      </span>
      <span class="icon task__delete">
        <Trash2Icon @click="deleteTask" size="1.5x"></Trash2Icon>
      </span>
    </div>
  </div>
</template>

<script>
import { Trash2Icon, CheckCircleIcon } from 'vue-feather-icons'

export default {
  components: {
    Trash2Icon,
    CheckCircleIcon
  },
  props: ['task'],
  data() {
    return {
      isComplete: false
    }
  },
  computed: {
    classObject() {
      return {
        complete: this.task.completed
      }
    }
  },
  methods: {
    toggleComplete() {
      this.$emit('toggleComplete', this.task)
    },
    deleteTask() {
      this.$emit('deleteTask', this.task)
    }
  }
}
</script>

<style lang="scss" scoped>
#task {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  background-color: #ffffff;
  // width: 100%;
  padding: 0.5rem 2rem;
  border-radius: 2px;
}
.task__content {
  flex-grow: 1;
  font-size: 1.5rem;
}
.task__complete {
  color: green;
}
.task__delete {
  color: red;
}
.icon {
  margin-left: 0.5rem;
  cursor: pointer;
}
.complete {
  color: lighten(#17223b, 50%);
  text-decoration: line-through;
}
</style>
