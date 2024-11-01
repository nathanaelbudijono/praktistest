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

export interface summaryProps {
  totalTransaction: number;
  bestSellingItem: string;
  bestSellingCategory: string;
  revenue: number;
  rpc: rpcProps[];
  bestSpenders: bestSpendersProps[];
}

export interface rpcProps {
  category: string;
  revenue: number;
}

export interface bestSpendersProps {
  naem: string;
  type: string;
  spent: number;
}
