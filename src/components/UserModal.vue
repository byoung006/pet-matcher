<template>
  <Transition mode="out-in" name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          {{ user.name }}

          <v-badge v-if="user.isActive" dot color="success">
            <v-icon>mdi-home-outline</v-icon>
          </v-badge>
        </div>

        <div class="modal-body">
          {{ user.age }}
        </div>

        <div class="pet-list-wrapper">
          <div v-if="user.pets" class="pet-list" v-for="(pets, index) in user.pets">
            <v-list-item-subtitle>{{ ` ${pets.petName} • ${pets.petAge} ` }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{
              ` ${pets.petKind == 'cat' ? '🐱' : '🐶'}`
            }}</v-list-item-subtitle>
          </div>
          <div v-if="!user.pets.length">No Pets - Yet!</div>
        </div>
        <div class="modal-footer">
          <button class="modal-default-button-right" @click="$emit('match')">Match</button>
          <button class="modal-default-button-left" @click="$emit('no-thanks')">No Thanks</button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts">
import type { IUser } from '@/UserTypes'
import { Vue, Component, Prop } from 'vue-facing-decorator'
import { defineComponent } from 'vue'

@Component({
  name: 'UserModal',
  emits: ['match', 'no-thanks']
})
export default class UserModal extends Vue {
  @Prop() show: boolean = false
  @Prop() user: IUser = {
    id: 0,
    name: '',
    age: 0,
    isActive: false,
    pets: [{ petName: '', petColor: '', petAge: 0, petKind: 'dog' }]
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button-right {
  float: right;
}
.modal-default-button-left {
  float: left;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: translateX(-50%);
}
</style>
