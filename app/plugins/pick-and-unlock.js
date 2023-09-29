import { lib } from 'scure'

const { stateUnlock } = lib

const addToInventory = (data, itemId) => {
  data.inventory = data.inventory || [];
  data.inventory.push(itemId);
  data.picked = data.picked || [];
  data.picked.push(itemId);
  return data;
};

export const pickAndUnlock = (itemid, lock, response) => (data, scure, userAnswer) => {
  addToInventory(data, itemid);
  stateUnlock(data, lock);
  return response;
};
