<template>
    <v-card>
      <v-card-title>{{ user.name }}</v-card-title>
      <v-card-text>
        <div>{{ user.age }}</div>
      </v-card-text>
      <v-card v-for="pet in user.petNames">
   <v-card-text>
    <div>{{ pet.petName }}</div>
    <div>{{ pet.petAge }}</div>
    <div>{{ pet.petKind }}</div>
   </v-card-text> 
    </v-card>
    </v-card>
  </template>
<script lang="ts">
import type { IUser} from '../UserTypes'

import { Vue, Prop } from 'vue-facing-decorator'


import { defineComponent } from "vue";
defineComponent({
    name: "UserComponent",
});

export default class UserClass extends Vue {

    @Prop() user: IUser = {
        id: 0,
        name: '',
        age: 0,
        isActive: false,
        petNames: []
    };

}
</script>