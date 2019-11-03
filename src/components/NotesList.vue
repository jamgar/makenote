<template>
  <div id="note-list">
    <div class="note-list__header">
      <button @click.prevent="newNote" class="btn btn--outline">
        New Note
      </button>
    </div>
    <NoteListItem
      v-for="(note, idx) in notes"
      :key="idx"
      :noteId="note.id"
      @setActiveNote="setActiveNote"
      @deleteNote="deleteNote"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NoteListItem from '@/components/NoteListItem.vue'

export default {
  name: 'NoteList',
  components: {
    NoteListItem
  },
  computed: {
    ...mapState(['notes']),
    isEditingNote: {
      get() {
        return this.$store.state.isEditingNote
      },
      set() {
        this.$store.commit('updateIsEditingNote', false)
      }
    }
  },
  created() {
    this.$store.dispatch('fetchNotes')
  },
  methods: {
    setActiveNote(note) {
      this.$store.commit('setNote', note)
    },
    newNote() {
      const note = {
        id: '',
        title: '',
        content: ''
      }
      this.isEditingNote = false
      this.setActiveNote(note)
    },
    deleteNote(note) {
      this.$store.dispatch('deleteNote', note)
    }
  }
}
</script>

<style lang="scss" scoped>
.note-list__header {
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 0.5rem;
  text-align: center;

  & > button {
    margin: 0;
  }
}
</style>
