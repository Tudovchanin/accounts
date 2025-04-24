<script lang="ts" setup>
import { ref } from "vue";

import { useAccountsStore } from "./stores/accounts.store";

import type { TypeAccount, TypeRecord, TypeLabel } from "./stores/accounts.store";
import AppAccount from "./components/AppAccount.vue";

const storeAccount = useAccountsStore();

const accounts = ref<TypeAccount[]>(storeAccount.accounts);
const options = ref<TypeRecord[]>(['Локальная', 'LDAP'])


const parserLabel = (labels:TypeLabel[])=> {
console.log(labels, 'labels');

const labelsString = labels
.map((label:TypeLabel)=>  label.text)
.join(';');
  return labelsString;
}

const addAccount = ()=> {
  storeAccount.addAccount();
}

const deleteAccount = (id:string) => {
console.log(id);

}




// pi-trash
</script>

<template>
  <div class="wrapper-component">
   
    <button @click="addAccount" style="padding: 10px 20px; margin-bottom: 20px;">add form</button>
    <form class="">
      <AppAccount v-for="account in accounts"
      :id="account.id"
      :labels="parserLabel(account.labels)"
      :type_record="account.type_record"
      :login="account.login"
      :password="account.password"
      :options-select="options"
      :hide-password-on-type-record="options[1]"
      @delete-account="deleteAccount"
      />
    </form>
  </div>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
}

</style>
