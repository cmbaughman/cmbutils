import CMBUtil from "../src/index";
//const CMBUtil = require('../src/index');

describe('index.js', () => {
    test('getMaxFromArray finds largest number in array', () => {
        const res = CMBUtil.getMaxFromArray([1, 2, 3]);
        expect(res).toEqual(3);
    });

    test('getQueryParam gets query parameter value for url', () => {
        const url = 'https://coolsite.com?id=5&q=test';
        const res = CMBUtil.getQueryParam('q', url);
        expect(res).toEqual('test');
    });

    test('hasClass gets class name from dom node', () => {
        document.body.innerHTML = '<div id="test">' +
            '<p class="cool-p">This is a cool test p.</p>' +
            '</div>';

        const p = document.querySelector('p');
        const res = CMBUtil.hasClass(p, 'cool-p');
        expect(res).toEqual(true);
    });

    test('isIE checks if the user agent is Internet Exploder', () => {
        Object.defineProperty(window.navigator, 'userAgent', {value: 'Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko', configurable: true});
        const res = CMBUtil.isIE();
        expect(res).toEqual(true);
    });

    test('isIE checks if the user agent is not Internet Exploder', () => {
        Object.defineProperty(window.navigator, 'userAgent', {value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 Edg/103.0.1264.77', configurable: true});
        const res = CMBUtil.isIE();
        expect(res).toEqual(false);
    });

    test('isNullOrEmpty determine if variable is empty', () => {
        let obj = null;
        const res = CMBUtil.isNullOrEmpty(obj);
        expect(res).toEqual(true);
    });

    test('isUndefined determine if variable is undefined', () => {
        let tmp;
        const res = CMBUtil.isUndefined(tmp);
        expect(res).toEqual(true);
    });

    test('isNumeric determines if value is numeric', () => {
        const tmp = '4';
        const res = CMBUtil.isNumeric(tmp);
        expect(res).toEqual(true);
    });

    test('getFromStore fetch value from sessionStorage', () => {
        const obj = { name: 'test', value: '7' };
        CMBUtil.writeToStore(obj);
        const res = CMBUtil.getFromStore('test');
        expect(res).toEqual('7');
        
        CMBUtil.removeFromStore('test');
        const res2 = CMBUtil.getFromStore('test');
        expect(res2).toEqual(null);
    });

    test('closest gets the closest DOM node', () => {
        document.body.innerHTML = '<article><div id="div-01">Here is div-01' +
            '<div id="div-02">Here is div-02' +
            '<div id="div-03">Here is div-03</div>' +
            '</div></div></article>';
        
        let elem = document.getElementById('div-03');
        let resEl = document.getElementById('div-02');
        const res = CMBUtil.closest(elem, '#div-02');
        expect(res).toEqual(resEl);
        
        resEl = document.getElementById('div-01');
        const res2 = CMBUtil.closest(elem, '#div-01');
        expect(res2).toEqual(resEl);
    });

    test('loaded loads fn after document loads', () => {
        let a = function() { document.body.innerHTML = '<p id="test-it">THIS IS A TEST</p>'};
        CMBUtil.loaded(a);
        const res = document.getElementById('test-it');
        expect(res.textContent).toEqual('THIS IS A TEST');
    });

    test('viewportWidth gets window.innerWidth', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 150,
        });

        window.dispatchEvent(new Event('resize'));
        const res = CMBUtil.viewportWidth();

        expect(window.innerWidth).toEqual(res);
    });
});