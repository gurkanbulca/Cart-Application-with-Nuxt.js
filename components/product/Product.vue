<template>
  <div class="list-group-item d-flex justify-content-between align-items-center">
    <p class="p-0 m-0 w-100 d-flex align-items-center">
      <span>{{product.title}}</span>
      <span
        class="price-container badge-warning text-white font-italic rounded p-1 ml-3"
      >{{product.price}}₺</span>
    </p>
    <div class="count-container d-flex flex-row justify-content-end mr-3">
      <button class="btn btn-sm btn-outline-danger rounded-0" @click="changeCount(-1)">-</button>
      <input
        disabled
        type="text"
        class="form-control form-control-sm w-25 text-center rounded-0 border-left-0 border-right-0"
        v-model="product_count"
      />
      <button class="btn btn-sm btn-outline-success rounded-0" @click="changeCount(1)">+</button>
    </div>
    <button class="btn btn-sm btn-outline-primary" @click="addToCart()">Sepete Ekle</button>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      product_count: 1
    };
  },
  methods: {
    changeCount(amount) {
      this.product_count += amount;
      if (this.product_count < 1) this.product_count = 1;
    },
    addToCart(){
      let product={...this.product,count:this.product_count,totalPrice:this.product_count*this.product.price}
      this.product_count=1;
      this.$store.dispatch("addToCart",product);
      
    }
  }
};
</script>