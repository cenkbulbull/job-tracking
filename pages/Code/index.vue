<template>
  <div>
    <div class="container share float-start w-50">
      <div class="mt-3">
        <vs-alert>
          <h6 class="mt-2 d-inline">
            Çözemediğin problemi anlat ve dosya paylaş
          </h6>
        </vs-alert>
      </div>
      <div class="center content-inputs mt-4 w-100">
        <client-only placeholder="Today's tasks">
          <ckeditor-nuxt v-model="errorText" :config="editorConfig" />
        </client-only>
        <vs-button class="float-end mt-2" @click="shareProblem"> Paylaş </vs-button>
      </div>
      <div>
        <input
          ref="file"
          type="file"
          style="display: none"
          multiple
          accept="image/*,.pdf"
          @change="onChangeFile($event)"
          class="form-control-file"
        />
        <vs-button success @click="$refs.file.click()" class="float-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="fill: rgba(250, 250, 250, 1); transform: ; msfilter: "
          >
            <path
              d="M19.903 8.586a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.952.952 0 0 0-.051-.259c-.01-.032-.019-.063-.033-.093zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"
            ></path>
            <path d="M8 12h8v2H8zm0 4h8v2H8zm0-8h2v2H8z"></path>
          </svg>
        </vs-button>
      </div>
    </div>
    <div class="container float-end" style="width: 600px">
      <div class="mt-3">
        <vs-alert warn style="height: 270px" class="overflow-auto">
          <div>
            <h6 class="mt-2 d-inline">Çözümlenmeyen Problem</h6>
            <vs-button @click="removeIssue" danger class="custom-vs-btn float-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
              >
                <path
                  d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
                ></path>
              </svg>
            </vs-button>
            <vs-button @click="seeSolutions" class="custom-vs-btn float-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
              >
                <path
                  d="M14 12c-1.095 0-2-.905-2-2 0-.354.103-.683.268-.973C12.178 9.02 12.092 9 12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-.092-.02-.178-.027-.268-.29.165-.619.268-.973.268z"
                ></path>
                <path
                  d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"
                ></path>
              </svg>
            </vs-button>
          </div>
          <!-- ÇÖZÜMLENMEYEN PROBLEM İÇERİĞİ -->
          <div>
            <div class="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              iure facere fugit officia provident voluptatum reiciendis, fugiat
              numquam veritatis quam corporis animi voluptas voluptate excepturi
              unde dignissimos nobis exercitationem porro a aperiam. Consequatur
              tempora dolore illum accusamus non illo, excepturi debitis fugit
              soluta, beatae qui a reprehenderit suscipit. Voluptatem, dolore.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio
              repellat cum libero laudantium totam expedita velit, ratione,
              incidunt quia laborum, voluptatum dignissimos? Placeat,
              exercitationem? Repellat consectetur officia perferendis quasi
              sit?Lorem ipsum dolor sit, amet consectetur adipisicing elit. A,
              explicabo! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Deleniti quas debitis ea cum vel ratione ipsum consectetur
              maxime placeat magni?
            </div>
          </div>
          <!-- ÇÖZÜMLENMEYEN PROBLEM İÇERİĞİ -->
        </vs-alert>
        <vs-button @click="downloadFiles" class="float-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
          >
            <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
            <path
              d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"
            ></path>
          </svg>
        </vs-button>
        <vs-button @click="seePictures" class="float-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
          >
            <circle cx="7.499" cy="9.5" r="1.5"></circle>
            <path d="m10.499 14-1.5-2-3 4h12l-4.5-6z"></path>
            <path
              d="M19.999 4h-16c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-16 14V6h16l.002 12H3.999z"
            ></path>
          </svg>
        </vs-button>
      </div>
    </div>
    <div class="clearfix"></div>
    <!-- Diğer kullanıcıların paylaştıkları -->

    <div class="container mt-5 mb-3">
      <div class="row">
        <div v-for="(i, keyindex) in 5" :key="keyindex" class="col-md-4">
          <div class="card p-3 mb-2">
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <div class="icon"><i class="bx bxl-mailchimp"></i></div>
                <div class="ms-2 c-details">
                  <h6 class="mb-0" style="font-size: 12px !important">
                    Ad Soyad
                  </h6>
                  <span>Paylaşılma tarihi</span>
                </div>
              </div>
              <div class="d-flex">
                <vs-button @click="downloadFiles">
                  <svg
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
                    <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
                    <path
                      d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"
                    ></path>
                  </svg>
                </vs-button>
                <vs-button success @click="problemAnswer = !problemAnswer">
                  <svg
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
                      d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z"
                    ></path>
                    <path
                      d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"
                    ></path>
                  </svg>
                </vs-button>
              </div>
            </div>
            <div class="mt-3 lead">
              <p style="font-size: 12px !important">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Temporibus architecto vel deleniti eaque voluptates magni
                corrupti dolor eum doloribus dolorum, error vero quidem,
                deserunt aut officia, reprehenderit libero facilis est officiis!
                Quisquam ratione, voluptatem quasi cupiditate praesentium
                officia, molestiae corporis maiores sunt soluta esse harum,
                temporibus aspernatur dolorum fuga? Eaque?
              </p>
            </div>
            <div class="d-flex">
              <CoolLightBox
                :items="issues[0].images"
                :index="index"
                @close="index = null"
              >
              </CoolLightBox>

              <div
                class="image m-1"
                v-for="(image, imageIndex) in issues[0].images"
                :key="imageIndex"
                @click="index = imageIndex"
                :style="{ backgroundImage: `url(${image})` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Diğer kullanıcıların paylaştıkları -->

    <!-- popup start-->
    <div class="center">
      <vs-dialog width="300px" not-center v-model="problemAnswer">
        <template #header>
          <h4 class="not-margin">Sorunun sahibi</h4>
        </template>

        <div class="con-content">
          <client-only placeholder="Today's tasks">
            <ckeditor-nuxt :config="editorConfig" />
          </client-only>
        </div>

        <template #footer>
          <div class="con-footer">
            <vs-button @click="sendReply" transparent>
              Ok
            </vs-button>
            <vs-button @click="problemAnswer = false" dark transparent>
              Cancel
            </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>
    <!-- popup finish-->
  </div>
</template>
  <script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {
  middleware: [],
  layout: "loggedIn",
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
    CoolLightBox,
  },
  data: () => ({
    editorConfig: {
      toolbar: [
        "Undo",
        "Redo",
        "RemoveFormat",
        "Bold",
        "Link",
        "Code",
        "codeblock",
        "Blockquote",
        "Superscript",
        "Subscript",
        "SpecialCharacters",
      ],
      removePlugins: ["Title"],
    },
    errorText: "",
    errorFile: [],
    myError: [
      {
        id: 1,
        error:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia recusandae iusto soluta nulla quisquam. Hic exercitationem veritatis temporibus voluptates repellendus, incidunt nemo totam molestias neque inventore et nesciunt optio doloribus dolore quia pariatur obcaecati deserunt dolorum laudantium error sequi vitae!adipisicing elit. Mollitia recusandae iusto soluta nulla quisquam. Hic exercitationem veritatis temporibus voluptates repellendus, incidunt nemo totam molestias neque inventore et nesciunt optio doloribus dolore quia pariatur obcaecati deserunt dolorum laudantium error sequi vitae!",
        file: ["a", "b"],
      },
    ],
    issues: [
      {
        id: 1,
        name: "ss",
        text: "lorem döfdsfdsf",
        images: [
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
          "https://static.toiimg.com/photo/72975551.cms",
        ],
      },
    ],
    /*images: [
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
      "https://static.toiimg.com/photo/72975551.cms",
    ],*/
    index: null,
    problemAnswer: null,
  }),
  methods: {
    onChangeFile(e) {
      //console.log(e)
      const file = e.target.files[0];
      this.selectedImage = URL.createObjectURL(file);
      console.log(this.selectedImage);
    },
    shareProblem(){
      console.log("sorun paylaşıldı")
    },
    removeIssue(){
      console.log("sorununuz silindi")
    },
    seeSolutions(){
      //console.log("sorunları gör")
      this.$router.push("Code/Answer")
    },
    downloadFiles(){
      console.log("dosyalar indiriliyor")
    },
    seePictures(){
      console.log("resimleri gör")
    },
    sendReply(){
      console.log("cevap gönderildi")
      this.problemAnswer = false
    }

  },
};
</script>
<style>
.ck-content {
  height: 150px;
  font-size: 13px;
}
</style>
<style scoped>
.share {
  margin-left: 70px;
}
.custom-vs-btn {
  margin-top: -6px !important;
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

.image {
  width: 50px;
  height: 50px;
  background-size: cover;
  cursor: pointer;
  border-radius: 8px;
}

body {
  background-color: #eee;
}

.card {
  border: none;
  border-radius: 10px;
}

.c-details span {
  font-weight: 300;
  font-size: 13px;
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

.badge span {
  background-color: #fffbec;
  width: 60px;
  height: 25px;
  padding-bottom: 3px;
  border-radius: 5px;
  display: flex;
  color: #fed85d;
  justify-content: center;
  align-items: center;
}

.progress {
  height: 10px;
  border-radius: 10px;
}

.progress div {
  background-color: red;
}

.text1 {
  font-size: 14px;
  font-weight: 600;
}

.text2 {
  color: #a5aec0;
}

.con-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.con-footer .vs-button {
  margin: 0px;
}
.con-footer .vs-button .vs-button__content {
  padding: 10px 30px;
}
.con-footer .vs-button ~ .vs-button {
  margin-left: 10px;
}
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
  padding-bottom: 0px;
}
.con-content {
  width: 100%;
}
.con-content p {
  font-size: 0.8rem;
  padding: 0px 10px;
}
.con-content .vs-checkbox-label {
  font-size: 0.8rem;
}
.con-content .vs-input-parent {
  width: 100%;
}
.con-content .vs-input-content {
  margin: 10px 0px;
  width: calc(100%);
}
.con-content .vs-input-content .vs-input {
  width: 100%;
}
.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);
}
.footer-dialog .new {
  margin: 0px;
  margin-top: 20px;
  padding: 0px;
  font-size: 0.7rem;
}
.footer-dialog .new a {
  color: rgba(var(--vs-primary), 1) !important;
  margin-left: 6px;
}
.footer-dialog .new a:hover {
  text-decoration: underline;
}
.footer-dialog .vs-button {
  margin: 0px;
}
</style>
