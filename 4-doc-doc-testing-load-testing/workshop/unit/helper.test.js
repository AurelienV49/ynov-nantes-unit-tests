const HelperService = require('../HelperService');

describe("Correct Behavior Helper Service", () => {

    it("shoud call the todoHelper with a good parameter and receive true", () => {
        const param = { body: { text: 'bonjour'}};
        expect(HelperService.helperTodoCreation(param)).toBe(true);
    })

    it("shoud call the todoHelper with a wrong parameter and receive false", () => {
        let param = { body: { text: ''}};
        expect(HelperService.helperTodoCreation(param)).toBe(false);

        param = { body: null};
        expect(HelperService.helperTodoCreation(param)).toBe(false);

        param = "hello";
        expect(HelperService.helperTodoCreation(param)).toBe(false);
    })

})