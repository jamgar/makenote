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
import TodoList from '@ckeditor/ckeditor5-list/src/todolist'
import ListPlugin from '@ckeditor/ckeditor5-list/src/list'
import IndentPlugin from '@ckeditor/ckeditor5-indent/src/indent'
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock'

export default {
  name: 'TextEditor',
  components: {
    ckeditor: CKEditor.component
  },
  props: ['note'],
  data() {
    return {
      editor: ClassicEditor,
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
          TableToolBar,
          ListPlugin,
          TodoList,
          IndentPlugin,
          IndentBlock
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
            'outdent',
            'indent',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
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
  },
  computed: {
    editorData: {
      get() {
        return this.note.content
      },
      set(content) {
        // will update this.$store.commit(setNoteContent, { content })
      }
    }
  }
}
</script>

<style lang="scss">
#text-editor {
  font-size: 1.6rem;
}
.ck-content {
  height: 80vh;
}
.ck.ck-toolbar {
  border: none;
}
.ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
  border-color: white;
}
ul li {
  list-style-type: disc;
}
ol li {
  list-style-type: decimal;
}
</style>
