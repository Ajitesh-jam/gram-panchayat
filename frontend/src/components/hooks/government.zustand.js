import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the initial Government data structure
const initialState = {
    selectedGovernment: {
        government_id: -1,
        name: "Dummy Government Official",
        department: "Unknown",
        image: "assets/images/team/team-2.jpg",
        email: "default@gov.in",
        contact: "0000000000",
        gender: "Male",
        aadhar: "XXXXXXXXXXXXXX",
        designation: "Officer",
        region_id: 1
    }
};

// Create the Zustand store for Government management with persistence
const useGovernment = create(
    persist(
        (set) => ({
            ...initialState,

            // Add a new Government official
            addGovernment: (Government) => set(() => ({ selectedGovernment: Government })),

            // Remove a Government official (reset to default)
            removeGovernment: () => set(() => ({ selectedGovernment: initialState.selectedGovernment })),

            // Set a new Government official temporarily
            setNewGovernment: (Government) => set(() => ({ selectedGovernment: Government })),
        }),
        {
            name: 'government-store', // Key for localStorage
        }
    )
);

export default useGovernment;
