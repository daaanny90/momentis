<template>
  <b-popover class="d-flex flex-column" :target="'popover-target-' + linkData.id" triggers="click" placement="right">
    <b-button size="sm"
              @click="editLink(linkData)"
              class="btn button-edit-link"
              variant="light"
              v-b-modal.modal-link>
      Edit
    </b-button>
    <b-button size="sm"
              class="btn button-delete-link"
              variant="light"
              @click="deleteLink"
    >
      Delete
    </b-button>
  </b-popover>
</template>

<script>
import {getCookie} from "@/plugins/getCookie";
import {cookieExpirationDate} from "@/plugins/cookieExpirationDate";

export default {
  name: 'LinkPopover',
  props: [
      'linkData'
  ],
  methods: {
    editLink(data) {
      data.modalText = 'Edit Link'
      this.$emit('link-to-edit', data)
    },
    deleteLink() {
      let linkList = JSON.parse(getCookie('links'))
      let foundLinkIndex = linkList.findIndex(x => x.id === this.linkData.id)

      linkList.splice(foundLinkIndex, 1)
      document.cookie = 'links=' + JSON.stringify(linkList) + ';expires=' + cookieExpirationDate(50)
      this.$emit('link-deleted', linkList)
    }
  }
}
</script>