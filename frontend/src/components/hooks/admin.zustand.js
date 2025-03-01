import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the initial Administrator data structure
const initialState = {
    selectedAdmin: {
        admin_id: -1,
        name: "Dummy Administrator",
        role: "Super Admin",
        image: "assets/images/team/team-3.jpg",
        email: "admin@system.com",
        contact: "0000000000",
        gender: "Male",
        aadhar: "XXXXXXXXXXXXXX",
        permissions: ["READ", "WRITE", "DELETE"],
    }
};

// Create the Zustand store for Administrator management with persistence
const useAdmin = create(
    persist(
        (set) => ({
            ...initialState,

            // Add a new Admin
            addAdmin: (Admin) => set(() => ({ selectedAdmin: Admin })),

            // Remove an Admin (reset to default)
            removeAdmin: () => set(() => ({ selectedAdmin: initialState.selectedAdmin })),

            // Set a new Admin temporarily
            setNewAdmin: (Admin) => set(() => ({ selectedAdmin: Admin })),
        }),
        {
            name: 'admin-store', // Key for localStorage
        }
    )
);

export default useAdmin;
