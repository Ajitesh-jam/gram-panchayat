import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the initial Employee data structure
const initialState = {
    selectedEmployee: {
        name: "Dummy Employee",
        DOB: "2-34-2224",
        image: "assets/images/team/team-1.jpg",
        email: "default@gmail.com",
        contact: "0000000000",
        gender: "Male",
        aadhar: "XXXXXXXXXXXXXX",
    }
};

// Create the Zustand store for Employee management with persistence
const useEmployees = create(
    persist(
        (set) => ({
            ...initialState,

            // Add a new Employee
            addEmployee: (Employee) => set(() => ({ selectedEmployee: Employee })),

            // Remove an Employee (reset to default)
            removeEmployee: () => set(() => ({ selectedEmployee: initialState.selectedEmployee })),

            // Set a new Employee temporarily
            setNewEmployee: (Employee) => set(() => ({ selectedEmployee: Employee })),
        }),
        {
            name: 'employee-store', // Key for localStorage
        }
    )
);

export default useEmployees;
