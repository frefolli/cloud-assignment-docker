import reportWebVitals from '../src/reportWebVitals';

jest.mock('web-vitals', () => {
  return {
    getCLS: jest.fn(),
    getFID: jest.fn(),
    getFCP: jest.fn(),
    getLCP: jest.fn(),
    getTTFB: jest.fn(),
  }
});

describe("reportWebVitals", () => {
    test("should call onPerfEntry with the expected values", () => {
      const onPerfEntry = jest.fn();
      reportWebVitals(onPerfEntry);
      if (onPerfEntry && onPerfEntry instanceof Function) {
        expect(onPerfEntry).toHaveBeenCalled();
      }
    });
  });