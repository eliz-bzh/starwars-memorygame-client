//88 person
export const getPersonImage = (id: number) => {
    const _imageBase = 'https://starwars-visualguide.com/assets/img/characters';
    return `${_imageBase}/${id}.jpg`;
}

export const fillArray = (size: number): number[] => {
    const min = 1;
    const max = 88;
    let array = [];
    while (size !== 0) {
        let random = Math.floor(Math.random() * (max - min)) + min;//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        array.indexOf(random) !== -1 ? size++ : array.push(random); size--;
    }
    return array;
}

export const shuffleAndConcat = (array: number[]): number[] => {
    const defaultArray = [...array];//copy array
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];//swap
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return defaultArray.concat(array);
}

export const charactersList = (listOfNumber: number[]): { id: number, url: string }[] => {
    let characters: { id: number, url: string }[] = [];
    listOfNumber.map((id) => {
        characters.push({ id: id, url: getPersonImage(id) });
    });
    return characters;
}