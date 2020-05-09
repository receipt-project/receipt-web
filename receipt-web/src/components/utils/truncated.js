function isInteger(num) {
    return (num ^ 0) === num;
}

function toStringNumberLength(num) {
    const crop = num.toString().split('.');
    return crop[1].length;
}

const truncated = num => {
    if(isInteger(num) || toStringNumberLength(num) === 1) {
       return num.toFixed(2);
    }
    return Math.trunc((num) * 100) / 100;
}

export default truncated;
