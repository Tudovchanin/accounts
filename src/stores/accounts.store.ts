import { defineStore } from 'pinia'
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export type TypeRecord = 'Локальная' | 'LDAP';
export type Label = { text: string };
export type Account = {
  id: string;
  labels: Label[];
  type_record: TypeRecord;
  login: string;
  password: string | null;
}


export const useAccountsStore = defineStore('accounts-store', () => {

  const STORAGE_KEY = 'user-accounts';
  const accounts = ref<Account[]>([]);

  const loadFromStorage = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) accounts.value = JSON.parse(saved);
  };
  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts.value));
  };  

  const addAccount = ():string=> {

    const account:Account = {
      id: uuidv4(),
      labels: [] as Label[],
      type_record: 'Локальная',
      login:'',
      password: null
    }
    accounts.value.push(account);

    return account.id
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

  return { accounts, addAccount, deleteAccount, updateAccount, loadFromStorage, saveToStorage }
})