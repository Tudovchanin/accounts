<script lang="ts" setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Password from "primevue/password";

const modelLabel = ref("");
const modelPassword = ref("");
const modelLogin = ref("");

const cities = ref([{ type_record: "LDAP" }, { type_record: "Локальная" }]);
const selectedCity = ref(cities.value[0]);



// pi-trash
</script>

<template>
  <div class="wrapper-component">
    <h1>Hallo World {{ selectedCity }}</h1>
    <form class="accounts">
      <div class="accounts__field">
        <div class="accounts__input accounts__input">
          <InputText
            fluid
            size="small"
            type="text"
            placeholder="значение"
            v-model="modelLabel"
          />
        </div>
        <div class="accounts__select">
          <Select
            fluid
            size="small"
            :options="cities"
            optionLabel="type_record"
            v-model="selectedCity"
          />
        </div>
        <div class="accounts__input" :class="{'accounts__input--wide': selectedCity.type_record !== 'Локальная'}">
          <InputText fluid size="small" type="text" placeholder="значение"  v-model="modelLogin"/>
        </div>

        <div v-if="selectedCity.type_record === 'Локальная'" class="accounts__input">
          <Password
            fluid
            size="small"
            class="container"
            :inputProps="{
              autocomplete: 'current-password',
            }"
            toggleMask
            v-model="modelPassword"
          />
        </div>
        <button class="accounts__field-delete-button"><i class="pi pi-trash"></i></button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
}

.accounts {
  background-color: whitesmoke;
  padding: 20px;
  width: 1200px;
  &__field {
   display: flex;
   justify-content: space-between;
  gap: 10px;
  }
  &__input {
    width: 100%;
    max-width: 306px;
    &--wide {
      max-width: 100%;
    }
  }
  &__select {
    width: 150px;
    flex-shrink: 0;
  }
  &__field-delete-button {
    flex-shrink: 0;
    width: 50px;
  }
}
</style>
