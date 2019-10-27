<template>
  <div id="notes">
    <h3>Notes</h3>
    <div class="notes__container">
      <NotesList id="notes-list" />
      <Note id="note-editor" :note="note" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NotesList from '@/components/NotesList.vue'
import Note from '@/components/Note.vue'

export default {
  name: 'Notes',
  components: {
    NotesList,
    Note
  },
  computed: {
    ...mapState(['note'])
  }
}
</script>

<style lang="scss" scoped>
.notes__container {
  display: flex;
}
#notes-list {
  min-width: 25%;
  padding-right: 2px;
}
#note-editor {
  width: 100%;
}
</style>
