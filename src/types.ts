type UserData = { userName: string, password: string };

type ProductInfo = {
    name: string,
    price: number,
};

enum Sortings {
    Abc = 'Name (A to Z)',
    Cba = 'Name (Z to A)',
    LowestPrice = 'Price (low to high)',
    HighestPrice = 'Price (high to low)',
}

export {UserData, ProductInfo, Sortings};