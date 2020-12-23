<template>
  <b-modal id="modal-link" :title=modalText hide-footer>
    <label for="link-name">Name</label>
    <input type="text" id="link-name" class="form-control" aria-label="Name" :value="linkName">
    <label for="link-url">Link</label>
    <input type="text" id="link-url" class="form-control" aria-label="Link" :value="linkUrl">
    <div v-if="modifyLink">
      <b-button class="mt-3" variant="light" @click="editLink()" block>Edit Link</b-button>
    </div>
    <div v-else>
      <b-button class="mt-3" variant="light" @click="addNewLink()" block>Add Link</b-button>
    </div>
  </b-modal>
</template>

<script>
import {isCookieHere} from '@/plugins/isCookieHere'
import {cookieExpirationDate} from '@/plugins/cookieExpirationDate'
import {getCookie} from "@/plugins/getCookie";

export default {
  name: 'LinkModal',
  props: [
    'modalText',
    'linkName',
    'linkUrl',
    'modifyLink',
    'linkId'
  ],
  data() {
    return {
      linkJson: {
        id: 0,
        name: '',
        url: ''
      }
    }
  },
  methods: {
    addNewLink() {
      this.linkJson.id = Date.now()
      this.linkJson.name = document.querySelector('#link-name').value
      this.linkJson.url = document.querySelector('#link-url').value

      if (!isCookieHere('links')) {
        document.cookie = 'links=[' + JSON.stringify(this.linkJson) + '];expires=' + cookieExpirationDate(50)
      } else {
        let linkList = JSON.parse(getCookie('links'))
        linkList.push(this.linkJson)
        document.cookie = 'links=' + JSON.stringify(linkList) + ';expires=' + cookieExpirationDate(50)
      }
      this.$emit('link-added', this.linkJson)
    },
    editLink() {
      let newName = document.querySelector('#link-name').value
      let newUrl = document.querySelector('#link-url').value
      let linkList = JSON.parse(getCookie('links'))
      let foundLinkIndex = linkList.findIndex(x => x.id === this.linkId)

      linkList[foundLinkIndex].name = newName;
      linkList[foundLinkIndex].url = newUrl;

      document.cookie = 'links=' + JSON.stringify(linkList) + ';expires=' + cookieExpirationDate(50)

      this.$emit('link-modified', linkList)
    }
  }
}
</script>

<style>
.modal-content .form-control {
  border: 0;
  border-bottom: 2px solid black;
  border-radius: 0;
  text-align: center;
  padding: 0;
  margin-bottom: 1em;
}

.modal-content .modal-header {
  border-bottom: none;
  padding: 1em 1em 0;
}

.modal-content .modal-footer {
  border-top: 0;
  padding: 0 1em 1em;
}

.modal-body label {
  margin: 0;
  text-align: center;
  display: block;
}
</style>