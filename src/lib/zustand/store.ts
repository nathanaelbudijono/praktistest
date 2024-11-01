import { create } from "zustand";
import {
  summarySlices,
  summarySlicesFunctionProps,
  summarySlicesProps,
} from "./summary-slice";

export const useSummaryStore = create<
  summarySlicesProps & summarySlicesFunctionProps
>((...a) => ({
  ...summarySlices(...a),
}));
