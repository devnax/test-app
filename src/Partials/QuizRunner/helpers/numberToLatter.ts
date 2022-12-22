
const numberToLatter = (num: number, type?: "LETTER" | "ROMAN") => {
   if (num === 0) num = 1;

   if (type !== "ROMAN") {
      return String.fromCharCode(('A'.charCodeAt(0) + -1) + num)
   } else {
      const lookup: any = {
         M: 1000,
         CM: 900,
         D: 500,
         CD: 400,
         C: 100,
         XC: 90,
         L: 50,
         XL: 40,
         X: 10,
         IX: 9,
         V: 5,
         IV: 4,
         I: 1
      };
      let roman = ''
      for (let i in lookup) {
         while (num >= lookup[i]) {
            roman += i;
            num -= lookup[i];
         }
      }
      return roman
   }
}
export default numberToLatter