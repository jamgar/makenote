<template>
  <div id="note-list-item" @click="setActiveNote" :class="classObject">
    <span class="note__title">{{ note.title }}</span>
    <div class="note__actions">
      <span class="icon note__delete">
        <Trash2Icon @click.stop="deleteNote" size="1.5x"></Trash2Icon>
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
  props: ['noteId'],
  computed: {
    ...mapState({
      currentNote: state => state.note
    }),
    isEditingNote: {
      get() {
        return this.$store.state.isEditingNote
      },
      set() {
        this.$store.commit('updateIsEditingNote', true)
      }
    },
    note() {
      return this.isActive
        ? this.currentNote
        : this.$store.getters.getNote(this.noteId)
    },
    classObject() {
      return {
        active: this.isActive, //this.note.id === this.currentNote.id,
        inActive: !this.isActive //this.note.id != this.currentNote.id
      }
    },
    isActive() {
      return this.noteId === this.currentNote.id
    }
  },
  methods: {
    setActiveNote() {
      this.isEditingNote = true
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
    background-color: lighten(#becbff, 5%);
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
  border: none;
  background-color: #fff;
}
.active {
  background-color: lighten(#becbff, 5%);
  border-bottom: 2px solid #0d0cb5;
}
</style>
