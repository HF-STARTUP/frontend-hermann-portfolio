import { uuid } from 'uuidv4';

export const getUid = ()=>{
    return uuid().toString()
}