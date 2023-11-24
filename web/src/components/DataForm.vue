<script>
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { resize } from '../helper/resize';
axiosRetry(axios, { retries: 999, retryCondition: () => true });
export default {
  data() {
    return {
      name: '',
      email: '',
      avatar: null,
      loading: false,
    };
  },
  methods: {
    async submitMethod() {
      this.loading = true;

      const form = document.querySelector('form');
      const formData = new FormData(form);
      const resizedImage = await resize(formData.get('avatar'));
      formData.set('avatar', resizedImage);

      axios
        .post('/api/data', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(async () => {
          const updatedData = await (await fetch('/api/data')).json();
          this.$emit('update', updatedData);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<template>
  <form @submit.prevent="submitMethod">
    <label for="name">Name: </label>
    <input type="text" name="name" required />
    <br />
    <label for="email">Email: </label>
    <input type="text" name="email" required />
    <br />
    <label for="Avatar">Avatar: </label>
    <input type="file" name="avatar" accept="image/*" required />
    <br />
    <button type="submit" :disabled="loading">
      <span v-if="!loading">Submit</span>
      <span v-if="loading">Loading...</span>
    </button>
  </form>
</template>

<style scoped>
input,
button {
  margin-bottom: 1rem;
}

input {
  padding: 0.5rem;
}
</style>
