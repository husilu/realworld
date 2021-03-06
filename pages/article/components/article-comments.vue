<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model='commentVal'></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click='postCommentHandler' type="button">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for='item in comments' :key='item.id'>
      <div class="card-block">
        <p class="card-text">{{item.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: item.author.username
          }
        }" class="comment-author">
          <img :src="item.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: item.author.username
          }
        }" class="comment-author">
          {{ item.author.username }}
        </nuxt-link>
        <span class="date-posted">{{item.createdAt | date('MMM DD, YYYY')}}</span>
        <span class="mod-options">
          <!-- <i class="ion-edit"></i> -->
          <i class="ion-trash-a" v-if='item.author.username === user.username' @click='deleteComHandler(item.id)'></i>
        </span>
      </div>
    </div>
  </div>
  <!--  -->
</template>

<script>
import { mapState } from "vuex";
import { getComments, postComment, deleteComment } from "@/api/article";
export default {
  name: "ArticleComments",
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
      comments: [], // 文章列表
      commentVal: ''
    };
  },
  async mounted() {
    this.getComments();
  },
  methods: {
    async postCommentHandler() {
      let res = await postComment({slug: this.article.slug, comment: this.commentVal});
      console.log(res)
      this.commentVal = '';
      this.getComments();
    },
    async getComments() {
      const { data } = await getComments(this.article.slug);
      this.comments = data.comments;
    },
    async deleteComHandler(id) {
      await deleteComment(this.article.slug, id)
      this.getComments();
    }
  }
};
</script>

<style lang="less">
</style>
