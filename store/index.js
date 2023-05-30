import Vuex from "vuex"
import Cookie from "js-cookie"

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      /*loggedInUser: {
        name: "Cenk Bülbül",
        password: "Cenk123",
        team: "Frontend",
        degree: "Geliştirici"
      },*/
      loggedInUser: null,
      userList: [],
      taskList: [],
      myMeetings: null,
      issuesList: [],
      myIssues: null

    }),
    getters: {
      isAuthenticated(state) {
        return state.loggedInUser == null ? false : true
      },
      getUserList(state) {
        return state.userList
      },
      getTaskList(state) {
        return state.taskList
      },
      getMyMeetings(state) {
        return state.myMeetings
      },
      getIssuesList(state) {
        return state.issuesList
      },
      getMyIssues(state) {
        return state.myIssues
      }
    },
    mutations: {
      setLoggedUser(state, loggedUser) {

        Cookie.set("authkey", loggedUser._id)

        state.loggedInUser = loggedUser
        localStorage.setItem("user", JSON.stringify(loggedUser))
      },
      setLoggedRefreshUser(state, loggedUser) {
        state.loggedInUser = loggedUser
      },
      logout(state) {
        state.loggedInUser = null
        localStorage.removeItem("user")
        Cookie.remove("authkey")
      },
      setUserList(state, users) { //sayfa yüklendiğinde userlist güncelleniyor
        state.userList = users
      },
      setTaskList(state, tasks) { //sayfa yüklendiğinde tasklist güncelleniyor
        state.taskList = tasks
      },
      setTaskText(state, tasks) { //yalnız task text güncelleniyor
        let index = state.taskList.findIndex((task) => task._id === tasks._id)
        state.taskList[index].text = tasks.text
      },
      setTaskStatus(state, tasks) { //yalnız task durumu güncelleniyor
        let index = state.taskList.findIndex((task) => task._id === tasks._id)
        state.taskList[index].status = tasks.status
      },
      addTaskList(state, task) { //yeni bir task ekleme işleminde tasklist'e ekleniyor
        state.taskList.push(task)
      },
      setMyMeetings(state, meetings) {
        state.myMeetings = meetings[0]
      },
      setMyDeletedMeetings(state, meetings) {
        state.myMeetings = meetings
      },
      setIssuesList(state, issues) {
        state.issuesList = issues
      },
      setMyIssues(state, myissues) {
        state.myIssues = myissues
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {

        let cookie = context.req.headers.cookie.split(";").find(c => c.trim().startsWith("authkey="))
        if (cookie) {
          cookie = cookie.split("=")[1]
          console.log(cookie)

          await this.$axios.get("/users")
            .then((res) => {
              res.data.forEach((user) => {
                if (user._id == cookie) {
                  vuexContext.commit("setLoggedRefreshUser", user)
                }
              });
            })

        }

        //görevler çekiliyor
        await this.$axios.get("/tasks")
          .then((res) => {
            let taskList = []
            res.data.forEach((task) => {
              taskList.push(task)
            });
            vuexContext.commit("setTaskList", taskList)
          })

        //kullanıcılar çekilecek
        await this.$axios.get("/users")
          .then((res) => {
            let userList = []
            res.data.forEach((user) => {
              userList.push(user)
            });
            vuexContext.commit("setUserList", userList)
          })

        //sorunlar çekilecek
        await this.$axios.get("/codes")
          .then((res) => {
            vuexContext.commit("setIssuesList", res.data)
          })

        //giriş yapan kullanıcının sorunları
        if (vuexContext.state.loggedInUser != null) {
          await this.$axios.get("/codes/" + vuexContext.state.loggedInUser.name)
            .then((res) => {
              vuexContext.commit("setMyIssues", res.data)
            })
        }
      },
      async login(vuexContext, user) {
        await this.$axios.get("/users")
          .then((res) => {
            res.data.forEach((resUser) => {
              if (user.name == resUser.name && user.password == resUser.password && user.team == resUser.team && user.degree == resUser.degree) {
                vuexContext.commit("setLoggedUser", resUser)

                this.$axios.get("/codes/" + vuexContext.state.loggedInUser.name)
                  .then((res) => {
                    vuexContext.commit("setMyIssues", res.data)
                  })
              }
            })
          })
      },
      async addTask(vuexContext, task) {
        console.log(task)
        await this.$axios.post("/tasks", task)
          .then((res) => {
            vuexContext.commit("addTaskList", res.data)
          })
      },
      async updateTaskText(vuexContext, task) {
        await this.$axios.put("/tasksText/" + task._id, { text: task.text })
          .then((res) => {
            vuexContext.commit("setTaskText", res.data)
          })
      },
      async updateTaskStatus(vuexContext, task) {
        await this.$axios.put("/tasks/" + task._id, { status: !task.status })
          .then((res) => {
            vuexContext.commit("setTaskStatus", res.data)
          })
      },
      //giriş yapan kullanıcının görüşme istekleri
      async setMyMeetingsActions(vuexContext, lsId) {
        await this.$axios.get("/meetings/" + lsId)
          .then((res) => {
            vuexContext.commit("setMyMeetings", { ...res.data })
          })
      },
      async addMeetings(vuexContext, meeting) {
        await this.$axios.put("/meetings/" + meeting.userId, meeting)
      },
      //giriş yapan kullanıcının silinme durumuna göre meetings güncellenmesi
      async deleteMeetingsActions(vuexContext, context) {
        //console.log(context)
        await this.$axios.put("/deleteMeeting/" + context.lsId + "/" + context.senderid)
          .then((res) => {
            vuexContext.commit("setMyDeletedMeetings", res.data)
          })
      },
      async addCode(vuexContext, context) {
        await this.$axios.post("/codes/" + context.name, context.formData)
          .then(async (res) => {
            //console.log(res.data)
            //sorun eklendikten sonra tüm sorun verilerinin çekilmesi
            await this.$axios.get("/codes")
              .then((res) => {
                vuexContext.commit("setIssuesList", res.data)
              })
            //sorun eklendikten sonra giriş yapan kullanıcının verilerinin çekilmesi
            await this.$axios.get("/codes/" + vuexContext.state.loggedInUser.name)
              .then((res) => {
                vuexContext.commit("setMyIssues", res.data)
              })
          })
      },
      async removeIssue(vuexContext, context) {
        await this.$axios.delete("/codes/" + vuexContext.state.loggedInUser.name)
          .then(async (res) => {
            //sorun silindikten sonra tüm sorun verilerinin çekilmesi
            await this.$axios.get("/codes")
              .then((res) => {
                vuexContext.commit("setIssuesList", res.data)
              })
            //sorun silindikten sonra giriş yapan kullanıcının verilerinin çekilmesi
            await this.$axios.get("/codes/" + vuexContext.state.loggedInUser.name)
              .then((res) => {
                vuexContext.commit("setMyIssues", res.data)
              })
          })
      },
      async problemAnswer(vuexContext, context) {
        await this.$axios.put("/codes/" + context.problemOwner, { name: context.senderName, text: context.answer })
          .then((res) => {
            //soruna cevap eklendikten sonra tüm sorun verilerinin çekilmesi
            this.$axios.get("/codes")
              .then((res) => {
                vuexContext.commit("setIssuesList", res.data)
              })
          })
      }


    }
  })
}

export default createStore
