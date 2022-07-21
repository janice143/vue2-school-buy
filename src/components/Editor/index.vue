<template>
    <div >
        <!-- 编辑器 -->
        <Editor
            style="height: 10rem; overflow-y: hidden;"
            :defaultConfig="editorConfig"
            v-model="html"
            @onCreated="onCreated"
       
        />

    </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor'

export default {
    name: 'MyEditor',
    components: { Editor, Toolbar },
    props:['description'],
    data() {
        return {
            editor: null,
            html: '',
            editorConfig: {
                readOnly : true // 设置只读属性
            }
        }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
        },
       
    },
    mounted() {
        // 父组件给子组件的数据需要一定时间才拿到，
        // console.log(this.description)
        //  setTimeout(() => {
        //     this.html = this.description
        // }, 1500)
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
    },
    watch: {
    description (newVal) {
        this.html = this.description
    }
}

}
</script>

<!-- 记得引入 wangEditor css 文件，重要 ！！！ -->
<style src="@wangeditor/editor/dist/css/style.css"></style>
