<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="image" class="user-img" />
            <h4>{{ username }}</h4>
            <p>
              {{ bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn" v-if="user.username !== username" @click="toFollow" :disabled="loading">
              <template v-if="!following">
                <i class="ion-plus-round"></i>
                &nbsp; Follow {{ username }}
              </template>
              <template v-else>
                <i class="ion-plus-round"></i>
                &nbsp; Unfollow {{ username }}
              </template>
            </button>
            <button class="btn btn-sm btn-outline-secondary action-btn" v-else @click="toEdit">
              <i class="ion-plus-round"></i>
              &nbsp; Edit Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link" :class="{
                    active: tab === 'my_articles',
                  }" exact :to="{
                    name: 'profile',
                    params: {
                      username: username,
                    },
                    query: {
                      tab: 'my_articles',
                    },
                  }">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <!-- <a class="nav-link" href="">Favorited Articles</a> -->
                <nuxt-link class="nav-link" :class="{
                    active: tab === 'favorited_articles',
                  }" exact :to="{
                    name: 'profile',
                    params: {
                      username: username,
                    },
                    query: {
                      tab: 'favorited_articles',
                    },
                  }">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <!-- <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div> -->
          <article-item v-for="article in articles" :article="article" :key="article.slug"></article-item>
          <ul class="pagination" v-if='totalPage > 1'>
            <li class="page-item" v-for="item in totalPage" :key="item" :class="{ active: item === page }">
              <nuxt-link class="page-link" :to="{
                  name: 'profile',
                  params: {
                    username: username,
                  },
                  query: {
                    tab,
                    page: item
                  },
                }">
                {{ item }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserprofile, follow } from "@/api/user.js";
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  middleware: "authenticated",
  name: "UserProfile",
  components: {
    ArticleItem
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    }
  },
  watchQuery: ["tab", "page"],
  async asyncData({ params, store, query }) {
    // console.log(query)
    const page = Number.parseInt(query.page || 1);
    const tab = query.tab || "my_articles";
    const limit = 5;
    const author = params.username;
    const favorited = params.username;
    const paramsback =
      tab === "my_articles"
        ? {
            limit,
            author,
            offset: (page - 1) * limit
          }
        : {
            limit,
            favorited,
            offset: (page - 1) * limit
          };
    const [getUserprofileRes, articleRes] = await Promise.all([
      getUserprofile(author),
      getArticles(paramsback)
    ]);
    const { image, bio, following, username } = getUserprofileRes.data.profile;
    const { articles, articlesCount } = articleRes.data;
    return {
      image,
      bio,
      following,
      username,
      tab,
      articles,
      articlesCount,
      limit,
      page
    };
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    toEdit() {
      this.$router.push("/settings");
    },
    async toFollow() {
      this.loading = true;
      let method = this.following ? "DELETE" : "POST";
      let { data } = await follow({ method, username: this.username });
      this.loading = false;
      this.following = data.profile.following;
    }
  }
};
</script>

<style>
</style>