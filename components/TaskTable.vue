 <template>
  <div class="center ms-5">
    <vs-table striped>
      <template #thead>
        <vs-tr class="d-flex align-items-center bg-light">
          <vs-row :w="12">
            <vs-col :w="2"><vs-th>Durum</vs-th></vs-col>
            <vs-col :w="2"><vs-th>İsim</vs-th></vs-col>
            <vs-col :w="7"
              ><vs-th style="width: 150px">İş Tanımı</vs-th></vs-col
            >
            <vs-col :w="1"><vs-th> </vs-th></vs-col>
          </vs-row>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          class="text-break"
          :key="i"
          v-for="(tr, i) in $vs.getPage(getTask, page, max)"
          :data="tr"
        >
          <vs-row :w="12">
            <vs-col :w="2">
              <vs-td>
                <div
                  style="width: 100px"
                  class="alert text-center"
                  :class="tr.status ? 'alert-success' : 'alert-danger'"
                >
                  <b>{{ tr.status ? "Onaylandı" : "Bekliyor" }}</b>
                </div>
              </vs-td>
            </vs-col>
            <vs-col :w="2">
              <vs-td>
                {{ tr.name }}
              </vs-td>
            </vs-col>
            <vs-col :w="7">
              <vs-td>
                {{ strip_tags(tr.text) }}
              </vs-td>
            </vs-col>
            <vs-col v-if="$store.state.loggedInUser.degree !='gelistirici'" :w="1">
              <vs-td>
                <vs-td>
                  <vs-button
                    :flat="tr.status"
                    @click="approve(getTask[i])"
                    success
                    icon
                    ><svg
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
                        d="M19.221 10.803 12 10V4a2 2 0 0 0-4 0v12l-3.031-1.212a2 2 0 0 0-2.64 1.225l-.113.34a.998.998 0 0 0 .309 1.084l5.197 4.332c.179.149.406.231.64.231H19a2 2 0 0 0 2-2v-7.21a2 2 0 0 0-1.779-1.987z"
                      ></path></svg
                  ></vs-button>
                  <vs-button @click="meeting(getTask[i])" icon>
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
                        d="M14 12c-1.095 0-2-.905-2-2 0-.354.103-.683.268-.973C12.178 9.02 12.092 9 12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-.092-.02-.178-.027-.268-.29.165-.619.268-.973.268z"
                      ></path>
                      <path
                        d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"
                      ></path>
                    </svg>
                  </vs-button>
                  <vs-button
                    icon
                    @click="
                      taskEditing = !taskEditing;
                      editedUser = tr.name;
                      editedId = tr._id
                    "
                    ><svg
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
                        d="M5 22h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2zM5 5h2v2h10V5h2v15H5V5z"
                      ></path>
                      <path
                        d="m11 13.586-1.793-1.793-1.414 1.414L11 16.414l5.207-5.207-1.414-1.414z"
                      ></path></svg
                  ></vs-button>
                </vs-td>
              </vs-td>
            </vs-col>
          </vs-row>
        </vs-tr>
        <!-- popup start-->
        <div class="center">
          <vs-dialog width="300px" not-center v-model="taskEditing">
            <template #header>
              <h4 class="not-margin">
                <b>{{ editedUser }}</b>
              </h4>
            </template>

            <div class="con-content">
              <textarea
                class="form-control w-100"
                style="background-color: #f4f7f8; width: 200px"
                placeholder="Message"
                rows="5"
                v-model="editingInput"
              ></textarea>
            </div>

            <template #footer>
              <div class="con-footer">
                <vs-button @click="edit(editedId)" transparent> Ok </vs-button>
                <vs-button @click="taskEditing = false" dark transparent>
                  Cancel
                </vs-button>
              </div>
            </template>
          </vs-dialog>
        </div>
        <!-- popup finish-->
      </template>
      <!--pagination-->
      <template #footer>
        <vs-pagination
          class="fixed-bottom mb-3"
          v-model="page"
          :length="$vs.getLength(getTask, max)"
        />
      </template>
      <!--pagination-->
    </vs-table>
  </div>
</template>




<script>
export default {
  middleware: [],
  layout: "loggedIn",
  components: {},
  data: () => ({
    //table
    page: 1,
    max: 3,
    //table
    taskEditing: false,
    editingInput: "",
    editedUser: null,
    editedId:null
  }),
  methods: {
    //ckeditörden gelen html taglarını temizleme
    strip_tags(remove) {
      return remove.replace(/(<([^>]+)>)/gi, "");
    },
    edit(_id) {
      this.taskEditing = false;
      const text = this.editingInput
      this.$store.dispatch("updateTaskText",{_id,text})
    },
    approve(task) {
      //console.log("onaylandı " + e)
      this.$store.dispatch("updateTaskStatus", task);
    },
    async meeting(usertask) {
      const idData = await this.getUser.find((user) => {
        return user.name == usertask.name;
      });

      const Meeting = {
        name: usertask.name,
        userId: idData._id,
        meetings: [
          {
            senderid: JSON.parse(localStorage.getItem("user"))._id,
            sendername: JSON.parse(localStorage.getItem("user")).name,
            status: false,
          },
        ],
      };
      this.$store.dispatch("addMeetings", Meeting);
    },
  },
  computed: {
    getTask() {
      return this.$store.getters.getTaskList;
    },
    getUser() {
      return this.$store.getters.getUserList;
    }
  },
  created() {
    if (process.client) {
      const lsId = JSON.parse(localStorage.getItem("user"))._id;
      this.$store.dispatch("setMyMeetingsActions", lsId);
    }
  },
};
</script>

<style>
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
