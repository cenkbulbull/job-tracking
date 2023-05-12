<template>
  <div class="container share">
    <div class="mt-3">
      <vs-alert>
        <h6 class="mt-2">Bugün projeye hangi katkıları sağlayacaksın?</h6>
      </vs-alert>
    </div>
    <div class="center content-inputs mt-4 w-100">
      <client-only placeholder="Today's tasks">
        <ckeditor-nuxt
          v-if="!mytasks[0].task"
          v-model="task"
          :config="editorConfig"
        />
        <ckeditor-nuxt
          v-if="mytasks[0].task"
          v-model="mytasks[0].task"
          :config="editorConfig"
        />
      </client-only>
      <vs-button
        :disabled="mytasks[0].task"
        class="float-end mt-2"
        @click="shareTask"
      >
        Paylaş
      </vs-button>
      <vs-button
        :disabled="!mytasks[0].task"
        success
        class="float-end mt-2"
        @click="edittedTask"
      >
        Düzenle
      </vs-button>
    </div>

    <div class="vstable center">
      <vs-table>
        <template #tbody>
          <vs-tr
            class="text-break"
            :key="i"
            v-for="(tr, i) in mytasks"
            :data="tr"
          >
            <vs-td>
              <vs-alert warn>
                {{ strip_tags(tr.task) }}
              </vs-alert>
            </vs-td>
            <vs-td>
              <vs-button
                v-if="tr.status == true"
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
        <template #notFound>
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
    mytasks: [
      {
        id: 1,
        task: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia recusandae iusto soluta nulla quisquam. Hic exercitationem veritatis temporibus voluptates repellendus, incidunt nemo totam molestias neque inventore et nesciunt optio doloribus dolore quia pariatur obcaecati deserunt dolorum laudantium error sequi vitae!adipisicing elit. Mollitia recusandae iusto soluta nulla quisquam. Hic exercitationem veritatis temporibus voluptates repellendus, incidunt nemo totam molestias neque inventore et nesciunt optio doloribus dolore quia pariatur obcaecati deserunt dolorum laudantium error sequi vitae!",
        status: false,
      },
    ],
  }),
  methods: {
    shareTask() {
      console.log("task paylaşıldı");
    },
    edittedTask(){
      console.log("task düzenlendi");
    },
    //ckeditörden gelen html taglarını temizleme
    strip_tags(remove) {
      return remove.replace(/(<([^>]+)>)/gi, "");
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