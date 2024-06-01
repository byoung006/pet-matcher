<template>
  <div class="form-wrapper">
    <v-form @submit.prevent="submitForm">
      <h2>Create a User</h2>
      <div class="column-wrapper">
        <v-col>
          <v-row>
            <v-text-field
              v-model="user.name"
              :rules="[requiredField]"
              label="Name"
              placeholder="Enter your Name"
              clearable
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="user.age"
              :rules="[requiredField, isNumber]"
              label="Age"
              placeholder="Enter your Age"
              clearable
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="user.email"
              :rules="[requiredField]"
              label="Email"
              placeholder="Enter your password"
              clearable
            ></v-text-field>
          </v-row>
          <v-row>
            <label>
              <v-text-field
                v-model="user.password"
                :rules="[requiredField]"
                label="Password"
                placeholder="Enter your password"
                clearable
              ></v-text-field>
            </label>
          </v-row>
          <div class="button-wrapper">
            <button @click="togglePetAddition()">Add Pet</button>
          </div>
          <v-row>
            <div
              class="pet-adding-dropdown"
              v-if="showPetSelection"
              v-for="(pet, index) in user.pets"
              :key="index"
            >
              <v-text-field
                v-model="pet.petName"
                label="Pet Name"
                placeholder="What's your pet's name?"
                clearable
              ></v-text-field>

              <v-text-field
                v-model="pet.petColor"
                label="Pet Color"
                placeholder="What's your pet's color?"
                clearable
              ></v-text-field>

              <v-text-field
                v-model="pet.petAge"
                label="Pet Age"
                placeholder="What's your pet's age?"
                clearable
              ></v-text-field>
            <br/>
            <v-select label="Pet Type" :items="['dog', 'cat', 'fish', 'other']" v-model="pet.petKind">
            </v-select>
            </div>
          </v-row>
          <!-- <div style="{{marginTop:'20px'}}" class="button-wrapper">
            <button type="submit">Create User</button>
          </div> -->
        </v-col>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Vue, Component } from 'vue-facing-decorator'
import type { IUser } from '@/UserTypes'
defineComponent({
  name: 'CreateUser',
  emits: ['user']
})
@Component
export default class CreateUser extends Vue {
  user: IUser = {
    id: 0,
    name: '',
    age: 0,
    email: '',
    password: '',
    isActive: false,
    pets: [
      {
        petName: '',
        petColor: '',
        petAge: 0,
        petKind: 'dog'
      }
    ]
  }
  showPetSelection = true;
  updated() {
    console.log(this.user, 'user')
    console.log(this.showPetSelection, 'petSelection')
  }
  get requiredField() {
    return (v: string) => !!v || 'This field is required'
  }
  get isNumber() {
    return (v: number) => !isNaN(v) || 'This field must be a number'
  }
  togglePetAddition() {
    this.showPetSelection = !this.showPetSelection
  }
  public async submitForm() {
    try {
      const userObject = {
        name: this.user.name,
        age: this.user.age,
        email: this.user.email,
        password: this.user.password,
        petNames: this.user.pets
      }
     const userCreationRequest =  await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name:userObject.name,
          age: userObject.age,
          email: userObject.email,
          password: userObject.password,
          pets: userObject.petNames,
          isActive: true
        })
      })
      if (userCreationRequest.status !== 200) {
        throw new Error('User creation failed')
      }
      this.$router.push('/home')
      this.$emit('user', userObject)
      // Reset form fields after successful submission
      this.user.name = ''
      this.user.age = 0
      this.user.email = ''
      this.user.password = ''
      this.user.pets = []
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
<style scoped lang="scss">
.form-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
  background-color: inherit;
  & h2 {
    color: var(--vt-c-white-mute);
  }
}
.column-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  & .v-col {
    width: 30vw !important;
    & .v-row {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      & label {
        color: var(--vt-c-white-mute);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        width: 100%;
        & input {
          color: var(--vt-c-white-mute);
          width: 100%;
          margin: 0.5rem 0;
        }
        & input:hover {
          border: 1px solid var(--vt-c-white-mute);
        }

        & input:focus {
          border: 1px solid var(--vt-c-white-mute);
        }
      }
    }
    .button-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 2%;
      & button {
        border: 1px solid var(--vt-c-black-mute);
        border-radius: 1rem;
        color: var(--vt-c-white-mute);
        width: 100%;
        background: var(--vt-c-black-soft);
        margin: 0.5rem 0;
      }
    }
  }
  .pet-adding-dropdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    border: 1px solid var(--vt-c-black-mute);
    border-radius: 1rem;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    background-color: var(--vt-c-black-soft);
    & .v-input {
      color: var(--vt-c-white-mute);
      width: 80%;
      margin: 0.5rem 0;
    }
  }
}
</style>
