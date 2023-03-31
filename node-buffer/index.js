// const str = "是霜序";
// const buf = Buffer.from(str, "utf-8");
// console.log(buf); // <Buffer e6 98 af e9 9c 9c e5 ba 8f>

// const str1 = "xu!";
// const buf1 = Buffer.from(str1);
// console.log(buf1); // <Buffer 78 75 21>

// Buffer.alloc
// const bufferOfAlloc = Buffer.alloc(6);
// console.log(bufferOfAlloc); // <Buffer 00 00 00 00 00 00>
// const bufferOfAllocFill = Buffer.alloc(6, "1");
// console.log(bufferOfAllocFill); // <Buffer 31 31 31 31 31 31>

// Buffer.allocUnsafe
// const bufferOfAllocUnsafe = Buffer.allocUnsafe(6);
// console.log(bufferOfAllocUnsafe); // <Buffer 80 7c 87 10 01 00>

// const bufferFromString = Buffer.from("shuangxu");
// console.log(bufferFromString); // <Buffer 73 68 75 61 6e 67 78 75>

// const bufferFromArray = Buffer.from([256, 2, 3]);
// console.log(bufferFromArray); // <Buffer 00 02 03>

// const bufferFromBuffer = Buffer.from(bufferFromArray);
// console.log(bufferFromBuffer); // <Buffer 00 02 03>

// 乱码问题
// const fs = require("fs");
// const rs = fs.createReadStream("./test.txt", { highWaterMark: 4 });
// let data;
// rs.on("data", (chunk) => {
//     console.log(chunk);
//     data += chunk;
// });
// rs.on("end", () => {
//     console.log(data); // 你�����这里�����序！
// });

// string encoding
// const buffer = Buffer.from("hi shuangxu!");
// console.log(buffer.toString("hex")); // 686920736875616e67787521
// console.log(buffer.toString("base64")); // aGkgc2h1YW5neHUh
// const baseBuffer = Buffer.alloc(12, "aGkgc2h1YW5neHUh", "base64");
// console.log(baseBuffer.toString()); // hi shuangxu!

// const buffer = new ArrayBuffer(8);
// const int8Array = new Int8Array(buffer);
// int8Array[0] = 30;
// int8Array[1] = 41;
// const int16Array = new Int16Array(buffer);
// console.log(int16Array);
// const dataView = new DataView(buffer);
// dataView.setInt16(2, 256, true);
// let int16Array1 = new Int16Array(buffer);

// int16Array1[0] = 256;
// console.log(int16Array1);
// const int8Array1 = new Int8Array(buffer);
// console.log(int8Array1);

// function isLittleEndian() {
//     const buf = new ArrayBuffer(2);
//     const view = new DataView(buf);
//     view.setInt16(0, 1);
//     console.log(new Int8Array(buf));
//     const int16Array = new Int16Array(buf);
//     return int16Array[0] === 256;
// }

// console.log(isLittleEndian());

// function isLittleEndian() {
//     const buf = new ArrayBuffer(2);
//     const int16Array = new Int16Array(buf);
//     int16Array[0] = 256;
//     console.log(new Int8Array(buf));
// }

// console.log(isLittleEndian());

// const buffer = new ArrayBuffer(8);
// const int8Array = new Int8Array(buffer);
// int8Array[0] = 30;
// int8Array[1] = 41;

// const dataView = new DataView(buffer);
// dataView.setInt16(2, 256, true);

// const int8Array2 = new Int8Array(buffer);
// console.log(int8Array2);

// const int16Array = new Int16Array(buffer);
// console.log(int16Array); // [10526, 526, 0, 0]

// int16Array[0] = 256;
// const int8Array1 = new Int8Array(buffer);
// console.log(int8Array1);

function unicodeToByte(input) {
    if (!input) return;
    const byteArray = [];
    for (let i = 0; i < input.length; i++) {
        const code = input.charCodeAt(i); // 获取到当前字符的 Unicode 码
        if (code < 127) {
            byteArray.push(code);
        } else if (code >= 128 && code < 2047) {
            byteArray.push((code >> 6) | 192);
            byteArray.push((code & 63) | 128);
        } else if (code >= 2048 && code < 65535) {
            byteArray.push((code >> 12) | 224);
            byteArray.push(((code >> 6) & 63) | 128);
            byteArray.push((code & 63) | 128);
        } else {
            byteArray.push((code >> 18) | 240);
            byteArray.push(((code >> 12) & 63) | 128);
            byteArray.push(((code >> 6) & 63) | 128);
            byteArray.push((code & 63) | 128);
        }
    }
    return byteArray.map((item) => parseInt(item.toString(2)));
}

function encodeTransform(input) {
    if (!input) return;
    const byteArray = [];
    for (let i = 0; i < input.length; i++) {
        const code = input.charCodeAt(i); // 获取到当前字符的 Unicode 码
        if (code < 128) {
            byteArray.push(code);
        } else if (code >= 128 && code < 2048) {
            byteArray.push((code >> 6) | 192);
            byteArray.push((code & 63) | 128);
        } else if (code >= 2048 && code < 65535) {
            byteArray.push((code >> 12) | 224);
            byteArray.push(((code >> 6) & 63) | 128);
            byteArray.push((code & 63) | 128);
        }
    }
    return byteArray;
}

// function decodeTransform(input) {
//     if (!input) return;
//     const byteArray = [];
//     for (let i = 0; i < input.length; ) {
//         const code = input.charCodeAt(i++);
//         if (code < 128) {
//             byteArray.push(code);
//         } else if (code >= 128 && code < 2048) {
//             const code1 = input.charCodeAt(i++);
//             byteArray.push(((code & 31) << 6) | (code1 & 63));
//         } else if (code >= 2048 && code < 65535) {
//             const code1 = input.charCodeAt(i++);
//             const code2 = input.charCodeAt(i++);
//             byteArray.push(
//                 ((code & 15) << 12) | ((code1 & 63) << 6) | (code2 & 63)
//             );
//         }
//     }
//     return byteArray.map((item) => String.fromCharCode(item)).join("");
// }

function decodeTransform(byteArray) {
    let i = 0;
    const output = [];
    while (i < byteArray.length) {
        const code = byteArray[i];
        if (code < 128) {
            output.push(code);
            i++;
        } else if (code > 191 && code < 224) {
            const code1 = byteArray[i + 1];
            output.push(((code & 31) << 6) | (code1 & 63));
            i += 2;
        } else {
            const code1 = byteArray[i + 1];
            const code2 = byteArray[i + 2];
            output.push(
                ((code & 15) << 12) | ((code1 & 63) << 6) | (code2 & 63)
            );
            i += 3;
        }
    }
    return output.map((item) => String.fromCharCode(item)).join("");
}

const _base64Str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function encodeBase64(input) {
    if (!input) return;
    let base64String = "";
    const byteArray = encodeTransform(input);
    for (let i = 0; i < byteArray.length; ) {
        const char1 = byteArray[i++];
        const encode1 = char1 >> 2;
        const char2 = byteArray[i++];
        const encode2 = ((char1 & 3) << 4) | (char2 >> 4);
        const char3 = byteArray[i++];
        let encode3 = ((char2 & 15) << 2) | (char3 >> 6);
        let encode4 = char3 & 63;
        if (Number.isNaN(char2)) encode3 = encode4 = 64;
        if (Number.isNaN(char3)) encode4 = 64;
        base64String +=
            _base64Str.charAt(encode1) +
            _base64Str.charAt(encode2) +
            _base64Str.charAt(encode3) +
            _base64Str.charAt(encode4);
    }
    return base64String;
}

function decodeBase64(input) {
    if (!input) return;
    const byteArray = [];
    for (let i = 0; i < input.length; ) {
        const encode1 = _base64Str.indexOf(input.charAt(i++));
        const encode2 = _base64Str.indexOf(input.charAt(i++));
        const encode3 = _base64Str.indexOf(input.charAt(i++));
        const encode4 = _base64Str.indexOf(input.charAt(i++));
        const char1 = (encode1 << 2) | (encode2 >> 4);
        const char2 = ((encode2 & 15) << 4) | (encode3 >> 2);
        const char3 = ((encode3 & 3) << 6) | encode4;
        byteArray.push(char1);
        if (encode3 != 64) {
            byteArray.push(char2);
        }
        if (encode4 != 64) {
            byteArray.push(char3);
        }
    }
    return decodeTransform(byteArray);
}

console.log(decodeBase64(encodeBase64("߄")));
console.log(decodeBase64(encodeBase64("霜序")));
console.log(decodeBase64(encodeBase64("木杪")));
