import { createContext, useState, useContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({children }) {
    const [user, setUser] = useState(localStorage.getItem("currentUserEmail") ? {email: localStorage.getItem("currentUserEmail")} : null);

    function signUp (email, password) {
        // logic to sign up user
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find(u => u.email === email)) {
            return {success: false, message: "User already exists"};
        }
    
        const newUser = {email, password};
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUserEmail", email );
        
        return {success: true};
    }
        
        function logIn (email, password) {
        // logic to log in user
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            u => u.email === email && u.password === password);
        if (!user) {
            return {success: false, message: "Invalid email or password"};
            
        }
        setUser(user);
        localStorage.setItem("currentUserEmail", email);
        return {success: true};
    }
    function logOut () {
        // logic to log out user
        localStorage.removeItem("currentUserEmail");
        setUser(null);  
    }
    return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>{children}</AuthContext.Provider>

    
    );
}
            //custom hook to use auth context

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}