<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }">
      <img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link class='author' :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }">
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <template v-if='article.author.username !== user.username'>
      <button class="btn btn-sm btn-outline-secondary" v-if='!article.author.following' @click='toFollow' :disabled='loading'>
          <i class="ion-plus-round"></i>
          &nbsp; Follow {{article.author.username}}
      </button>
      <button class="btn btn-sm btn-outline-secondary" v-else @click='toFollow'>
        <i class="ion-plus-round"></i>
          &nbsp; Unfollow {{article.author.username}}
      </button>
    </template>
    <button class="btn btn-sm btn-outline-secondary" v-else @click='toEdit(article.slug)'>
        <i class="ion-edit"></i>
        &nbsp; Edit Article
    </button>
    &nbsp;
    <button class="btn btn-sm btn-outline-primary" :class="{ active: article.favorited }" @click="onFavorite(article)" :disabled='faloading' v-if='article.author.username !== user.username'>
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">{{article.author.favoritesCount}}</span>
    </button>
    <button v-else class='btn btn-outline-danger btn-sm' @click='deleteHandler(article.slug)'>
      <i class="ion-trash-a"></i>
      &nbsp; Delete Article
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { follow } from "@/api/user.js";
import {
  deleteFavorite,
  addFavorite,
  deleteArticle
} from "@/api/article";
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["user"])
  },
  data() {
    return {
      loading: false,
      faloading: false
    }
  },
  methods: {
    async toFollow() {
      this.loading = true;
      let method = this.article.author.following ? "DELETE" : "POST";
      await follow({ method, username: this.user.username });
      this.loading = false;
      this.article.author.following = !this.article.author.following
    },
    toEdit(slug) {
      this.$router.push({
        name: 'editor',
        params: {
          slug: slug
        },
      })
    },
    async onFavorite(article) {
      this.faloading = true;
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount -= 1;
        this.faloading = false;
      } else {
        // 点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
        this.faloading = false;
      }
    },
    async deleteHandler(slug) {
      await deleteArticle(slug);
      this.$router.push({
        name: 'home'
      })
    }
  }
};
</script>

<style lang="less">
</style>
