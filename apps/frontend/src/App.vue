<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      dark
    >
      <v-container>
        <v-row class="justify-left" no-gutters>
          <v-col cols="2" sm="2" md="2">
            <div class="d-flex align-center">
              <v-img
                alt="Instagram Icon"
                class="shrink mt-1"
                min-width="30"
                src="http://192.168.10.33:7070/media/files/root/2022/3/instagram-XfpkjL.png"
                width="120"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <Posts />
    </v-main>
  </v-app>
</template>

<script>
import Posts from './components/Posts';

export default {
  name: 'App',
  components: {
    Posts,
  },
};
</script>
