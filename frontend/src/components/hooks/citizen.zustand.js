import { create } from 'zustand';

// Define the initial Citizen data structure
const initialState = {
    selectedCitizen: 
    {
        name: "Default Citizen",
        DOB: "2-34-2224",
        image: "assets/images/team/team-1.jpg",
        email: "default@gmail.com",
        publicAddress: "0x7BEb7983B03e75B4b7F62E2B13256Aec92C223Fa",
        contact: "0000000000",
        gender: "Male",
        aadhar: "XXXXXXXXXXXXXX",
    }

};


// Create the Zustand store for Citizen management
const useCitizens = create((set) => ({
    ...initialState,
    
    // Add a new Citizen
    addCitizen: (Citizen) =>
        set((state) => ({ selectedCitizen:  Citizen })),

    // Remove a Citizen by their publicAddress
    removeCitizen: () =>
        set((state) => ({
            selectedCitizen: 
                {
                    name: "Default Citizen",
                    DOB: "2-34-2224",
                    image: "assets/images/team/team-1.jpg",
                    email: "default@gmail.com",
                    publicAddress: "0x7BEb7983B03e75B4b7F62E2B13256Aec92C223Fa",
                    contact: "0000000000",
                    gender: "Male",
                    aadhar: "XXXXXXXXXXXXXX",
                }
        })
    ),

    // Set a new Citizen in the state (can be used for temporary storage)
    setNewCitizen: (Citizen) => set(() => ({ selectedCitizen: Citizen })),

   
}));

export default useCitizens;
