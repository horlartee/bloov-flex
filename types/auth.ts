export  interface AuthStateType {
    user: User | null;
    token: string | null;
    }

export interface User {
    bio: string | null;
    backgroundImage: string | null;
    dob: string | "";
    createdAt: string;
    email: string;
    fullName: string;
    gender: string | "N/A";
    imageUrl: string | null;
    isEmailVerified: boolean;
    referralCode: string;
    updatedAt: string;
    username: string;
    _id: string;
}

