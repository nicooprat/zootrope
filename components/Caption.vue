<template>
  <li class="caption" :style="{'--delay': Math.min(500, Math.max(0, (index-initialIndex)*50)) + 'ms'}">
    <a :href="`#${index}`" @click.prevent.stop="activate">
      {{caption.text}}
    </a>
  </li>
</template>

<script>
export default {
  props: ['index', 'caption', 'initialIndex'],
  data() {
    return {
      scene: null
    }
  },
  mounted() {
    const firstSibling = this.$el.parentNode.firstElementChild
    const offset = firstSibling.offsetTop / window.innerHeight

    this.$emit('addScene', {
      triggerElement: this.$el,
      duration: () => this.$el.clientHeight - 1,
      triggerHook: offset,
      index: this.index,
    })

    if(this.$store.state.currentIndex === this.index) {
      this.$emit('scrollToIndex', this.index)
    }
  },
  destroyed() {
    this.$emit('removeScene', this.index)
  },
  methods: {
    activate() {
      this.$emit('scrollToIndex', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
  li {
    margin: 1px 0 0 0;
    position: relative;
    animation: appear 250ms var(--delay) both paused;

    &[data-ready] {
      animation-play-state: running;
    }

    &[data-active] {
      background-color: rgba(0,0,0,.05);
    }

    &:not([data-loaded]):after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: #f8fafd;
      opacity: .75;
    }

    &[data-space] {
      margin-top: 5vh;
    }
  }

  a {
    display: block;
    text-decoration: none;
    color: inherit;
    padding: 2.5vh .5em;
  }

  @keyframes appear {
    from {
      opacity: 0;
      transform: translateY(5vh);
    }
    to {
      opacity: 1;
    }
  }
</style>
