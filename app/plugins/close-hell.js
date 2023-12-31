import { lib } from 'scure'

const { stateUnlock } = lib

const setTimeToMinutes = (minutes, data, scure) => {
  const simulatedTime = new Date((new Date().getTime()/1000 - ((scure.getInit().totalMinutes - minutes) * 60))*1000);
  data.startTime = JSON.stringify(simulatedTime);
};

export const closeHell = (response) => (data, scure, userAnswer) => {
  data.roomId = 'sotano';
  setTimeToMinutes(10, data, scure);
  stateUnlock(data, 'closed-hell');
  return response;
};
