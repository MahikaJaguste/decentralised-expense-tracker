import web3 from './web3';

let account;

const getAccount = async () => {

    if (window.ethereum) {
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
        } 
        catch (error) {
            console.log(error.message);
        }
    }

    const accounts = await web3.eth.getAccounts();
    account = accounts[0];

    return account;
}

export default getAccount;