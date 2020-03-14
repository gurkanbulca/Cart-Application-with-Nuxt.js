<template>
  <tr class="bg-custom-color">
    <td class="p-2">{{item.title}}</td>
    <td class="p-2 text-center w-25">
      <div class="d-flex flex-row justify-content-center p-0 m-0">
        <button class="btn btn-sm btn-outline-danger rounded-0" @click="changeCount(-1)">-</button>
        <input
          disabled
          type="text"
          class="form-control form-control-sm w-30 text-center rounded-0 border-left-0 border-right-0"
          :value="product_count"
        />
        <button class="btn btn-sm btn-outline-success rounded-0" @click="changeCount(1)">+</button>
      </div>
    </td>
    <td class="p-2 text-center">{{item.price.toFixed(2)}}₺</td>
    <td class="p-2 text-center">{{item.totalPrice.toFixed(2)}}₺</td>
    <td class="p-2 text-center">
      <button class="btn btn-sm btn-danger" @click="removeFromCart">Sil</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    product_count() {
      return this.item.count;
    }
  },
  methods: {
    changeCount(count) {
      if (count == -1 && this.item.count == 1) {
        this.$store.dispatch("removeProduct", this.item);
      } else {
        this.$store.dispatch("changeCount", { item: this.item, count });
      }
    },
    removeFromCart() {
      this.$store.dispatch("removeProduct", this.item);
    }
  }
};
</script>

<style>
</style>