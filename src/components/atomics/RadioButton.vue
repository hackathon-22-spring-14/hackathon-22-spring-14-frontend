<template>
  <div v-for="index in options.length" :key="index" class="wrapper">
    <input :id="index.toString" type="radio" name="select" checked />
    <label :for="index.toString" class="option option-{{ index.toString }}">
      <div class="dot"></div>
      <span>{{ options[index] }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RadioButton',
  props: {
    options: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wrapper {
  display: inline-flex;
  background: #fff;
  height: 100px;
  width: 400px;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  padding: 20px 15px;
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
}
.wrapper .option {
  background: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
  padding: 0 10px;
  border: 2px solid lightgrey;
  transition: all 0.3s ease;
}
.wrapper .option .dot {
  height: 20px;
  width: 20px;
  background: #d9d9d9;
  border-radius: 50%;
  position: relative;
}
.wrapper .option .dot::before {
  position: absolute;
  content: '';
  top: 4px;
  left: 4px;
  width: 12px;
  height: 12px;
  background: #0069d9;
  border-radius: 50%;
  opacity: 0;
  transform: scale(1.5);
  transition: all 0.3s ease;
}
input[type='radio'] {
  display: none;
}
#option-1:checked:checked ~ .option-1,
#option-2:checked:checked ~ .option-2 {
  border-color: #0069d9;
  background: #0069d9;
}
#option-1:checked:checked ~ .option-1 .dot,
#option-2:checked:checked ~ .option-2 .dot {
  background: #fff;
}
#option-1:checked:checked ~ .option-1 .dot::before,
#option-2:checked:checked ~ .option-2 .dot::before {
  opacity: 1;
  transform: scale(1);
}
.wrapper .option span {
  font-size: 20px;
  color: #808080;
}
#option-1:checked:checked ~ .option-1 span,
#option-2:checked:checked ~ .option-2 span {
  color: #fff;
}
</style>
