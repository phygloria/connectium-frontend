<template>
  <div class="mypage-container">
    <h1>마이페이지</h1>
    <div class="mypage-content">
      <div class="left-section">
        <h2>내 북마크</h2>
        <div class="bookmarks-list" style="max-height: 600px; overflow-y: auto;">
          <BookmarkList :bookmarks="bookmarks" @removeBookmark="removeBookmark" />
        </div>
      </div>
      <div class="right-section">
        <div class="calendar-section">
          <FullCalendar ref="fullCalendar" :options="calendarOptions" />
        </div>
        <div class="todo-section">
          <h3>할 일 목록 - {{ formatDate(selectedDate) }}</h3>
          <TodoList
            :todos="todosForSelectedDate"
            :selectedDate="selectedDate"
            @addTodo="addTodo"
            @removeTodo="removeTodo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import BookmarkList from './BookmarkList.vue';
import TodoList from './TodoList.vue';
import api from '@/services/api';

const fullCalendar = ref(null);
const bookmarks = ref([]);
const todos = ref([]);
const selectedDate = ref(new Date());

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  dateClick: handleDateClick,
  events: []
});

const todosForSelectedDate = computed(() => {
  return todos.value.filter(todo =>
    new Date(todo.date).toDateString() === selectedDate.value.toDateString()
  );
});

function handleDateClick(arg) {
  selectedDate.value = arg.date;
}

function formatDate(date) {
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

async function fetchEvents() {
  try {
    const response = await api.getTodos();
    todos.value = response;
    return todos.value.map(todo => ({
      id: todo.id,
      title: todo.content,
      date: todo.date,
      color: '#4CAF50'
    }));
  } catch (error) {
    console.error('이벤트를 불러오는데 실패했습니다:', error);
    return [];
  }
}

async function fetchBookmarks() {
  try {
    const response = await api.getBookmarks();
    bookmarks.value = response;
  } catch (error) {
    console.error('북마크를 불러오는데 실패했습니다:', error);
  }
}

async function removeBookmark(itemId, itemType) {
  try {
    await api.toggleBookmark({ itemId, itemType });
    await fetchBookmarks();
  } catch (error) {
    console.error('북마크 제거에 실패했습니다:', error);
  }
}

async function fetchTodos() {
  try {
    const response = await api.getTodos();
    todos.value = response;
    await refetchCalendarEvents();
  } catch (error) {
    console.error('할 일 목록을 불러오는데 실패했습니다:', error);
  }
}

async function addTodo(content) {
  try {
    const localDate = new Date(selectedDate.value);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    const dateString = localDate.toISOString().split('T')[0];

    const newTodo = await api.addTodo({
      content,
      date: dateString
    });
    todos.value.push(newTodo);
    
    // 달력에 새 이벤트 추가
    if (fullCalendar.value) {
      const calendarApi = fullCalendar.value.getApi();
      calendarApi.addEvent({
        id: newTodo.id,
        title: newTodo.content,
        date: newTodo.date,
        color: '#4CAF50'
      });
    }
  } catch (error) {
    console.error('할 일 추가에 실패했습니다:', error);
  }
}

async function removeTodo(todoId) {
  try {
    await api.removeTodo(todoId);
    todos.value = todos.value.filter(todo => todo.id !== todoId);
    
    // 달력에서 이벤트 제거
    if (fullCalendar.value) {
      const calendarApi = fullCalendar.value.getApi();
      const eventToRemove = calendarApi.getEventById(todoId);
      if (eventToRemove) {
        eventToRemove.remove();
      }
    }
  } catch (error) {
    console.error('할 일 제거에 실패했습니다:', error);
  }
}

async function refetchCalendarEvents() {
  if (fullCalendar.value) {
    const calendarApi = fullCalendar.value.getApi();
    calendarApi.removeAllEvents();
    const events = await fetchEvents();
    events.forEach(event => calendarApi.addEvent(event));
  }
}

onMounted(async () => {
  await Promise.all([fetchBookmarks(), fetchTodos()]);
  await refetchCalendarEvents();
});
</script>

<style scoped>
.mypage-container {
  padding: 20px;
}

.mypage-content {
  display: flex;
  gap: 20px;
}

.left-section, .right-section {
  flex: 1;
}

.calendar-section {
  margin-bottom: 20px;
}

.todo-section {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
}
</style>
  
  