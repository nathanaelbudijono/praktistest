import { create } from "zustand";
import {
  summarySlices,
  summarySlicesFunctionProps,
  summarySlicesProps,
} from "./summary-slice";
import { cartFunctionProps, cartSlices, cartSlicesProps } from "./cart-slices";

export const useSummaryStore = create<
  summarySlicesProps & summarySlicesFunctionProps
>((...a) => ({
  ...summarySlices(...a),
}));

export const useCartStore = create<cartSlicesProps & cartFunctionProps>(
  (...a) => ({
    ...cartSlices(...a),
  })
);
