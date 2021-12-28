import web3 from './web3';
import ExpenseTracker from '../artifacts/ExpenseTracker.json';

const getTracker = async ({account, factory}) => {

    let contractAddress;

    try{
        contractAddress = await factory.methods.getExpenseTracker().call({
            from:account
        });

        if(contractAddress === '0x0000000000000000000000000000000000000000'){

            await factory.methods.createExpenseTracker().send({
                from: account,
            });

            contractAddress = await factory.methods.getExpenseTracker().call({
                from:account
            });
        }  
    }
    catch(err){
      console.log("Error in getting ExpenseTracker contrct instance, err=", err.message);
    }

    console.log("Contract adddress: ", contractAddress);

    const expenseTracker = await new web3.eth.Contract(
      ExpenseTracker.abi,
      contractAddress
    );

    return  expenseTracker;
};

export default getTracker;