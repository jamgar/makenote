<template>
  <div>
    <ckeditor :editor="editor" v-model="editorData"></ckeditor>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  name: 'TextEditor',
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
