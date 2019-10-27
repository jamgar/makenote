<template>
  <div id="note-list-item" @click="setActiveNote" :class="classObject">
    <span class="note__title">{{ note.title }}</span>
    <div class="note__actions">
      <span class="icon note__delete">
        <Trash2Icon @click="deleteNote" size="1.5x"></Trash2Icon>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Trash2Icon } from 'vue-feather-icons'

export default {
  name: 'NoteListItem',
  components: {
    Trash2Icon
  },
  props: ['note'],
  computed: {
    ...mapState({
      currentNote: state => state.note
    }),
    classObject() {
      return {
        active: this.note.id === this.currentNote.id,
        inActive: this.note.id != this.currentNote.id
      }
    }
  },
  methods: {
    setActiveNote() {
      this.$emit('setActiveNote', this.note)
    },
    deleteNote() {
      this.$emit('deleteNote', this.note)
    }
  }
}
</script>

<style lang="scss" scoped>
#note-list-item {
  display: flex;
  align-items: center;
  height: 5rem;
  margin-bottom: 0.2rem;
  padding: 0.5rem 2rem;
  border-radius: 2px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #becbff;
  }
}
.note__title {
  flex-grow: 1;
  font-size: 1.5rem;
}
.note__delete {
  color: red;
}
.icon {
  margin-left: 0.5rem;
  cursor: pointer;
}
.inActive {
  background-color: #fff;
}
.active {
  background-color: #becbff;
}
</style>
