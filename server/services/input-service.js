class InputService {

    #parseToken(token) {
        const reg = /(#[a-z0-9][a-z0-9\_]*)/ig;
        if (!token.replace(reg, '')) {
            return token;
        } else {
            return false;
        }
    }

    #parseTimer(inputTimer) {
        const reg = /^\d{3}[h]$/;
        if (!inputTimer.replace(reg, '')) {
            const numberPattern = /\d+/g;
            return Number(inputTimer.match(numberPattern));
        } else {
            return false;
        }
    }

    parseInputData(inputString) {
        const resultObject = {
            token: '',
            info: '',
            timer: 0,
        }
        const stringArray = inputString.split('\n');
        if (stringArray.length === 3 && this.#parseToken(stringArray[0]) && this.#parseTimer(stringArray[2])) {
            resultObject.token = this.#parseToken(stringArray[0]);
            resultObject.info = stringArray[1];
            resultObject.timer = this.#parseTimer(stringArray[2]);
            return { ...resultObject };
        } else {
            return false;
        }
    }
}

module.exports = new InputService();