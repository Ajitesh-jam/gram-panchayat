
import { create } from 'zustand';

// Define the initial Employee data structure
const initialState = {
    selectedEmployee: 
    {
        name: "Default Employee",
        DOB: "2-34-2224",
        image: "assets/images/team/team-1.jpg",
        email: "default@gmail.com",
        publicAddress: "0xE5aA6351C82FC8de777F843E7D7dB292D1Ae9e83",
        contact: "0000000000",
        gender: "Male",
        aadhar: "XXXXXXXXXXXXXX",
    }

};


// Create the Zustand store for Employee management
const useEmployees = create((set) => ({
    ...initialState,
    
    // Add a new Employee
    addEmployee: (Employee) =>
        set(() => ({ selectedEmployee:  Employee })),

    // Remove a Employee by their publicAddress
    removeEmployee: () =>
        set(() => ({
            selectedEmployee: 
                {
                    name: "Default Employee",
                    DOB: "2-34-2224",
                    image: "assets/images/team/team-1.jpg",
                    email: "default@gmail.com",
                    publicAddress: "0xE5aA6351C82FC8de777F843E7D7dB292D1Ae9e83",
                    contact: "0000000000",
                    gender: "Male",
                    aadhar: "XXXXXXXXXXXXXX",
                }
        })
    ),

    // Set a new Employee in the state (can be used for temporary storage)
    setNewEmployee: (Employee) => set(() => ({ selectedEmployee: Employee })),

   
}));

export default useEmployees;
