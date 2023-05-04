<template>
  <div>
    <TaskTable/>
  </div>
</template>

<script>
import TaskTable from '../components/TaskTable.vue'
export default {
  middleware:[],
  layout:"loggedIn",
  components: {
    TaskTable
  },
}
</script>

<style>

</style>
