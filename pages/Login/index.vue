<template>
  <div class="container">
    <div class="row">
      <div class="center content-inputs col-4 mx-auto mt-5">
        <vs-input
          color="#7d33ff"
          border
          shadow
          v-model="namesurname"
          placeholder="Name surname"
        >
          <template #icon>
            <i class="bx bx-user"></i>
          </template>
          <template #message-danger> Required </template>
        </vs-input>

        <vs-input
          color="#7d33ff"
          border
          shadow
          type="password"
          v-model="password"
          placeholder="Password"
        >
          <template #icon>
            <i class="bx bx-lock-open-alt"></i>
          </template>
          <template #message-danger> Required </template>
        </vs-input>

        <div class="row">
          <div class="col-6">
            <div class="center con-selects">
              <vs-select color="success" placeholder="Takım" v-model="team">
                <vs-option label="Frontend" value="frontend">
                  Frontend
                </vs-option>
                <vs-option label="Backend" value="backend"> Backend </vs-option>
                <vs-option label="Database" value="database">
                  Database
                </vs-option>
                <template #message-danger> Required </template>
              </vs-select>
            </div>
          </div>
          <div class="col-6">
            <div class="center con-selects">
              <vs-select
                color="success"
                placeholder="Ünvan"
                v-model="authority"
              >
                <vs-option label="Koç" value="koc"> Takım Lideri </vs-option>
                <vs-option label="Geliştirici" value="gelistirici">
                  Geliştirici
                </vs-option>
                <template #message-danger> Required </template>
              </vs-select>
            </div>
          </div>
        </div>

        <vs-button @click="signin" class="float-end my-3" gradient success
          >Giriş</vs-button
        >
        <vs-button
          @click="report = !report"
          class="float-end my-3"
          gradient
          warn
          >Sorun Bildir</vs-button
        >

        <!-- popup start-->

        <div class="center">
          <vs-dialog v-model="report">
            <vs-alert color="danger" class="mb-2"
              >Tüm alanları doldurduğunuzdan emin olun</vs-alert
            >

            <template #header>
              <h4 class="not-margin">Sorun Bildir</h4>
            </template>

            <div class="con-form">
              <vs-input
                class="mb-2"
                v-model="email"
                placeholder="Mail"
                block
              ></vs-input>

              <vs-input
                class="mb-2"
                v-model="name"
                placeholder="Name"
                block
              ></vs-input>

              <textarea
                class="form-control w-100"
                style="background-color: #f4f7f8; width: 200px"
                placeholder="Message"
                rows="5"
                v-model="message"
              ></textarea>
            </div>

            <template #footer>
              <div class="footer-dialog">
                <vs-button v-if="btnReport" gradient success block loading
                  ><i class="bx bxs-paper-plane"></i>
                </vs-button>
                <vs-button v-else @click="sendReport" gradient success block
                  ><i class="bx bxs-paper-plane"></i>
                </vs-button>
              </div>
            </template>
          </vs-dialog>
        </div>
        <!-- popup end-->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    namesurname: "",
    password: "",
    team: "",
    authority: "",
    /*popup start */
    report: false,
    email: "",
    name: "",
    message: "",
    btnReport: false,
    /*popup end */
    
    /*service_id: process.env.VUE_APP_SERVICEIDEMAILJS,
    template_id: process.env.VUE_APP_TEMPLATEIDEMAILJS,
    public_key: process.env.VUE_APP_PUBLICKEYEMAILJS,*/
  }),
  methods: {
    signin() {
      console.log("giriş");
    },
    async sendReport() {
      this.btnReport = true; //tıklanma durumunda buton loading oluyor
      setTimeout(async () => {
        await console.log("report");
        this.btnReport = false; //gönderme bitince buton eski haline dönüyor

        const noti = this.$vs.notification({
          progress: "auto",
          color: "success",
          position: "top-right",
          text: "Mesajınız başarıyla iletildi, mail adresinize geri dönüş yapılacaktır.",
        });
      }, 2000);

      /*emailjs.sendForm(this.service_id, this.template_id, form.value, public_key).then(
        (result) => {
          console.log("SUCCESS!", result.text);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );*/
    },
  },
};
</script>
<style scoped>
.container {
  margin-top: 100px;
}
.form-control {
  border: none;
}
.form-control:focus {
  box-shadow: none;
  border: none;
}
.form-control::placeholder {
  color: #b5b5b5;
  font-size: 13px;
}
</style>