<template>
  <div id="note">
    <input
      v-model.trim="note.title"
      type="title"
      placeholder="Title"
      id="title"
      class="input__textbox input__textbox--note"
    />
    <TextEditor :note="note" />
  </div>
</template>

<script>
import TextEditor from '@/components/TextEditor.vue'

export default {
  props: ['note'],
  components: {
    TextEditor
  }
}
// Save a note
// Fetch a note
// Pass note content to TextEditor
</script>

<style lang="scss" scoped>
#note {
  width: 100%;
}
.input__textbox--note {
  margin-bottom: 1rem;
}
</style>
