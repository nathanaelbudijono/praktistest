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

export interface buyerTransactionProps extends transactionProps {
  type: string;
  totalPrice: number;
}

export interface rpcProps {
  category: string;
  revenue: number;
}

export interface bestSpendersProps {
  name: string;
  type: string;
  spent: number;
}
