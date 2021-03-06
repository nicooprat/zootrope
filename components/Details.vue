<template>
  <header :data-visible="visible">
    <nuxt-link class="back" to="/" title="Back home">
      <svg width="24" height="24" viewBox="0 0 24 24"><path transform="rotate(180) translate(-24,-24)" fill="currentColor" d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg>
    </nuxt-link>
    <a class="title" :href="`//youtu.be/${video.details.videoId}`">
      <small>{{video.details.author.replace(/\+/g, ' ')}}</small>
      <strong>{{video.details.title.replace(/\+/g, ' ')}}</strong>
    </a>
    <label for="switchLang" v-if="video.captions">
      <strong>{{lang}}</strong>
      <svg v-if="video.captions.length > 1" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
      <select v-if="video.captions.length > 1" v-on:change="switchLang" id="switchLang">
        <option v-for="caption in video.captions" v-bind:key="caption.vssId" :value="caption.languageCode" :selected="lang === caption.languageCode">
          {{caption.name.simpleText.replace(/\+/g, ' ')}}
        </option>
      </select>
    </label>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['video', 'lang', 'currentIndex']),
  data() {
    return {
      visible: true
    }
  },
  watch: {
    currentIndex(index, oldIndex) {
      this.visible = index < oldIndex
    }
  },
  methods: {
    async switchLang(e) {
      await this.$store.dispatch('switchCaptions', {
        videoID: this.$store.state.videoID,
        lang: e.target.value
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    max-width: 45rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    position: fixed;
    justify-content: space-between;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background: #f8fafd;
    box-shadow: 0 0 0 1px rgba(black,.1);
    transform: translateY(0%);
    transition: transform 350ms;

    &:not([data-visible]) {
      transform: translateY(100%);
    }
  }

  .back {
    flex: 0 0 auto;
    display: flex;
    padding: 1em;
    color: inherit;
    outline: none;

    &:hover,
    &:focus {
      color: #f9183d;
    }

    svg {
      margin: auto;
      width: 1em;
      height: 1em;
    }
  }

  .title {
    flex: 1 1 auto;
    font-size: 1em;
    font-weight: normal;
    margin: 0;
    color: inherit;
    text-decoration: none;
    padding: 1em;
    overflow: hidden;
    outline: none;
    text-align: center;

    &:hover,
    &:focus {
      color: #f9183d;
    }

    strong, small {
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  small {
    font-size: 1em;
    opacity: .5;
  }

  label {
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    padding: 1em;
    cursor: pointer;
    position: relative;
    outline: none;

    &:hover,
    &:focus {
      color: #f9183d;
    }

    strong {
      text-transform: uppercase;
      letter-spacing: .05em;
    }

    svg {
      width: 0.8em;
      height: 0.8em;
      margin-left: .5em;
      opacity: .5;
    }
  }

  select {
    position: absolute;
    opacity: 0;
    top: 0; left: 0;
    width: 100%; height: 100%;
    cursor: pointer;
  }
</style>
