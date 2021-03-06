<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ul class="error-messages">
            <template v-for='(messages, field) in errors'>
              <li v-for='(message, index) in messages' :key='index'>
                {{field}} {{message}}
              </li>
            </template>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model='form.image' />
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model='form.username' />
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model='form.bio'></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model='form.email' />
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model='form.password' />
              </fieldset>
              <fieldset class="form-group">
                <button class="btn btn-lg btn-primary pull-xs-right" @click='updateHandler' type="button">
                  Update Settings
                </button>
              </fieldset>
              <fieldset class="form-group">
                <hr>
                <button class='btn btn-outline-danger' @click='logout' type="button">
                  Or click here to logout.
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { userApi, getUserprofile } from "@/api/user.js";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "authenticated",
  name: "SettingsIndex",
  computed: {
    ...mapState(["user"])
  },
  data() {
    return {
      errors: [],
      password: "",
      form: {
        username: "",
        email: "",
        image: "",
        bio: ""
      }
    };
  },
  mounted() {
    console.log(this.user);
    this.form.username = this.user.username;
    this.form.email = this.user.email;
    this.form.image = this.user.image;
    this.form.bio = this.user.bio;
  },
  methods: {
    logout() {
      Cookie.remove('user')
      this.$store.commit("setUser", null);
      this.$router.push("/");
    },
    async updateHandler() {
      if (this.password) {
        this.form.password = this.password;
      }
      let res = await userApi({ user: this.form });
      if (!res.errors) {
        let userRes = await getUserprofile(this.form.username);
        this.$store.commit('setUserItem', userRes.data.profile);
        this.$router.push(`/profile/${this.form.username}`);
      }
    }
  }
};
</script>

<style>
</style>