<script setup lang='ts'>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Password from "primevue/password";
import type { TypeRecord, } from "@/stores/accounts.store";

type AccountProps = {
  id: string;
  labels: string;
  type_record: TypeRecord;
  login: string;
  password: string | null;
  optionsSelect: string[];
  hidePasswordOnTypeRecord?: TypeRecord;
};

const props = defineProps<AccountProps>()
const modelAccount = ref({
  label: props.labels,
  typeRecord: props.type_record,
  login: props.login,
  password: props.password,
})
const emit = defineEmits(['delete-account']);

const emitDeleteAccount = () => {
  emit("delete-account", props.id)
}

</script>
<template>

  <div class="accounts">
    <div class="accounts__input">
      <InputText fluid size="small" type="text" placeholder="значение" v-model="modelAccount.label" />
    </div>
    <div class="accounts__select">
      <Select fluid size="small" :options="optionsSelect" v-model="modelAccount.typeRecord" />
    </div>
    <div class="accounts__input" :class="{
      'accounts__input--wide': modelAccount.typeRecord === props.hidePasswordOnTypeRecord,
    }">
      <InputText fluid size="small" type="text" placeholder="значение" :inputProps="{
        autocomplete: 'username',
      }" v-model="modelAccount.login" />
    </div>

    <div v-if="hidePasswordOnTypeRecord !== modelAccount.typeRecord" class="accounts__input">
      <Password fluid size="small" class="container" :inputProps="{
        autocomplete: 'current-password',
      }" toggleMask v-model="modelAccount.password" />
    </div>
    <button @click="emitDeleteAccount" type="button" class="accounts__field-delete-button">
      <i class="pi pi-trash"></i>
    </button>
  </div>


</template>


<style lang="scss" scoped>
.accounts {
  display: flex;
  gap: 20px;
  background-color: whitesmoke;
  padding: 20px;


  &__input {
    width: 100%;
    max-width: 306px;

    &--wide {
      max-width: 100%;
      background-color: red;
    }
  }

  &__select {
    min-width: 150px;
    flex-shrink: 0;
  }

  &__field-delete-button {
    // flex-shrink: 0;
    width: 50px;
  }
}
</style>