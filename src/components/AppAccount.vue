<script setup lang="ts">
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Password from "primevue/password";
import type { TypeRecord } from "@/stores/accounts.store";


export type ErrorAccount = ({
  login:boolean,
  password:boolean,
})

type AccountProps = {
  id: string;
  labels: string;
  type_record: TypeRecord;
  login: string;
  password: string | null;
  optionsSelect: string[];
  hidePasswordOnTypeRecord?: TypeRecord;
  error?: ErrorAccount,
};

export type AccountBlurPayload = Pick<
  AccountProps, 
  'id' | 'labels' | 'type_record' | 'login' | 'password'
>;



const props = defineProps<AccountProps>();

const modelAccount = ref({
  labels: props.labels,
  type_record: props.type_record,
  login: props.login,
  password: props.password,
});
const emit = defineEmits(["delete-account","blur-account"]);

const emitDeleteAccount = () => {
  emit("delete-account", props.id);
};

const emitUpdate = ()=> {
  
  emit("blur-account", { id: props.id,...modelAccount.value})
}


</script>
<template>
  <div class="accounts">
    <div class="accounts__input">
      <InputText
       :invalid="props.error?.label"
        fluid
        size="small"
        type="text"
        placeholder="значение"
        v-model="modelAccount.labels"
        @blur="emitUpdate"
      />
    </div>
    <div class="accounts__select">
      <Select
        fluid
        size="small"
        :options="optionsSelect"
        v-model="modelAccount.type_record"
        @change="emitUpdate"
      />
    </div>
    <div
      class="accounts__input"
      :class="{
        'accounts__input--wide':
          modelAccount.type_record === props.hidePasswordOnTypeRecord,
      }"
    >
      <InputText
      :invalid="props.error?.login"
        fluid
        size="small"
        type="text"
        placeholder="значение"
        v-model="modelAccount.login"
        @blur="emitUpdate"
      />
    </div>

    <div
      v-if="hidePasswordOnTypeRecord !== modelAccount.type_record"
      class="accounts__input"
    >
      <Password
      :invalid="props.error?.password"
        fluid
        size="small"
        toggleMask
        v-model="modelAccount.password"
        @blur="emitUpdate"
      />
    </div>
    <button
      @click="emitDeleteAccount"
      type="button"
      class="accounts__field-delete-button"
    >
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
