function fact(n) {
    if (n < 0) throw new Error('n must be non-negative');
    if (n == 0) return 1;
    return n * fact(n-1);
}

console.log(fact(5)); // 120
console.log(fact(-1)); // Error: n must be non-negative
