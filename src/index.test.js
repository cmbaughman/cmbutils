import CMBUtil from "./index";

describe('index.js', () => {
    test('getMaxFromArray finds largest number in array', () => {
        const res = CMBUtil.getMaxFromArray([1, 2, 3]);
        expect(res).toEqual(3);
    });
});
