import Web3 from "web3";
import lifeCoinABI from "../contracts/lifeCoinABI.json"; // Replace with the actual ABI file name

const contractAddress = "0xc5B2993EEF65E499554D5684a1a7FcEe80d06e46"; // Replace with your deployed contract address

// Initialize Web3
export function Utils() {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        return web3;
    } else {
        throw new Error("MetaMask is not installed. Please install MetaMask and try again.");
    }
}

// Initialize the LifeCoin contract instance
export const lifeCoinContract = () => {
    if (window.ethereum) {
        const web3 = Utils();
        return new web3.eth.Contract(lifeCoinABI, contractAddress);
    } else {
        throw new Error("MetaMask is not installed. Please install MetaMask and try again.");
    }
};

// Get connected accounts
export const getAccounts = async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            return accounts;
        } catch (error) {
            throw new Error(`Error fetching accounts: ${error.message}`);
        }
    } else {
        throw new Error("MetaMask is not installed.");
    }
};

// Call the getLifeCoins function
export const getLifeCoins = async (address) => {
    const contract = lifeCoinContract();
    try {
        const coins = await contract.methods.getLifeCoins(address).call();
        return coins;
    } catch (error) {
        throw new Error(`Error fetching life coins: ${error.message}`);
    }
};

// Call the destroyLifeCoins function
export const destroyLifeCoins = async (address, amount, fromAddress) => {
    const contract = lifeCoinContract();
    try {
        await contract.methods.destroyLifeCoins(address, amount).send({ from: fromAddress });
        return `Successfully destroyed ${amount} life coins from ${address}`;
    } catch (error) {
        throw new Error(`Error destroying life coins: ${error.message}`);
    }
};

// Call the giveCoins function
export const giveCoins = async (address, amount, fromAddress) => {
    const contract = lifeCoinContract();
    try {
        await contract.methods.giveCoins(address, amount).send({ from: fromAddress });
        return `Successfully gave ${amount} life coins to ${address}`;
    } catch (error) {
        throw new Error(`Error giving life coins: ${error.message}`);
    }
};

// Call the getTopLifeCoinHolders function
export const getTopLifeCoinHolders = async () => {
    const contract = lifeCoinContract();
    try {
        
        const response = await contract.methods.getTopLifeCoinHolders().call();
        console.log("Get Top Life Coin Holders results ",response);
        return response;
    } catch (error) {
        throw new Error(`Error fetching top life coin holders: ${error.message}`);
    }
};


