import { defineStore } from 'pinia'
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export type Record = 'Локальная' | 'LDAP';
export type Label = { text: string };
export type Account = {
  id: string;
  labels: Label[];
  type_record: Record;
  login: string;
  password: string | null;
}

export const useAccountsStore = defineStore('accounts-store', () => {

  const accounts = ref<Account[]>([]);

  const addAccount = ()=> {

    const account:Account = {
      id: uuidv4(),
      labels: [] as Label[],
      type_record: 'Локальная',
      login:'',
      password: null
    }
    accounts.value.push(account);
  }

  const deleteAccount = (id:string)=>{
    accounts.value = accounts.value.filter((account)=>  account.id !== id);
    console.log(accounts.value, 'delete store');
    
  }

  const updateAccount = (accountUpdate:Account)=> {
   accounts.value =  accounts.value.map((account)=> {
      if(account.id === accountUpdate.id){
        return {...accountUpdate};
      }
      return account;
    })
    
  }




  return { accounts, addAccount, deleteAccount, updateAccount }
})