
<template>
  <div>
    <h1>Blog Posts</h1>

    <div v-if="isLoading">
      <p>Loading blogs...</p>
    </div>

    <div v-else-if="error">
      <p class="error">{{ error }}</p>
    </div>

    <section v-else>
      <div class="filters">
        <label for="searchInput">Search:</label>
        <input type="text" id="searchInput" v-model="searchTerm" />

        <fieldset>
          <legend>Filter by</legend>
          <label>
            <input type="checkbox" value="title" v-model="filters" />
            Title
          </label>
          <label>
            <input type="checkbox" value="description" v-model="filters" />
            Content
          </label>
        </fieldset>
      </div>

      <ul class="blog-list">
        <li v-for="(blog, index) in filteredBlogs" :key="index">
          <article class="blog-item">
            <div class="blog-header">
              <img
                v-if="blog.heroImage"
                :src="`${blog.heroImage.fields.file.url}?fit=scale&w=350&h=196`"
                alt="Blog Thumbnail"
                class="thumbnail"
              />
              <div class="blog-details">
                <time class="publish-date">{{ formatDate(blog.publishDate) }}</time>
                <h3>{{ blog.title }}</h3>
                <p>{{ blog.description }}</p>
              </div>
            </div>
            <button @click="handleDelete(blog.id)" class="delete-btn">Delete</button>
          </article>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { useSearch } from "../composables/useSearch";

const props = defineProps({
  blogs: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  error: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["deleteBlog"]);
const blogs = ref(props.blogs);

watch(() => props.blogs, (newBlogs) => {
  blogs.value = newBlogs;
});

const { searchTerm, filters, filteredItems: filteredBlogs } = useSearch(blogs);

const formatDate = (date) => {
  const parsedDate = new Date(date);
  return isNaN(parsedDate) ? "Invalid Date" : parsedDate.toDateString();
};

const handleDelete = (id) => {
  emits("deleteBlog", id);
};
</script>

<style scoped>
.blog-list {
  padding: 0;
}

.blog-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
}

.blog-header {
  display: flex;
  align-items: center;
}

.thumbnail {
  margin-right: 15px;
  max-width: 120px;
}

.blog-details {
  max-width: 500px;
}

.publish-date {
  font-size: 12px;
  font-weight: bold;
  color: #666;
}

h3 {
  margin: 10px 0;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.filters {
  margin-bottom: 20px;
}

.filters label {
  margin-right: 15px;
}

fieldset {
  margin-top: 10px;
  border: none;
  padding: 0;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
