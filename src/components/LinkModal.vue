<template>
  <div class="modal fade" id="linkModal" tabindex="-1" role="dialog" aria-labelledby="linkModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newLinkModalLabel">Add new link</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <label for="link-name">Name</label>
          <input type="text" id="link-name" class="form-control" aria-label="Name">
          <label for="link-url">Link</label>
          <input type="text" id="link-url" class="form-control" aria-label="Link">

        </div>
        <div class="modal-footer">
          <button type="button" class="btn" @click="addNewLink">Add Link</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isCookieHere} from '@/plugins/isCookieHere'
import {cookieExpirationDate} from '@/plugins/cookieExpirationDate'
import {getCookie} from "@/plugins/getCookie";

export default {
  name: 'LinkModal',
  data() {
    return {
      linkJson: {
        name: '',
        url: ''
      }
    }
  },
  methods: {
    addNewLink() {
      this.linkJson.name = document.querySelector('#link-name').value
      this.linkJson.url = document.querySelector('#link-url').value

      if (!isCookieHere('links')) {
        document.cookie = 'links=[' + JSON.stringify(this.linkJson) + '];expires=' + cookieExpirationDate(50)
        this.addLinkToList(this.linkJson.name, this.linkJson.url)
      } else {
        let linkList = JSON.parse(getCookie('links'))
        linkList.push(this.linkJson)
        document.cookie = 'links=' + JSON.stringify(linkList) + ';expires=' + cookieExpirationDate(50)
        this.addLinkToList(this.linkJson.name, this.linkJson.url)
      }
    }
  },
  mounted() {
    this.initializeLinkData()
  }
}
</script>

<style>
.form-control {
  border: 0;
  border-bottom: 2px solid black;
  border-radius: 0;
  text-align: center;
  padding: 0;
  margin-bottom: 1em;
}

.modal-header {
  border-bottom: none;
  padding: 1em 1em 0;
}

.modal-footer {
  border-top: 0;
  padding: 0 1em 1em;
}

.modal-body label {
  margin: 0;
}
</style>