<template>
    <div class="todo-list">
      <div v-for="todo in todos" :key="todo.id" class="todo-item">
        <span>{{ todo.content }}</span>
        <button @click="emit('removeTodo', todo.id)" class="remove-btn">삭제</button>
      </div>
      <div class="add-todo">
        <input v-model="newTodo" placeholder="새로운 할 일" @keyup.enter="addNewTodo" />
        <button @click="addNewTodo" class="add-btn">추가</button>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';

defineProps(['todos', 'selectedDate']);
const emit = defineEmits(['addTodo', 'removeTodo']);

const newTodo = ref('');

function addNewTodo() {
  if (newTodo.value.trim()) {
    emit('addTodo', newTodo.value);
    newTodo.value = '';
  }
}
</script>
  
  <style scoped>
  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
  }
  
  .add-todo {
    display: flex;
    gap: 10px;
  }
  
  input {
    flex: 1;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .add-btn, .remove-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .remove-btn {
    background-color: #ff4d4d;
  }
  </style>