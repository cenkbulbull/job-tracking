<template>
  <div>
    <Sidebar />
    <Nuxt />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
export default {
  middleware: ["auth"],
  components: {
    Sidebar,
  },
  created() {
    //meetings ve messages güncelleniyor
    if (process.client) {
      const lsId = JSON.parse(localStorage.getItem("user"))._id;
      this.$store.dispatch("setMyMeetingsActions", lsId);
      this.$store.dispatch("setMyMessagesActions", lsId);
    }
  },
};
</script>

<style>
body {
  background-color: #f4f7f6;
}
::-webkit-scrollbar {
  width: 6px;
  background-color: #eaeaea;
  border-left: 1px solid #cecece;
}
::-webkit-scrollbar-thumb {
  background-color: #47575e;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #39484f;
}
</style>