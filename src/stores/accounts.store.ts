import { defineStore } from 'pinia'
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export type Account = {
  id: string;
  
}



export const useAccountsStore = defineStore('accounts-store', () => {

  const accounts = ref<Account[] | null>(null);
  




  return {  }
})