<template>
  <div class="cart-container card shadow">
    <h3 class="text-center">Sepet</h3>
    <Alert v-if="isEmpty" />
    <CartItems :cart="cart" v-else />
    <CartFooter :totalPrice="totalPrice" />
  </div>
</template>

<script>
import Alert from "@/components/cart/Alert";
import CartItems from "@/components/cart/CartItems";
import CartFooter from "@/components/cart/CartFooter";
export default {
  components: {
    Alert,
    CartItems,
    CartFooter
  },
  props: {
    cart: {
      required: false,
      type: Array,
      default: []
    },
    totalPrice: {
      required: true,
      type: Number
    },
    isEmpty: {
      required: true,
      type: Boolean
    }
  }
};
</script>