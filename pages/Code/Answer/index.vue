<template>
  <div>
    <div class="container mt-5 mb-3">
      <div v-if="getMyIssues.length > 0" class="row">
        <div
          v-for="(answer, keyindex) in getMyIssues[0].answers"
          :key="keyindex"
          class="col-md-4"
        >
          <div class="card p-3 mb-2">
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <div class="icon"><i class="bx bxl-mailchimp"></i></div>
                <div class="ms-2 c-details">
                  <h6 class="mb-0" style="font-size: 12px !important">
                    {{ answer.sendername }}
                  </h6>
                </div>
              </div>
              <div class="d-flex">
                <vs-button success @click="sayThankYou(answer.sendername)">
                  <svg
                    class="me-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    style="
                      fill: rgba(255, 255, 255, 1);
                      transform: ;
                      msfilter: ;
                    "
                  >
                    <path
                      d="M20.5 5A1.5 1.5 0 0 0 19 6.5V11h-1V4.5a1.5 1.5 0 0 0-3 0V11h-1V3.5a1.5 1.5 0 0 0-3 0V11h-1V5.5a1.5 1.5 0 0 0-3 0v10.81l-2.22-3.6a1.5 1.5 0 0 0-2.56 1.58l3.31 5.34A5 5 0 0 0 9.78 22H17a5 5 0 0 0 5-5V6.5A1.5 1.5 0 0 0 20.5 5z"
                    ></path>
                  </svg>
                  Teşekkür Et
                </vs-button>
              </div>
            </div>

            <div class="mt-3 lead" style="height: 150px; overflow: auto">
              <p style="font-size: 12px !important">
                {{ strip_tags(answer.sendertext) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    //ckeditörden gelen html taglarını temizleme
    strip_tags(remove) {
      return remove.replace(/(<([^>]+)>)/gi, "");
    },
    async sayThankYou(tobesent){
      const idData = await this.getUser.find((user) => {
        return user.name == tobesent;
      });

      const Notice = {
        name: tobesent,
        userId: idData._id,
        meetings: [
          {
            senderid: JSON.parse(localStorage.getItem("user"))._id,
            sendername: JSON.parse(localStorage.getItem("user")).name,
            status: true, //status true ise teşekkür bildirimi, false ise yüzyüze görüşme bildirimi yapılıyor
          },
        ],
      };
      this.$store.dispatch("addMeetings", Notice);
    }
  },
  computed: {
    getMyIssues() {
      return this.$store.getters.getMyIssues;
    },
    getUser() {
      return this.$store.getters.getUserList;
    }
  },
};
</script>

<style scoped>
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
body {
  background-color: #eee;
}

.card {
  border: none;
  border-radius: 10px;
}

.icon {
  width: 50px;
  height: 50px;
  background-color: #eee;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 39px;
}
</style>