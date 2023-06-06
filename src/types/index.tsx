type Props ={
    children: React.ReactNode;
}

type svg ={
    width: number,
    height: number,
    fill?: string,
}

type ShopItem = {
    id: number;
    name: string;
    image: string;
    description: string;
    amount: number;
    rating: number;
    count: number;
    inStock?: number;
}

type ShopBest = {
    id: number;
    name: string;
    image: string;
    description: string;
    amount: number;
    rating: number;
    count: number;
    inStock?: number;
}

type GetProfileDetailsType ={
    success: boolean,
    data: {
        id: string,
        fname: string,
        lname: string,
        email: string,
    }[] | null,
    message: string,
}

type shopCategory = {
    name: string;
    image: string;
    description?: string;
    amount?: number;
    rating?: number;
}

type returnValue ={
    success: boolean,
    data: {
        accessToken: string;
    },
    message: string,
}

type user = { 
    id: string; 
    fname: string; 
    lname: string; 
    email: string; 
    role: string; 
    email_verified: string;
    pfp: string; 
} | null
