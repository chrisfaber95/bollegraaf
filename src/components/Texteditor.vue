<template>
  <div class="texteditor">
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        <div>
            {{editorData}}
        </div>
  </div>
</template>

<script>
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import ClassicEditor from '@/assets/scripts/editor/ckeditor5-build-classic/build/ckeditor.js';

export default {
  name: 'HelloWorld',
  props: [
    'text'
  ],
  mounted(){
 },
    data() {
        return {
            editor: ClassicEditor,
            //editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            editorData:this.editText
        };
    },
    computed: {
      editText(){
        console.log()
        return this.text
      }
    },
    methods:{
      getEditorText: function(){
        return this.editorData;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
