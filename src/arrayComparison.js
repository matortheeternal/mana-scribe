function toFrequencyMap(arr) {
    const map = new Map();
    for (const el of arr) {
        if (el.type === 'genericMana' || el.type === 'infiniteMana') {
            map.set('generic', (map.get('generic') || 0) + el.cmcValue());
        } else {
            const key = el.toString();
            map.set(key, (map.get(key) || 0) + 1);
        }
    }
    return map;
}

export function arrayEquals(arr1, arr2) {
    const m1 = toFrequencyMap(arr1);
    const m2 = toFrequencyMap(arr2);

    if (m1.size !== m2.size) return false;
    for (const [key, count] of m1.entries()) {
        if ((m2.get(key) || 0) !== count) return false;
    }
    return true;
}

export function arrayGreaterThan(arr1, arr2) {
    const m1 = toFrequencyMap(arr1);
    const m2 = toFrequencyMap(arr2);

    let larger = false;
    for (const [key, count] of m2.entries()) {
        if ((m1.get(key) || 0) < count) return false;
        larger = larger || m1.get(key) > count;
    }

    return larger || m1.size > m2.size;
}

export function arrayLessThan(arr1, arr2) {
    const m1 = toFrequencyMap(arr1);
    const m2 = toFrequencyMap(arr2);

    let smaller = false;
    for (const [key, count] of m1.entries()) {
        if ((m2.get(key) || 0) < count) return false;
        smaller = smaller || (count < (m2.get(key) || 0));
    }

    return smaller || m1.size < m2.size;
}

