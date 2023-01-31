// Fisher–Yates shuffle

export default function shuffleCards(array) {
    for (let i = array.length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        swap(array, currentIndex, randomIndex);
    }
    return array;
}

function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// Fisher–Yates shuffle 2

function shuffleCardsNew(arr) {
    let i = arr.length;
    while (--i > 0) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
    }
    return arr;
}