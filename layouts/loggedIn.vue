<template>
  <div>
    <Sidebar/>
    <nuxt />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
export default {
  components: {
    Sidebar,
  },
};
</script>

<style>
body{
  background-color: #f4f7f6;
}
</style>