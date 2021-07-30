function Account(cash) {
    this.cash = cash;
    this.hasMoney = !!cash;
}
var account = new Account(100.50);
console.log(account.cash); // 100.50
console.log(account.hasMoney); // true
var emptyAccount = new Account(0);
console.log(emptyAccount.cash); // 0
console.log(emptyAccount.hasMoney); // false
console.log("em nha que")