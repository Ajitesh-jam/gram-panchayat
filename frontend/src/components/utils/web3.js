import Web3 from "web3";
import medicalRecordsABI from "../contracts/abi.json";

const contractAddress = "0x9768B94a6Bc6687D0229587adceaD04908D73d3f"; 

// Initialize Web3 and contract
export function Utils() {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        return web3;
    }
}

// Initialize the contract instance
export const medicalRecordsContract = () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        return new web3.eth.Contract(medicalRecordsABI, contractAddress);
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

// Add a new Administrator (only owner can call this)
export const addNewAdministrator = async (AdministratorAddress) => {
    const contract = medicalRecordsContract();
    const accounts = await getAccounts();

    try {
        const response = await contract.methods
            .addNewAdministrator(AdministratorAddress)
            .send({ from: 0x3a94bD23Eb39cd8083A31C0e802F7f724e95b6c2 });

            console.log("Administrator added successfully");
        return response;
    } catch (error) {
        throw new Error(`Error adding Administrator: ${error.message}`);
    }
};

// Update medical record by Citizen
export const updateRecordByCitizen = async (record) => {
    const contract = medicalRecordsContract();
    const accounts = await getAccounts();

    try {
        const response = await contract.methods
            .updateRecordByCitizen(record)
            .send({ from: accounts[0] });
        return response;
    } catch (error) {
        throw new Error(`Error updating record: ${error.message}`);
    }
};

// Update medical record by Administrator
export const updateRecordByAdministrator = async (CitizenAddress, record) => {
    const contract = medicalRecordsContract();
    const accounts = await getAccounts();

    try {

        //const gasPrice = await web3.eth.getGasPrice();
		// const gasLimit = await updateRecordByAdministrator.methods
        //     .updateRecordByAdministrator(CitizenAddress, record)
        //     .estimateGas({
        //     from: connectedAccount		
		// });

        const response = await contract.methods
            .updateRecordByAdministrator(CitizenAddress, record)
            .send({ from: accounts[0],
             });



        return response;
    } catch (error) {
        throw new Error(`Error updating Citizen's record: ${error.message}`);
    }
};

// Get medical records of a Citizen
export const getMedicalRecord = async (CitizenAddress,AdministratorAddress) => {
    const contract = medicalRecordsContract();

    console.log(`Getting ${CitizenAddress} from ${AdministratorAddress}`);
    try {
        const records = await contract.methods
            .getMedicalRecord(CitizenAddress)
            .call({ from: AdministratorAddress });
        
            console.log("Fetched Records by web3 utils : ",records);
        return records;
    } catch (error) {
        throw new Error(`Error fetching medical records: ${error.message}`);
    }
};

// Get Administrators treating a Citizen
export const getAdministrators = async (CitizenAddress) => {
    const contract = medicalRecordsContract();
    const accounts = await getAccounts();

    try {
        const Administrators = await contract.methods
            .getAdministrators(CitizenAddress)
            .call({ from: accounts[0] });
        return Administrators;
    } catch (error) {
        throw new Error(`Error fetching Administrators: ${error.message}`);
    }
};

// Delete a Citizen's medical record (only owner)
export const deleteCitizen = async (CitizenAddress) => {
    const contract = medicalRecordsContract();
    const accounts = await getAccounts();

    try {
        const response = await contract.methods
            .deleteCitizen(CitizenAddress)
            .send({ from: accounts[0] });
        return response;
    } catch (error) {
        throw new Error(`Error deleting Citizen record: ${error.message}`);
    }
};

// Delete a specific medical record by index (only Administrator)
export const deleteRecord = async (CitizenAddress, index) => {
    const contract = medicalRecordsContract();
    const accounts = await getAccounts();

    try {
        const response = await contract.methods
            .deleteRecord(CitizenAddress, index)
            .send({ from: accounts[0] });
        return response;
    } catch (error) {
        throw new Error(`Error deleting record: ${error.message}`);
    }
};

