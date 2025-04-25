<script lang="ts" setup>
import { ref } from "vue";

import { useAccountsStore } from "./stores/accounts.store";

import type { Account, Record, Label } from "./stores/accounts.store";
import type { AccountBlurPayload } from "@/components/AppAccount.vue";

import AppAccount from "./components/AppAccount.vue";

const storeAccount = useAccountsStore();


const errorAccount = ref({
  label:false,
  login:false,
  password:false
})
const options = ref<Record[]>(["Локальная", "LDAP"]);

const parserLabel = (labels: Label[]) => {
  const labelsString = labels.map((label: Label) => label.text).join(";");
  return labelsString;
};

const addAccount = () => {
  storeAccount.addAccount();
};

const deleteAccount = (id: string) => {
  storeAccount.deleteAccount(id);
};

const updateAccount = (accountUpdate: AccountBlurPayload) => {
  const password = accountUpdate.type_record === 'Локальная'
   ? accountUpdate.password
   : null
  const transformLabels: Label[] =
  accountUpdate.labels.trim().length > 0
      ? transformStringLabel(accountUpdate.labels)
      : [];

  const account = { ...accountUpdate, labels: transformLabels, password };
  storeAccount.updateAccount(account);
  

};

function transformStringLabel(string: string): Label[] {
  console.log(string.split(";"), "split");

  const arrayLabels = string
    .split(";")
    .filter((string) => string.trim().length > 0)
    .map((value) => {
      return { text: value.trim() };
    });

  return arrayLabels;
}
</script>

<template>
  <div class="wrapper-component">
    <button class="button-add-account" @click="addAccount">
      <i class="pi pi-plus"></i>
    </button>
    <div>{{ storeAccount.accounts }}</div>
    <form class="form-account">
      <AppAccount
        v-for="account in storeAccount.accounts"
        :key="account.id"
        :id="account.id"
        :labels="parserLabel(account.labels)"
        :type_record="account.type_record"
        :login="account.login"
        :password="account.password"
        :options-select="options"
        :hide-password-on-type-record="options[1]"
        :error="errorAccount"
        @delete-account="deleteAccount"
        @blur-account="updateAccount"
      />
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
