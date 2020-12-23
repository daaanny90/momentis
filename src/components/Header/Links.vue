<template>
  <div>
    <h3 class="links" @click="toggleTooltip()">Links</h3>
    <div class="tooltip-links hide">
      <ul class="tooltip-links__list">
        <li class="link-item d-flex justify-content-between align-items-center" v-for="link in links" :key="link.id">
          <a :href=link.url>{{ link.name }}</a>
          <b-icon class="ml-3 edit-link"
                  icon="three-dots"
                  @click="linkName = link.name; linkUrl = link.url; linkID = link.id"
                  v-bind:id="'popover-target-' + link.id"
          >
          </b-icon>
          <LinkPopover :link-data="link"
                       v-on:link-to-edit="linkToEdit($event)"
                       v-on:link-deleted="updateLinkList($event)"
          />
        </li>
      </ul>
      <div class="tooltip-links__footer">
        <b-button class="btn add-new-link"
                  variant="light"
                  v-b-modal.modal-link
                  block
                  @click="clearData"
        >
          + New Link
        </b-button>
      </div>
    </div>
    <LinkModal v-on:link-added="linkAdded($event)"
               v-on:link-modified="updateLinkList($event)"
               :modal-text="modalText"
               :link-name="linkName"
               :link-url="linkUrl"
               :link-id="linkID"
               :modify-link="modifyLink"
    />
  </div>
</template>

<script>
import {isCookieHere} from "@/plugins/isCookieHere";
import {getCookie} from "@/plugins/getCookie";
import LinkModal from "@/components/LinkModal";
import LinkPopover from "@/components/Header/LinkPopover";

export default {
  name: 'Links',
  components: {
    LinkPopover,
    LinkModal
  },
  data() {
    return {
      links: [],
      modalText: '',
      linkName: '',
      linkUrl: '',
      linkID: 0,
      modifyLink: false
    };
  },
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
    initializeLinkData() {
      if (isCookieHere('links')) {
        this.links = JSON.parse(getCookie('links'))
      }
    },
    linkToEdit(data) {
      this.modalText = data.modalText
      this.modifyLink = true
    },
    linkAdded(data) {
      this.links.push({...data})
    },
    updateLinkList(data) {
      this.links = data
    },
    clearData() {
      this.modifyLink = false
      this.linkName = ''
      this.linkID = 0
      this.linkUrl = ''
      this.modalText = 'Add Link'
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

.tooltip-links__list {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
}

.tooltip-links__list .link-item {
  margin-bottom: .5em;
}

.tooltip-links__list .link-item .edit-link {
  cursor: pointer;
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