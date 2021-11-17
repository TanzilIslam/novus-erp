<template>
  <div>
    <v-card>
      <v-card-title>
        All Expense
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          :loading="loading"
        ></v-text-field>
      </v-card-title>

      <v-data-table :headers="headers" :items="items" :search="search">
        <template v-slot:[`item.description`]="{ item }">
          <v-textarea
            readonly
            no-resize
            auto-grow
            dense
            v-model="item.description"
            rows="1"
            row-height="15"
            class="custom-text-area"
          >
          </v-textarea>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      loading: true,
      search: "",
      headers: [
        {
          text: "Date",
          align: "start",
          value: "date",
        },
        { text: "Type", value: "cost_profile" },
        { text: "Cost", value: "cost" },
        { text: "Description", value: "description" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [],
    };
  },
  async created() {
    let items = [];
    let self = this;
    await this.$api
      .get(this.$endpoint.GET_ALL_EXPENSE)
      .then((r) => {
        r.data.results.forEach((element) => {
          element.cost_profile = element.cost_profile.cost_name;
          element.date = moment(element.date).format("DD-MM-YYYY");
          items.push(element);
        });
        self.items = items;
        self.loading = false;
      })
      .catch((e) => {
        this.$emitter.publish("TOAST", { msg: e, error: true });
      });
  },
  methods: {
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },
  },
};
</script>

<style scoped>
.custom-text-area >>> .v-input__slot::before {
  border-style: none !important;
}
</style>
