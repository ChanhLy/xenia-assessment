<script>
export default {
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async deleteRow(id) {
      console.log('deleteRow', id);
      fetch(`/api/data/${id}`, {
        method: 'DELETE',
      });
      const updatedData = await (await fetch('/api/data')).json();
      this.$emit('update', updatedData);
    }
  }
};
</script>

<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>email</th>
        <th>avatar</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in rows" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>
          <img :src="'http://localhost:3000' + item.avatar" :alt="'http://localhost:3000' + item.avatar" />
        </td>
        <td>
          <button @click="deleteRow(item.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #ddd;
}

table,
td,
th {
  border: 1px solid;
}
</style>
