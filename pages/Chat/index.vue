<template>
  <div class="container">
    <div class="row clearfix">
      <div class="col-lg-12">
        <div class="card chat-app">
          <div id="plist" class="people-list">
            <div class="input-group">
              <input
                v-model="searchUser"
                type="text"
                class="form-control"
                placeholder="Search..."
              />
            </div>

            <ul
              style="height: 450px"
              class="list-unstyled chat-list mt-2 mb-0 overflow-auto"
            >
              <li
                v-for="(user, i) in filterUsers"
                :key="i"
                @click="activeChatUser = user.name"
                class="clearfix"
                :class="activeChatUser == user.name ? 'active' : ''"
              >
                <div v-if="user.authority == 'Geliştirici'">
                  <img
                    src="@/assets/images/avatars/developer.png"
                    alt="avatar"
                  />
                  <div class="about">
                    <div class="name">{{ user.name }}</div>
                  </div>
                </div>
                <div v-else>
                  <img src="@/assets/images/avatars/coach.png" alt="avatar" />
                  <div class="about">
                    <div class="name">{{ user.name }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="chat">
            <div class="chat-header clearfix">
              <div class="row">
                <div class="col-lg-10">
                  <div class="chat-about">
                    <h6 class="mt-3">{{ activeChatUser }}</h6>
                  </div>
                </div>
                <div class="col-lg-1 hidden-sm text-right">
                  <input
                    ref="file"
                    type="file"
                    style="display: none"
                    @change="onChangeFile($event)"
                    class="form-control-file"
                  />

                  <vs-button
                    success
                    :disabled="!activeChatUser"
                    @click="$refs.file.click()"
                    class="float-end"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style="
                        fill: rgba(250, 250, 250, 1);
                        transform: ;
                        msfilter: ;
                      "
                    >
                      <path
                        d="M19.903 8.586a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.952.952 0 0 0-.051-.259c-.01-.032-.019-.063-.033-.093zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"
                      ></path>
                      <path d="M8 12h8v2H8zm0 4h8v2H8zm0-8h2v2H8z"></path>
                    </svg>
                  </vs-button>
                </div>

                <div class="col-lg-1 hidden-sm text-right">
                  <vs-button @click="meeting" :disabled="!activeChatUser" icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style="
                        fill: rgba(250, 250, 250, 1);
                        transform: ;
                        msfilter: ;
                      "
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
              </div>
            </div>

            <div v-if="activeChatUser != null" class="chat-history">
              <ul class="m-b-0">
                <li class="clearfix">
                  <div class="message other-message float-right">
                    Hi Aiden, how are you? How is the project coming along?
                  </div>
                </li>
                <li class="clearfix">
                  <div class="message-data">
                    <span class="message-data-time">10:12 AM, Today</span>
                  </div>
                  <div class="message my-message">Are we meeting today?</div>
                </li>
                <li class="clearfix">
                  <div class="message-data">
                    <span class="message-data-time">10:15 AM, Today</span>
                  </div>
                  <div class="message my-message">
                    Project has been already finished and I have results to show
                    you.
                  </div>
                </li>
                <li class="clearfix">
                  <div class="message-data">
                    <span class="message-data-time">10:15 AM, Today</span>
                  </div>
                  <div class="message my-message">
                    Project has been already finished and I have results to show
                    you.
                  </div>
                </li>
              </ul>
            </div>
            <div v-else style="height: 400px">
              <vs-alert>
                <h6 class="mt-2">Welcome to <b>TODAY CHAT</b></h6>
                <p>
                  Buradan ekip arkadaşlarına yada takım liderine mesaj
                  yollayabilir, sorunlarını onlarla paylaşıp, projenin
                  eksiklerini tamamlayabilirsin. Sağ üstteki icondan ise dosya
                  yollayabilirsin. Başarılar :))
                </p>
              </vs-alert>
            </div>

            <div class="chat-message clearfix">
              <div class="input-group mb-0">
                <input
                  :disabled="!activeChatUser"
                  v-model="chatMessage"
                  type="text"
                  class="form-control"
                />
                <div class="input-group-prepend">
                  <vs-button success :disabled="!activeChatUser" @click="sendMessage">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style="
                        fill: rgba(255, 255, 255, 1);
                        transform: ;
                        msfilter: ;
                      "
                    >
                      <path
                        d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"
                      ></path>
                    </svg>
                  </vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: [],
  layout: "loggedIn",
  components: {},
  data: () => ({
    activeChatUser: null,
    chatMessage: "",
    selectedImage:null,
    searchUser: "",
    users: [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        authority: "Geliştirici",
        email:
          "Sincere@april.bizSincere@april.bizSincere@april.bizSincere@april.bizSincere@april.bizSincere@april.bizSincere@april.bizSincere@april.bizSincere@april.bizSincere@april.bizSincere@april.bizSincere@april.biz",
        website: "hildegard.org",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        authority: "Geliştirici",
        email: "Shanna@melissa.tv",
        website: "anastasia.net",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        authority: "Geliştirici",
        email: "Nathan@yesenia.net",
        website: "ramiro.info",
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        authority: "Geliştirici",
        email: "Julianne.OConner@kory.org",
        website: "kale.biz",
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        authority: "Geliştirici",
        email: "Lucio_Hettinger@annie.ca",
        website: "demarco.info",
      },
      {
        id: 6,
        name: "Mrs. Dennis Schulist",
        username: "Leopoldo_Corkery",
        authority: "Geliştirici",
        email: "Karley_Dach@jasper.info",
        website: "ola.org",
      },
      {
        id: 7,
        name: "Kurtis Weissnat",
        username: "Elwyn.Skiles",
        authority: "Geliştirici",
        email: "Telly.Hoeger@billy.biz",
        website: "elvis.io",
      },
      {
        id: 8,
        name: "Nicholas Runolfsdottir V",
        username: "Maxime_Nienow",
        authority: "Geliştirici",
        email: "Sherwood@rosamond.me",
        website: "jacynthe.com",
      },
      {
        id: 9,
        name: "Glenna Reichert",
        username: "Delphine",
        authority: "Geliştirici",
        email: "Chaim_McDermott@dana.io",
        website: "conrad.com",
      },
      {
        id: 10,
        name: "Clementina DuBuque",
        username: "Moriah.Stanton",
        authority: "Geliştirici",
        email: "Rey.Padberg@karina.biz",
        website: "ambrose.net",
      },
      {
        id: 10,
        name: "Lider John",
        username: "John",
        authority: "Takım Lideri",
        email: "Rey.Padberg@karina.biz",
        website: "ambrose.net",
      },
    ],
  }),
  computed: {
    filterUsers() {
      return this.users.filter((item) => {
        return item.name.match(this.searchUser);
      });
    },
  },
  methods: {
    onChangeFile(e) {
      //console.log(e)
      const file = e.target.files[0];
      this.selectedImage = URL.createObjectURL(file);
      console.log(this.selectedImage)
    },
    meeting(){
      console.log("görüşme talebi yollandı")
    },
    sendMessage(){
      console.log("mesaj gönder")
    }
  },
};
</script>
<style scoped>
.container {
  margin-top: 20px;
}
.card {
  background: #fff;
  transition: 0.5s;
  border: 0;
  margin-bottom: 30px;
  border-radius: 0.55rem;
  position: relative;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}
.chat-app .people-list {
  width: 280px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  z-index: 7;
}

.chat-app .chat {
  margin-left: 280px;
  border-left: 1px solid #eaeaea;
}

.people-list {
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.people-list .chat-list li {
  padding: 10px 15px;
  list-style: none;
  border-radius: 3px;
}

.people-list .chat-list li:hover {
  background: #efefef;
  cursor: pointer;
}

.people-list .chat-list li.active {
  background: #efefef;
}

.people-list .chat-list li .name {
  font-size: 12px;
}

.people-list .chat-list img {
  width: 45px;
  border-radius: 50%;
}

.people-list img {
  float: left;
  border-radius: 50%;
}

.people-list .about {
  float: left;
  padding-left: 8px;
}

.chat .chat-header {
  padding: 15px 20px;
  border-bottom: 2px solid #f4f7f6;
}

.chat .chat-header img {
  float: left;
  border-radius: 40px;
  width: 40px;
}

.chat .chat-header .chat-about {
  float: left;
  padding-left: 10px;
}

.chat .chat-history {
  padding: 20px;
  border-bottom: 2px solid #fff;
  height: 400px;
  overflow: auto;
}

.chat .chat-history ul {
  padding: 0;
}

.chat .chat-history ul li {
  list-style: none;
  margin-bottom: 30px;
}

.chat .chat-history ul li:last-child {
  margin-bottom: 0px;
}

.chat .chat-history .message-data {
  margin-bottom: 15px;
}

.chat .chat-history .message-data img {
  border-radius: 40px;
  width: 40px;
}

.chat .chat-history .message-data-time {
  color: #434651;
  padding-left: 6px;
  font-size: 10px;
}

.chat .chat-history .message {
  color: #444;
  padding: 18px 20px;
  line-height: 26px;
  font-size: 12px;
  border-radius: 7px;
  display: inline-block;
  position: relative;
}

.chat .chat-history .message:after {
  bottom: 100%;
  left: 7%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #fff;
  border-width: 10px;
  margin-left: -10px;
}

.chat .chat-history .my-message {
  background: #efefef;
}

.chat .chat-history .my-message:after {
  bottom: 100%;
  left: 30px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #efefef;
  border-width: 10px;
  margin-left: -10px;
}

.chat .chat-history .other-message {
  background: #e8f1f3;
  text-align: right;
}

.chat .chat-history .other-message:after {
  border-bottom-color: #e8f1f3;
  left: 93%;
}

.chat .chat-message {
  padding: 20px;
}

.online {
  color: #86c541;
}

.offline {
  color: #e47297;
}

.float-right {
  float: right;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

@media only screen and (max-width: 767px) {
  .chat-app .people-list {
    height: 465px;
    width: 100%;
    overflow-x: auto;
    background: #fff;
    left: -400px;
    display: none;
  }
  .chat-app .people-list.open {
    left: 0;
  }
  .chat-app .chat {
    margin: 0;
  }
  .chat-app .chat .chat-header {
    border-radius: 0.55rem 0.55rem 0 0;
  }
  .chat-app .chat-history {
    height: 300px;
    overflow-x: auto;
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .chat-app .chat-list {
    height: 650px;
    overflow-x: auto;
  }
  .chat-app .chat-history {
    height: 600px;
    overflow-x: auto;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
  .chat-app .chat-list {
    height: 480px;
    overflow-x: auto;
  }
  .chat-app .chat-history {
    height: calc(100vh - 350px);
    overflow-x: auto;
  }
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

.form-control:focus {
  box-shadow: none;
}
.form-control::placeholder {
  color: #b5b5b5;
  font-size: 13px;
}
</style>
