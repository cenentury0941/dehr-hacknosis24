function formatBytes(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

function incrementString(str) {
    return str.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 1)).join('');
}

function decrementString(str) {
    return str.split('').map(char => String.fromCharCode(char.charCodeAt(0) - 1)).join('');
}

function reverse(array){
    return array.map((item,idx) => array[array.length-1-idx])
  }

export {formatBytes,incrementString,decrementString,reverse}