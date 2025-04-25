<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useAccountsStore } from "./stores/accounts.store";

import type { Account, TypeRecord, Label } from "./stores/accounts.store";
import type { AccountBlurPayload, ErrorAccount } from "@/components/AppAccount.vue";

import AppAccount from "./components/AppAccount.vue";


const storeAccount = useAccountsStore();

const errors = ref<Record<string, ErrorAccount>>({});

const options = ref<TypeRecord[]>(["Локальная", "LDAP"]);



const addAccount = () => {

  const accountId = storeAccount.addAccount();

  errors.value[accountId] = {
    login: false,
    password: false
  };

  console.log(errors.value, 'errors.value');
  storeAccount.saveToStorage();
};


const deleteAccount = (accountId: string) => {

  storeAccount.deleteAccount(accountId);
  storeAccount.saveToStorage();

  delete errors.value[accountId]

};

const updateAccount = (accountUpdate: AccountBlurPayload) => {

  const accountId = accountUpdate.id;
  const password = accountUpdate.type_record === 'Локальная'
    ? accountUpdate.password || ''
    : null;
  const transformLabels: Label[] =
    accountUpdate.labels.trim().length > 0
      ? parseLabelsFromString(accountUpdate.labels)
      : [];


  errors.value[accountId].login = accountUpdate.login.trim().length === 0;

  if (password !== null) {
    errors.value[accountId].password = password?.trim().length === 0 || password?.trim().length > 100;
  }

  if (errors.value[accountId].login || errors.value[accountId].password) return;

  const account = { ...accountUpdate, labels: transformLabels, password };

  storeAccount.updateAccount(account);
  storeAccount.saveToStorage();
};







function labelsToString(labels: Label[]) {
  const labelsString = labels.map((label: Label) => label.text).join(";");
  return labelsString;
};

function parseLabelsFromString(string: string): Label[] {

  const arrayLabels = string
    .split(";")
    .filter((string) => string.trim().length > 0)
    .map((value) => {
      return { text: value.trim() };
    });

  return arrayLabels;
}

function initErrors() {
  const accounts = [...storeAccount.accounts];
    for (let index = 0; index < accounts.length; index++) {
      errors.value[accounts[index].id] = {
        login: false,
        password: false
      }

    }
}

onBeforeMount(() => {

  storeAccount.loadFromStorage();

  if (storeAccount.accounts.length > 0) {
   initErrors();
  }

})

</script>

<template>
  <div class="wrapper-component">
    <button class="button-add-account" @click="addAccount">
      <i class="pi pi-plus"></i>
    </button>
    <div>{{ storeAccount.accounts }}</div>
    <form class="form-account">
      <AppAccount v-for="account in storeAccount.accounts" :key="account.id" :id="account.id"
        :labels="labelsToString(account.labels)" :type_record="account.type_record" :login="account.login"
        :password="account.password" :options-select="options" :hide-password-on-type-record="options[1]"
        :error="errors[account.id]" @delete-account="deleteAccount" @blur-account="updateAccount" />
    </form>
  </div>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
}

.button-add-account {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
</style>
