export interface GetUser {
    id: number;
    email: string
    pass: string;
    rolId: number;
    isActive: boolean
    rol: {
        id: number
        rol: string
        isActive: boolean
    }
}

export interface CreateUser {
    email: string
    pass: string
    rolId: number
}

export interface UpdateUser {
    id: number;
    email: string
    pass: string;
    rolId: number;
 
    
}