<template>
  <v-app>
    <toast />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Toast from "@/components/Toast.vue";
export default {
  name: "App",
  components: { Toast },
  data: () => ({
    //
  }),
};
</script>
<style></style>
