import Vuex from "vuex"

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      loggedInUser: {
        id: 1,
        name: "Cenk",
        password: "şifre",
        team: "Frontend",
        degree: "Geliştirici"
      },
      userList: [],
      taskList: []
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
      }
    },
    mutations: {
      setUserList(state, users) {
        state.userList = users
      },
      setTaskList(state, tasks) {
        state.taskList = tasks
      },
      setTask(state,tasks){
        let index =  state.taskList.findIndex((task) => task._id === tasks._id)
        state.taskList[index].status = tasks.status
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
      async updateTask(vuexContext,task){
        await this.$axios.put("/tasks/"+task._id,{status:!task.status})
          .then((res) => {
            vuexContext.commit("setTask",res.data)
          })
      }
    }
  })
}

export default createStore
