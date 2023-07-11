<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    additional: {
      type: Boolean,
      default: false
    }
  },
  render(h, context) {
    const { icon, title, additional } = context.props
    const vnodes = []
    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
      if (additional) {
        vnodes.push(<i class={'menu-icon-additional'}></i>)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
.menu-icon-additional {
  width: 20px;
  height: 20px;
  position: absolute;
}
.menu-icon-additional::before {
  width: 10px;
  height: 10px;
  right: -2px;
  bottom: 0;
  content: " ";
  border-radius: 10px;
  position: absolute;
  background-color: #FFCC2C;
}
</style>
