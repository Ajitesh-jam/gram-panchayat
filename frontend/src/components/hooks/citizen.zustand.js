import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the initial Citizen data structure
const initialState = {
    selectedCitizen: {
        name: "Dummy Citizen",
        DOB: "2-34-2224",
        image: "assets/images/team/team-1.jpg",
        email: "default@gmail.com",
        contact: "0000000000",
        gender: "Male",
        aadhar: "XXXXXXXXXXXXXX",
    }
};

// Create the Zustand store for Citizen management with persistence
const useCitizens = create(
    persist(
        (set) => ({
            ...initialState,

            // Add a new Citizen
            addCitizen: (Citizen) => set(() => ({ selectedCitizen: Citizen })),

            // Remove a Citizen (reset to default)
            removeCitizen: () => set(() => ({ selectedCitizen: initialState.selectedCitizen })),

            // Set a new Citizen temporarily
            setNewCitizen: (Citizen) => set(() => ({ selectedCitizen: Citizen })),
        }),
        {
            name: 'citizen-store', // Key for localStorage
        }
    )
);

export default useCitizens;
