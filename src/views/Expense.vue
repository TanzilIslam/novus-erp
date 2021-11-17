<template>
  <div>
    <v-card class="">
      <v-card-title>
        All Expense
        <v-spacer></v-spacer>
        <v-btn color="primary"><v-icon>mdi-plus</v-icon> Add Expense</v-btn>
      </v-card-title>

      <div class="d-flex">
        <v-autocomplete
          v-model="values"
          :items="items"
          solo
          dense
          chips
          small-chips
          label="Filter"
          multiple
          color="primary"
          class="mr-4"
        ></v-autocomplete>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          :loading="loading"
          dense
          solo
        ></v-text-field>
      </div>

      <v-data-table
        dense
        :headers="headers"
        :items="items"
        :search="search"
        hide-default-footer
      >
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
    <div class="m-4 p-4">
      <v-pagination
        @next.self="nextPagination"
        @previous.self="previousPagination"
        @input.self="clickPagination"
        v-model="page"
        :length="paginationLength"
      ></v-pagination>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      page: 1,
      paginationLength: 0,
      loading: true,
      next: null,
      previous: null,
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
    this.getData(this.$endpoint.GET_ALL_EXPENSE);
  },
  methods: {
    async getData(url) {
      let items = [];
      let self = this;
      self.loading = true;
      await this.$api
        .get(url)
        .then((r) => {
          if (r.data.count > 0) {
            let z = r.data.count % 5;
            if (z !== 0) {
              let y = r.data.count - z;
              let x = y / 5;
              let w = x + 1;
              self.paginationLength = w;
            } else if (z == 0) {
              self.paginationLength = r.data.count / 5;
            }
          }
          self.next = r.data.next;
          self.previous = r.data.previous;
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
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },
    nextPagination() {
      if (this.next !== null) {
        this.getData(this.next);
      }
    },
    previousPagination() {
      if (this.previous !== null) {
        this.getData(this.previous);
      }
    },
    clickPagination() {
      this.getData(this.$endpoint.GET_ALL_EXPENSE + "?page=" + this.page);
    },
  },
};
</script>

<style scoped>
.custom-text-area >>> .v-input__slot::before {
  border-style: none !important;
}
</style>
