<template>
  <div id="notes">
    <div class="notes-list"></div>
    <TextEditor />
  </div>
</template>

<script>
import TextEditor from '@/components/TextEditor.vue'
export default {
  name: 'Notes',
  components: {
    TextEditor
  }
}
</script>

<style lang="scss" scoped></style>
