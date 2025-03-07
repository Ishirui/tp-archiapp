function fact(n) {
    if (n < 0) throw new Error('n must be non-negative');
    if (n == 0) return 1;
    return n * fact(n-1);
}

console.log(fact(5)); // 120
// console.log(fact(-1)); // Error: n must be non-negative

function applique(f, tab) {
    res = []
    tab.forEach(element => {
        res.push(f(element))
    });
    return res;
}

console.log(applique(fact, [1, 2, 3, 4, 5])); // [1, 2, 6, 24, 120]

// On peut passer une fonction anonyme comme n'importe quel autre objet
// L'objet est instantié avant l'appel de applique (on évalue d'abord les arguments)
console.log(applique(function(n) {return n+1}, [1, 2, 3, 4, 5])); // [2, 3, 4, 5, 6]
