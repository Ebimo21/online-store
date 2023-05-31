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
}

type shopCategory = {
    name: string;
    image: string;
    description?: string;
    amount?: number;
    rating?: number;
}