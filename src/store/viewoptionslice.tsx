import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  TableViewTypes,
  ViewTypes,
  PlotViewTypes,
  ViewOptionSliceTypes,
} from "types";

const initialState: ViewOptionSliceTypes = {
  current_view: "plot",
  table_options: {
    current_table_view: "enduse",
    enduse_table_options: {
      units: "kbtu_absolute",
      groupby: "enduse",
    },
    carbon_projection_table_options: { units: "kg_co2_per_sf" },
  },
  plot_options: {
    current_plot_view: "multiline",
    multiline_plot_options: {
      units: "kg_co2_per_sf",
      grouping: "mep",
    },
    stacked_plot_options: {
      units: "kg_co2_per_sf",
      current_case_id: 0,
      grouping: "category",
    },
  },
};

export const ViewOptionsSlice = createSlice({
  name: "view_options",
  initialState: initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<ViewTypes>) => {
      state.current_view = action.payload;
    },

    setCurrentTableView: (state, action: PayloadAction<TableViewTypes>) => {
      state.table_options.current_table_view = action.payload;
    },

    setEnduseTableOptions: (
      state,
      action: PayloadAction<{
        key: string;
        val: string;
      }>
    ) => {
      let { key, val } = action.payload;
      //@ts-ignore
      state.table_options.enduse_table_options[key] = val;
    },
    setCarbonTableOptions: (
      state,
      action: PayloadAction<{
        key: string;
        val: string;
      }>
    ) => {
      let { key, val } = action.payload;

      //@ts-ignore
      state.table_options.carbon_projection_table_options[key] = val;
    },
    setCurrentPlotView: (state, action: PayloadAction<PlotViewTypes>) => {
      state.plot_options.current_plot_view = action.payload;
    },

    setMultilinePlotOptions: (
      state,
      action: PayloadAction<{
        key: string;
        val: string;
      }>
    ) => {
      let { key, val } = action.payload;
      //@ts-ignore
      state.plot_options.multiline_plot_options[key] = val;
    },
    setStackedPlotOptions: (
      state,
      action: PayloadAction<{
        key: string;
        val: string | number;
      }>
    ) => {
      let { key, val } = action.payload;
      //@ts-ignore
      state.plot_options.stacked_plot_options[key] = val;
    },
  },
});

export const viewActions = ViewOptionsSlice.actions;

export default ViewOptionsSlice.reducer;
