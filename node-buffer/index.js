const str = "是霜序";
const buf = Buffer.from(str, "utf-8");
console.log(buf); // <Buffer e6 98 af e9 9c 9c e5 ba 8f>

const str1 = "xu!";
const buf1 = Buffer.from(str1);
console.log(buf1); // <Buffer 78 75 21>
