<template>
  <div id="notes">
    <h3>Notes</h3>
    <div class="notes__container">
      <NotesList id="notes-list"/>
      <Note id="note"/>
    </div>
  </div>
</template>

<script>
import NotesList from '@/components/NotesList.vue'
import Note from '@/components/Note.vue'

export default {
  name: 'Notes',
  components: {
    NotesList,
    Note
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
#note {
  width: 100%;
}
</style>
