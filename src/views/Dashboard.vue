<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      mobile-breakpoint="960"
    >
      <v-list class="left-menu">
        <div v-for="(link, i) in links" :key="i">
          <v-list-item v-if="!link.subLinks" :to="link.to">
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="link.text" />
          </v-list-item>

          <v-list-group
            class="sub-group"
            v-else
            :key="link.text"
            :prepend-icon="link.icon"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :key="sublink.text"
            >
              <v-list-item-icon>
                <v-icon>{{ sublink.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ sublink.text }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon color="primary" @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon color="primary"
          >mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon
        >
      </v-btn>
      <v-toolbar-title
        ><v-btn to="/dashboard">
          <v-icon color="primary">mdi-home</v-icon>
        </v-btn></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-switch
        color="primary"
        class="mt-5"
        @change="toggleTheme()"
        v-model="goDark"
      ></v-switch>
      <v-btn dense icon @click="logout">
        <v-icon color="primary"> mdi-logout </v-icon>
      </v-btn>
    </v-app-bar>
    <v-container>
      <div class="mx-5 my-5">
        <v-fade-transition>
          <router-view :key="$route.fullPath" />
        </v-fade-transition>
      </div>
    </v-container>
  </v-app>
</template>

<script>
// import Cookie from "js-cookie";
export default {
  mounted() {
    // check the user type
    // if (Cookie.get("role") !== undefined) {
    //   if (Cookie.get("role") == "user") {
    //     this.items = this.itemsUser;
    //   } else if (Cookie.get("role") == "admin") {
    //     this.items = this.itemsAdmin;
    //   }
    // }
  },
  data() {
    return {
      active: "",
      goDark: false,
      clipped: true,
      drawer: true,
      fixed: false,
      items: [],
      links: [
        // {
        //   to: "/overview",
        //   icon: "mdi-view-dashboard",
        //   text: "Dashboard",
        //   active: false,
        // },
        {
          to: "/expense",
          icon: "mdi-cash-multiple",
          text: "Expense",
          active: false,
        },
        // {
        //   icon: "mdi-tennis",
        //   text: "Players",
        //   active: false,
        //   subLinks: [
        //     {
        //       text: "Players list",
        //       to: "/new-connection",
        //       icon: "mdi-tennis",
        //     },
        //     {
        //       text: "Import WTA Players",
        //       to: "/players/import",
        //       icon: "mdi-tennis",
        //     },
        //   ],
        // },
        // {
        //   to: "/tournaments",
        //   icon: "mdi-trophy",
        //   text: "Tournaments",
        // },
      ],
      itemsAdmin: [
        {
          icon: "mdi-account-group",
          title: "Users",
          to: "/users",
        },
        {
          icon: "mdi-account-clock",
          title: "Time Sheet",
          to: "/timeSheet",
        },
        {
          icon: "mdi-chart-box",
          title: "Report",
          to: "/report",
        },
      ],
      miniVariant: false,
      right: true,
    };
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = this.goDark;
    },
    logout() {
      localStorage.clear();
      //   Cookie.remove("uid");
      //   Cookie.remove("role");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped></style>
