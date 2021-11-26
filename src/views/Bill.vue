<template>
  <div>
    <v-card class="">
      <v-card-title>
        Bill
        <v-spacer></v-spacer>
        <v-btn color="primary"><v-icon>mdi-plus</v-icon> Add Bill</v-btn>
      </v-card-title>
      <div class="d-flex px-4 mb-4">
        <v-autocomplete
          v-model="filterMonth"
          :items="monthList"
          solo
          dense
          chips
          small-chips
          label="Filter By Month"
          color="primary"
          class="mr-4 mb-4"
          clearable
          deletable-chips
          @change="selectMonth"
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
      <v-data-table dense :headers="headers" :items="items" :search="search">
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
        @next="nextPagination"
        @previous="previousPagination"
        @input="clickPagination"
        v-model="page"
        :length="paginationLength"
        :total-visible="8"
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
      filterMonth: null,

      headers: [
        {
          text: "User ID",
          align: "start",
          value: "user_id",
        },
        {
          text: "Payment Method",
          value: "payment_method",
        },
        {
          text: "Payment Status",
          value: "payment_status",
        },
        { text: "Package Name", value: "package_name" },
        { text: "Package Price", value: "package_price" },
        { text: "Date", value: "date" },
        { text: "Month", value: "month" },
        { text: "Description", value: "description" },

        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [],
      clone_items: [],
      monthList: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  async created() {
    await this.getData(this.$endpoint.GET_Bill);
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
            let items_per_page = r.data.results.length;
            let z = r.data.count % items_per_page;
            if (z !== 0) {
              let y = r.data.count - z;
              let x = y / items_per_page;
              let w = x + 1;
              self.paginationLength = w;
            } else if (z == 0) {
              self.paginationLength = r.data.count / items_per_page;
            }
          }
          self.next = r.data.next;
          self.previous = r.data.previous;
          r.data.results.forEach((element) => {
            element.payment_method = element.payment_method.methosd;
            element.package_name = element.Pack_name.pkgnamebill;
            element.package_price = element.pkg.pkg_list;
            element.month = element.month.month;
            element.date = moment(element.pay_date).format("DD-MM-YYYY");
            items.push(element);
          });
          self.clone_items = items;
          self.items = items;
          self.loading = false;
        })
        .catch((e) => {
          this.$emitter.publish("TOAST", { msg: e, error: true });
        });
    },
    async getDataOfExpenseList(url) {
      let self = this;
      await this.$api
        .get(url)
        .then((r) => {
          r.data.forEach((element) => {
            self.expenseList.push(element);
          });
        })
        .catch((e) => {
          this.$emitter.publish("TOAST", { msg: e, error: true });
        });
    },
    async selectMonth() {
      if (this.filterMonth == null) {
        await this.getData(this.$endpoint.GET_Bill);
        this.page = 1;
      } else {
        await this.getData(this.$endpoint.SEARCH + this.filterMonth);
        this.page = 1;
      }
    },

    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },
    async nextPagination() {
      if (this.next !== null) {
        await this.getData(this.next);
      }
    },
    previousPagination() {
      if (this.previous !== null) {
        this.getData(this.previous);
      }
    },
    clickPagination() {
      if (this.filterValue == null) {
        this.getData(this.$endpoint.GET_Bill + "?page=" + this.page);
      } else {
        let query = this.filterValue.replace(" ", "+");
        this.getData("query?page=" + this.page + "&search=" + query);
      }
    },
  },
};
</script>

<style scoped>
.custom-text-area >>> .v-input__slot::before {
  border-style: none !important;
}
</style>
