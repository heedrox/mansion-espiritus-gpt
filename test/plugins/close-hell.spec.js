import { stateIsUnlocked } from 'scure/src/lib';
import { closeHell } from '../../app/plugins/close-hell';

describe('When closing hell', () => {
  let scure;
  let data, response;

  beforeEach(() => {
    scure = buildTestScure();
    data = { roomId: 'dormitorio' };
    response = closeHell('RESPONSE')(data, scure, '');
  });

  it('it changes room to sotano', () => {
    expect(data.roomId).toEqual('sotano');
  });

  it('says response', () => {
    expect(response).toEqual('RESPONSE');
  });

  it('unlocks closed-hell lock', () => {
    expect(stateIsUnlocked(data, 'closed-hell')).toEqual(true);
  });
});
