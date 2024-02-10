import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "../../services/cartService";
import { message } from "antd";
import { sumArrayNumber } from "../../utils/calculate";

const initialState = {
  cartInfo: {},
  cartLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCacheCart: (state, action) => {
      state.cartInfo = action.payload || state.cartInfo;
    },
    clearCart: (state) => {
      state.cartInfo = {};
    },
  },
  extraReducers: (builder) => {
    // GET CART
    builder.addCase(handleGetCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      state.cartInfo = action.payload;
      //   console.log("fulfilledGetCart");
    });
    builder.addCase(handleGetCart.pending, (state) => {
      state.cartLoading = true;
      //   console.log("pendingGetCart");
    });
    builder.addCase(handleGetCart.rejected, (state) => {
      state.cartLoading = false;
      state.cartInfo = {};
      //   console.log("rejectedGetCart");
    });

    //   ADD CART
    builder.addCase(handleAddCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      console.log("action", action);
      console.log("state", state);
      //   console.log("fulfilledAddCart");
    });
    builder.addCase(handleAddCart.pending, (state) => {
      state.cartLoading = true;
      //   console.log("pendingAddCart");
    });
    builder.addCase(handleAddCart.rejected, (state) => {
      state.cartLoading = false;
      //   console.log("rejectedAddCart");
    });

    //   REMOVE FROM CART
    builder.addCase(handleRemoveFromCart.fulfilled, (state) => {
      state.cartLoading = false;
      //   console.log("fulfilledAddCart");
    });
    builder.addCase(handleRemoveFromCart.pending, (state) => {
      state.cartLoading = true;
      //   console.log("pendingAddCart");
    });
    builder.addCase(handleRemoveFromCart.rejected, (state) => {
      state.cartLoading = false;
      //   console.log("rejectedAddCart");
    });

    //   UPDATE CART
    builder.addCase(handleUpdateCart.fulfilled, (state) => {
      state.cartLoading = false;
      //   console.log("fulfilledAddCart");
    });
    builder.addCase(handleUpdateCart.pending, (state) => {
      state.cartLoading = true;
      //   console.log("pendingAddCart");
    });
    builder.addCase(handleUpdateCart.rejected, (state) => {
      state.cartLoading = false;
      //   console.log("rejectedAddCart");
    });
  },
});

// Extract the action creators object and the reducer
const { actions, reducer: cartReducer } = cartSlice;
// Extract and export each action creator by name
export const { updateCacheCart, clearCart } = actions;
// Export the reducer, either as a default or named export
export default cartReducer;

export const handleGetCart = createAsyncThunk(
  "cart/get",
  async (_, thunkApi) => {
    try {
      const cartRes = await cartService.getCart();
      return cartRes?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const handleAddCart = createAsyncThunk(
  "cart/add",
  async (actionPayload, thunkApi) => {
    try {
      const { addedId, addedColor, addedQuantity, addedPrice } = actionPayload;
      const { cartInfo } = thunkApi.getState()?.cart || {};
      let addPayload = {};
      //   console.log("cartInfo", cartInfo);
      console.log("addedQuantity", addedQuantity);

      if (cartInfo.id) {
        // Cart available
        const matchIndex = cartInfo.product?.findIndex(
          (product) => product.id === addedId
        );
        const arrIdProduct = cartInfo.product?.map((product) => product.id);
        const arrQuantity = [...(cartInfo.quantity ?? [])];
        const arrVariant = [...(cartInfo.variant ?? [])];
        const arrTotalProduct = [...(cartInfo.totalProduct ?? [])];
        // Tìm thấy sp trùng id , trùng màu
        if (matchIndex > -1 && arrVariant[matchIndex] === addedColor) {
          arrQuantity[matchIndex] = Number(
            arrQuantity[matchIndex] + Number(addedQuantity)
          );
          arrVariant[matchIndex] = addedColor;
          arrTotalProduct[matchIndex] =
            Number(arrTotalProduct[matchIndex]) + addedQuantity * addedPrice;
        } else {
          arrIdProduct.push(addedId);
          arrQuantity.push(addedQuantity);
          arrVariant.push(addedColor);
          arrTotalProduct.push(addedQuantity * addedPrice);
        }

        const newSubTotal =
          arrTotalProduct.reduce(
            (cur, next) => Number(cur) + Number(next),
            0
          ) || 0;

        const newTotal = newSubTotal - cartInfo.discount;
        // payload to update Cart available
        addPayload = {
          ...cartInfo,
          product: arrIdProduct,
          quantity: arrQuantity,
          variant: arrVariant,
          totalProduct: arrTotalProduct,
          subTotal: newSubTotal,
          total: newTotal,
        };
      } else {
        // Cart null
        // payload to update Cart Null
        addPayload = {
          product: [addedId],
          quantity: [addedQuantity],
          variant: [addedColor],
          totalProduct: [addedPrice * addedQuantity],
          subTotal: addedPrice * addedQuantity,
          total: addedPrice * addedQuantity,
          discount: 0,
          paymentMethod: "",
        };
      }
      console.log("addPayload", addPayload);
      const cartRes = await cartService.updateCart(addPayload);
      thunkApi.dispatch(handleGetCart());
      message.success("Add to cart successfully");
      return cartRes?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const handleRemoveFromCart = createAsyncThunk(
  "cart/remove",
  async (actionPayload, thunkApi) => {
    const { removeIndex } = actionPayload || {};
    const { cartInfo } = thunkApi.getState()?.cart || {};
    if (removeIndex < 0) return false;
    try {
      const newProduct = cartInfo.product
        ?.filter((_, index) => index !== removeIndex)
        .map((product) => product.id);

      const newQuantity = cartInfo.quantity?.filter(
        (_, index) => index !== removeIndex
      );
      const newVariant = cartInfo.variant?.filter(
        (_, index) => index !== removeIndex
      );
      const newTotalProduct = cartInfo.totalProduct?.filter(
        (_, index) => index !== removeIndex
      );
      const newSubTotal = sumArrayNumber(newTotalProduct);
      const newTotal =
        newSubTotal -
        (cartInfo.discount ?? 0) +
        (cartInfo.shipping?.price ?? 0);

      const updatePayload = {
        ...cartInfo,
        product: newProduct,
        quantity: newQuantity,
        variant: newVariant,
        totalProduct: newTotalProduct,
        subTotal: newSubTotal,
        total: newTotal,
        shipping: newProduct?.length > 0 ? cartInfo.shipping : {},
        discount: newProduct?.length > 0 ? cartInfo.discount : 0,
      };
      // console.log("newVariant", newVariant);
      // console.log("newQuantity", newQuantity);
      // console.log("newProduct", newProduct);
      // console.log("newTotalProduct", newTotalProduct);
      // console.log("removeIndex", removeIndex);
      // console.log("newSubTotal", newSubTotal);
      // console.log("newTotal", newTotal);

      const cartRes = await cartService.updateCart(updatePayload);
      thunkApi.dispatch(handleGetCart());
      message.success("Remove from cart successfully");
      // console.log("cartInfo", cartInfo);
      return cartRes?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
      message.error("Remove from cart failed");
      console.log("error", error);
      return;
    }
  }
);

export const handleUpdateCart = createAsyncThunk(
  "cart/update",
  async (actionPayload, thunkApi) => {
    try {
      const cartRes = await cartService.updateCart(actionPayload);
      // await sleep(100);
      thunkApi.dispatch(handleGetCart());
      return cartRes?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
      message.error("Update cart failed");
      console.log("error", error);
    }
  }
);
