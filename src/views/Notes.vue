<template>
  <div id="notes">
    <h3>Notes</h3>
    <div class="notes__container">
      <NotesList id="notes-list" />
      <TextEditor id="text-editor" />
    </div>
  </div>
</template>

<script>
import NotesList from '@/components/NotesList.vue'
import TextEditor from '@/components/TextEditor.vue'

export default {
  name: 'Notes',
  components: {
    NotesList,
    TextEditor
  }
}
</script>

<style lang="scss" scoped>
.notes__container {
  display: flex;
}
#notes-list {
  min-width: 25%;
}
#text-editor {
  width: 100%;
}
</style>
