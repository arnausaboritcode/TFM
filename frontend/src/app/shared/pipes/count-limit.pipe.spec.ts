import { CountLimitPipe } from './count-limit.pipe';

describe('CountLimitPipe', () => {
  it('create an instance', () => {
    const pipe = new CountLimitPipe();
    expect(pipe).toBeTruthy();
  });
});
