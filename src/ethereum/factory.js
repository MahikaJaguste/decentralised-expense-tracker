import web3 from './web3';
import ExpenseTrackerFactory from '../artifacts/ExpenseTrackerFactory.json';

const getFactory = async () => {

    // rinkeby
    const address = "0x34e067cB80d9c217681C426cFa42E088F1b91225";

    // ganache
    //const address = "0xA497AFea517dEeaa2a205af5B86989F4830aA87E";
    let instance;

    try {
        instance = await new web3.eth.Contract(
            ExpenseTrackerFactory.abi,
            address
        );
    }
    catch(e){
        console.log(e.message);
    }

    console.log('factory instance', instance);
    console.log('factory abi',ExpenseTrackerFactory.abi );

    return instance;

}   

export default getFactory;