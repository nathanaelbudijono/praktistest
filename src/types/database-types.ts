export interface itemProps {
  name: string;
  type: string;
  prices: pricesProps[];
}

export interface pricesProps {
  priceFor: string;
  price: number;
}

export interface buyersProps {
  name: string;
  type: string;
}

export interface transactionProps {
  item: string;
  qty: number;
  buyer: string;
}
