<template>
  <div class="container share">
    <div class="mt-3">
      <vs-alert>
        <h6 class="mt-2">Bugün projeye hangi katkıları sağlayacaksın?</h6>
      </vs-alert>
    </div>
    <div class="center content-inputs mt-4 w-100">
      <client-only placeholder="Today's tasks">
        <ckeditor-nuxt v-model="task" :config="editorConfig" />
      </client-only>
      <vs-button :disabled="mytask" class="float-end mt-2" @click="shareTask">
        Paylaş
      </vs-button>
      <vs-button
        :disabled="!mytask || mytask.status == true"
        success
        class="float-end mt-2"
        @click="edittedTask"
      >
        Düzenle
      </vs-button>
    </div>

    <div class="vstable center">
      <vs-table>
        <template v-if="mytask != null" #tbody>
          <vs-tr class="text-break">
            <vs-td class="w-100">
              <vs-alert warn>
                {{ strip_tags(mytask.text) }}
              </vs-alert>
            </vs-td>
            <vs-td>
              <vs-button
                v-if="mytask.status == true"
                style="width: 100px"
                success
                flat
                border
              >
                Onaylandı
              </vs-button>

              <vs-button v-else style="width: 100px" danger border>
                Bekliyor
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
        <template v-if="mytask == null" #notFound>
          <vs-alert warn> Henüz bir taskınız yok </vs-alert>
        </template>
      </vs-table>
    </div>
  </div>
</template>
  <script>
export default {
  middleware: [],
  layout: "loggedIn",
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
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
    task: "",
  }),
  methods: {
    shareTask() {
      if (this.task.length <= 0) {
        this.$toast.error('Lütfen bir görev ekleyin')
      } else {
        const task = {
          name: JSON.parse(localStorage.getItem("user")).name,
          text: this.task,
          status: false,
        };
        this.$store.dispatch("addTask", task);
        this.$toast.success('Görev Paylaşıldı')
      }
    },
    edittedTask() {
      if (this.task.length <= 0) {
        this.$toast.error('Lütfen bir görev ekleyin')
      } else {
        const task = {
          _id: this.mytask._id,
          name: this.mytask.name,
          text: this.task,
        };
        this.$store.dispatch("updateTaskText", task);
        this.$toast.success('Görev Düzenlendi')
      }
    },
    //ckeditörden gelen html taglarını temizleme
    strip_tags(remove) {
      return remove.replace(/(<([^>]+)>)/gi, "");
    },
  },
  computed: {
    mytask() {
      if (process.client) {
        const tasks = this.$store.getters.getTaskList;
        const mytask = tasks.find(
          (task) => task.name == JSON.parse(localStorage.getItem("user")).name
        );
        return mytask || null;
      }
    },
  },
};
</script>
<style>
.ck-content {
  height: 220px;
  font-size: 13px;
}
</style>
<style scoped>
.vstable {
  position: absolute;
  bottom: 30px;
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