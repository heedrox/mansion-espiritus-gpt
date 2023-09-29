import { stateIsUnlocked } from 'scure/src/lib';
import { pickAndUnlock } from '../../app/plugins/pick-and-unlock';

describe('Combined actions', () => {

  let scure;

  beforeEach(() => {
    scure = buildTestScure();
  });

  it('executes one action', () => {
    const data = { roomId: 'recibidor' };
    const userAnswer = '2879';

    const response = pickAndUnlock('itemid', 'lockid', 'DONE')(data, scure, userAnswer);

    expect(response).toEqual('DONE');
    expect(stateIsUnlocked(data, 'lockid')).toEqual(true);
    expect(data.inventory).toContain('itemid');
  });

});
