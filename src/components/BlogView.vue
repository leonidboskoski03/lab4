<template>
  <div>
    <button @click="toggleEditorVisibility" v-if="!showEditor">
      Add new blog
    </button>
    <BlogEditor v-if="showEditor" @addNewItem="addItem" />
    <Blogs
      :blogs="blogs"
      :isLoading="isLoading"
      :error="error"
      @deleteBlog="deleteItem"
    />
  </div>
</template>

<script setup>
import BlogEditor from "./BlogEditor.vue";
import Blogs from "./Blogs.vue";
import { useBlogs } from "../composables/useBlogs";
import { ref } from "vue";

const { blogs, isLoading, error, addItem, deleteItem } = useBlogs();
const showEditor = ref(false);

function toggleEditorVisibility() {
  showEditor.value = !showEditor.value;
}
</script>
