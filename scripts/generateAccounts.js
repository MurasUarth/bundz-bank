const accounts = [];
const map = {};

for(let i = 0; i < 100000; i++) {
  const agency = Math.ceil(Math.random() * 10000);
  const account = Math.ceil(Math.random() * 100000);
  const agencyStr = agency.toString();
  const accountStr = account.toString();
  const id = agencyStr + accountStr;
  
  if(!map[id]) {
    map[id] = true;
    accounts.push({
      agency: agencyStr,
      account: accountStr,
      balance: Math.ceil(Math.random() * 100000)
    });
  }
}

console.log(JSON.stringify(accounts));

