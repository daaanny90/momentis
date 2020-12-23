<template>
  <h3 class="links" @click="toggleTooltip()">Links</h3>
  <div class="tooltip-links hide">
    <ol class="tooltip-links__list">
    </ol>
    <div class="tooltip-links__footer">
      <button type="button" class="btn add-new-link" data-toggle="modal" data-target="#linkModal">
        + New Link
      </button>
    </div>
  </div>
</template>

<script>
import {isCookieHere} from "@/plugins/isCookieHere";
import {getCookie} from "@/plugins/getCookie";

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
    addLinkToList(name, url) {
      let list = document.querySelector('.tooltip-links__list')
      let li = document.createElement("li")
      let linkElement = document.createElement("a")
      linkElement.appendChild(document.createTextNode(name));
      linkElement.title = name
      linkElement.href = url
      li.appendChild(linkElement)
      list.appendChild(li)
    },
    initializeLinkData() {
      if(isCookieHere('links')) {
        let linkList = JSON.parse(getCookie('links'))
        for(let link of linkList) {
          this.addLinkToList(link.name, link.url)
        }
      }
    }
  },
  mounted() {
    this.initializeLinkData()
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