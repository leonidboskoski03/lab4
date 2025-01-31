<template>
  <form @submit.prevent="submitBlog">
    <input v-model="title" placeholder="Title" required />
    <input v-model="author" placeholder="Author" required />
    <input v-model="id" placeholder="ID" required />
    <textarea v-model="content" placeholder="Content" required></textarea>
    <button type="submit">Save</button>
    <button type="button" @click="$emit('closeEditor')">Cancel</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('');
const author = ref('');
const id = ref('');
const content = ref('');

const emit = defineEmits(['addNewItem', 'closeEditor']);

const submitBlog = () => {
  emit('addNewItem', { title: title.value, author: author.value, id: id.value, content: content.value });
  title.value = '';
  author.value = '';
  id.value = '';
  content.value = '';
};
</script>

<style scoped>
form {
  margin-left: 240px;
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
