import Vuex from "vuex"

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      loggedInUser: {
        name: "Cenk Bülbül",
        password: "Cenk123",
        team: "Frontend",
        degree: "Geliştirici"
      },
      userList: [],
      taskList: [],
      myMeetings:null
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
      }
    },
    mutations: {
      setLoggedUser(state, loggedUser) {
        state.loggedInUser = loggedUser
        localStorage.setItem("user", JSON.stringify(loggedUser))
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
      setMyDeletedMeetings(state,meetings){
        state.myMeetings = meetings
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
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
      },
      async login(vuexContext, user) {
        await this.$axios.get("/users")
          .then((res) => {
            res.data.forEach((resUser) => {
              if (user.name == resUser.name && user.password == resUser.password) {
                vuexContext.commit("setLoggedUser", resUser)
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
      async setMyMeetingsActions (vuexContext,lsId) {
        await this.$axios.get("/meetings/" + lsId)
          .then((res) => {
            vuexContext.commit("setMyMeetings", {...res.data})
          })
      },
      async addMeetings (vuexContext,meeting) {
        await this.$axios.put("/meetings/"+ meeting.userId,meeting)
      },
      //giriş yapan kullanıcının silinme durumuna göre meetings güncellenmesi
      async deleteMeetingsActions (vuexContext,context) {
        //console.log(context)
        await this.$axios.put("/deleteMeeting/"+context.lsId+"/"+context.senderid)
          .then((res) => {
            vuexContext.commit("setMyDeletedMeetings", res.data)
          })
      },


    }
  })
}

export default createStore
