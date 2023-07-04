class RandomizeService {

    #parseInputValues(inputString) {
        const parsedValues = inputString.split(/[ ,]+/);
        return parsedValues;
    }

    randomizeFromTXTFile(fileStream) {
        let fileContent = '';
        fileStream.on('data', data => {
            fileContent += data.toString();
        })
        let values = [];
        fileStream.on('end', () => {
            values = this.#parseInputValues(fileContent);
        })
        if (!values) {
            return false;
        } else {
            const winnerIndex = Math.floor(Math.random() * values.length);
            const winner = values[winnerIndex];
            return winner;
        }
    }

    randomize(input) {
        const values = this.#parseInputValues(input);
        if (!values) {
            return false;
        } else {
            const winnerIndex = Math.floor(Math.random() * values.length);
            const winner = values[winnerIndex];
            return winner;
        }
    }

}

module.exports = new RandomizeService();