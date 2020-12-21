<template>
  <h3 class="links" @click="toggleTooltip()">Links</h3>
  <div class="tooltip-links hide">
    <ol class="tooltip-links__list">
    </ol>
    <div class="tooltip-links__footer">
      <button type="button" class="btn add-new-link" data-toggle="modal" data-target="#newLinkModal">
        + New Link
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Links',
  methods: {
    toggleTooltip() {
      let tooltip = document.querySelector('.tooltip-links');
      if (tooltip.classList.contains('hide')) {
        tooltip.classList.remove('hide')
        tooltip.classList.add('show')
      } else {
        tooltip.classList.add('hide')
        tooltip.classList.remove('show')
      }
    },
  },
  mounted() {
  }
}
</script>

<style type="scss">
.links {
  cursor: pointer;
}

.tooltip-links {
  background-color: white;
  position: absolute;
  left: 8px;
  top: 3em;
  padding: 1em;
  border-radius: 5px;
  color: #222;
  flex-direction: column;
  align-items: flex-start;
}

.input-form {
  background-color: white;
  border-radius: 5px;
}

.input-form.inactive {
  transform: translateX(110%);
}

.input-form.active {
  transform: translateX(0);
}

.tooltip-links.move-out {
  transform: translateX(-110%);
}

.tooltip-links.move-in {
  transform: translateX(0);
}

.show {
  display: flex;
}

.hide {
  display: none;
}
</style>