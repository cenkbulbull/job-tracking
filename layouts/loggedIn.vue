<template>
  <div>
    <Sidebar />
    <nuxt />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
export default {
  components: {
    Sidebar,
  },
  created() {
    //meetings güncelleniyor
    if (process.client) {
      const lsId = JSON.parse(localStorage.getItem("user"))._id;
      this.$store.dispatch("setMyMeetingsActions", lsId);
    }
  },
};
</script>

<style>
body {
  background-color: #f4f7f6;
}
</style>