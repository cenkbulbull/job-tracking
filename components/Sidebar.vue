<template>
  <div class="hidden">
    <vs-sidebar class="sidebar" absolute reduce v-model="active" open>
      <template #logo>
        <vs-avatar size="40" badge badge-color="success" class="mb-0">
        <img :src="$store.state.loggedInUser.degree ==`gelistirici` ? require(`@/assets/images/avatars/developer.png`) : require(`@/assets/images/avatars/coach.png`) ">
      </vs-avatar>
      </template>

      <vs-sidebar-item id="Home">
        <template #icon>
          <i class="bx bx-home"></i>
        </template>
      </vs-sidebar-item>

      <vs-sidebar-item id="Share">
        <template #icon>
          <i class="bx bx-share"></i>
        </template>
      </vs-sidebar-item>

      <vs-sidebar-item id="Code">
        <template #icon>
          <i class="bx bx-code-alt"></i>
        </template>
      </vs-sidebar-item>

      <vs-sidebar-item id="Chat">
        <template #icon>
          <i class="bx bx-chat"></i>
        </template>
      </vs-sidebar-item>

      <vs-sidebar-item>
        <template #icon>
          <i @click="logout" class='bx bx-log-out me-1'></i>
        </template>
      </vs-sidebar-item>

      <template v-if="myMeetings" #footer>
        <vs-row justify="space-between">
          <vs-avatar badge-color="danger" badge-position="top-right">
            <i
              @click="openNotification(myMeetings.meetings)"
              class="bx bx-bell"
            ></i>
            <template v-if="myMeetings.meetings.length > 0" #badge>{{
              myMeetings.meetings.length
            }}</template>
          </vs-avatar>
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>
  <script>
export default {
  data: () => ({
    active: "Home",
  }),
  mounted() {
    //route değişiminde active datasınında değişmesini tetiklemek START
    if (this.$route.name != this.active && this.$route.name != "index") {
      this.active = this.$route.name;
    } else {
      this.active = "Home";
    }
    //route değişiminde active datasınında değişmesini tetiklemek FINISH
  },
  watch: {
    //active datasının değişimine göre yönlendirme START
    active: function (route) {
      if (route == "Home") {
        this.$router.push("/");
        return;
      }
      this.$router.push(route);
      //active datasının değişimine göre yönlendirme FINISH
    },
  },
  computed: {
    myMeetings() {
      return this.$store.getters.getMyMeetings;
    },
  },
  methods: {
    openNotification(meetings) {
      //console.log(meetings);
      meetings.forEach((meeting) => {
        if (meeting.status == true) {
          const noti = this.$vs.notification({
            icon: `<i class='bx bx-show'></i>`,
            color: "success",
            duration: "none",
            progress: "auto",
            text: `<b>${meeting.sendername}</b> adlı kişi sorununu çözdüğünüz için size TEŞEKKÜR EDİYOR, bu bildirimi kapatabilirsiniz.`,
          });
        }else{
          const noti = this.$vs.notification({
            icon: `<i class='bx bx-show'></i>`,
            color: "#7d33ff",
            duration: "none",
            progress: "auto",
            text: `<b>${meeting.sendername}</b> adlı kişiden YÜZYÜZE GÖRÜŞME TALEBİ geldi, bu bildirimi kapatabilirsiniz.`,
          });
        }
        if (process.client) {
          const lsId = JSON.parse(localStorage.getItem("user"))._id;
          const senderid = meeting.senderid;
          this.$store.dispatch("deleteMeetingsActions", { lsId, senderid });
        }
      });
    },
    logout(){
      this.$store.commit("logout")
      this.$router.push("/login")
    }
  },
};
</script>
<style scoped>
.sidebar {
  position: fixed !important;
}
</style>