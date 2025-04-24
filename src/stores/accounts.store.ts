import { defineStore } from 'pinia'
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export type TypeRecord = 'Локальная' | 'LDAP';
export type TypeLabel = { text: string };
export type TypeAccount = {
  id: string;
  labels: TypeLabel[];
  type_record: TypeRecord;
  login: string;
  password: string | null;
}

export const useAccountsStore = defineStore('accounts-store', () => {

  const accounts = ref<TypeAccount[]>([]);

  const addAccount = ()=> {

    const account:TypeAccount = {
      id: uuidv4(),
      labels: [] as TypeLabel[],
      type_record: 'Локальная',
      login:'',
      password: null
    }
    accounts.value.push(account);
  }

  const deleteAccount = (id:string)=>{
    accounts.value = accounts.value.filter((account)=>  account.id !== id);
  }




  return { accounts, addAccount }
})