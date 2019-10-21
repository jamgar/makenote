<template>
  <div id="text-editor">
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
import AlignmentPlugin from '@ckeditor/ckeditor5-alignment/src/alignment'
import FontPlugin from '@ckeditor/ckeditor5-font/src/font'
import TablePlugin from '@ckeditor/ckeditor5-table/src/table'
import TableToolBar from '@ckeditor/ckeditor5-table/src/tabletoolbar'

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
          AlignmentPlugin,
          FontPlugin,
          LinkPlugin,
          ParagraphPlugin,
          BlockQuotePlugin,
          TablePlugin,
          TableToolBar
        ],
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'alignment',
            '|',
            'fontFamily',
            'fontSize',
            'fontColor',
            '|',
            'link',
            'undo',
            'redo',
            'blockquote',
            'insertTable'
          ]
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        }
        // can use numeric for font size
        // fontSize: {
        //   options: [9, 11, 13, 'default', 17, 19, 21]
        // }
      }
    }
  }
}
</script>

<style lang="scss">
#text-editor {
  p {
    font-size: 1.6rem;
  }
}
</style>
