import loadingReducer, { setLoading } from './loadingSlice';

describe('loadingSlice reducer', () => {
  test('should handle initial state', () => {
    expect(loadingReducer(undefined, { type: 'unknown' })).toEqual({
      isLoading: false,
    });
  });

  test('should handle setLoading', () => {
    const previousState = { isLoading: false };
    expect(loadingReducer(previousState, setLoading(true))).toEqual({
      isLoading: true,
    });
    expect(loadingReducer(previousState, setLoading(false))).toEqual({
      isLoading: false,
    });
  });
});
