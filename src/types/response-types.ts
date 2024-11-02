import { itemProps, transactionProps } from "./database-types";

export interface loginResponseProps {
  message: string;
  status: boolean;
  buyer: {
    name: string;
    type: string;
  };
}

export interface itemDetailResponseProps {
  itemDetail: itemProps;
  message: string;
  status: boolean;
}

export interface transactionResponse {
  message: string;
  status: boolean;
  item: transactionProps[];
}
