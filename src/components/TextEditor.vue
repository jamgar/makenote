<template>
  <div>
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'
import AutoFormatPlugin from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading'
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold'
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic'
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link'
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import BlockQuotePlugin from '@ckeditor/ckeditor5-block-quote/src/blockquote'

export default {
  name: 'TextEditor',
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        plugins: [
          EssentialsPlugin,
          AutoFormatPlugin,
          HeadingPlugin,
          BoldPlugin,
          ItalicPlugin,
          LinkPlugin,
          ParagraphPlugin,
          BlockQuotePlugin
        ],
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'undo',
            'redo',
            'blockquote'
          ]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
