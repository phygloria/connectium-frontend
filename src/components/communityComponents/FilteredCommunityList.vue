<!-- FilteredCommunityList -->

<template>
  <MainTop />

  <div class="common-container">
    <div class="common-container-line">
      <div class="list-container">
        <div class="list-warpper">
          <div class="commponent-title">
            <h1 class="community-title">{{ category }} 커뮤니티방</h1>
            <p class="community-subtitle">도담도담 이야기 나누어요!</p>
          </div>
          <div class="post-btn">
            <router-link to="/community/create" class="create-post-button"
              >글쓰기</router-link
            >
          </div>

          <div class="category-buttons">
            <!-- 모바일용 토글 드롭다운 -->
            <div class="mobile-category-dropdown">
              <button @click="toggleDropdown" class="dropdown-toggle">
                {{ selectedCategory || "연령대 선택" }}
                <span class="dropdown-arrow" :class="{ open: isDropdownOpen }"
                  >▼</span
                >
              </button>
              <div class="dropdown-menu" :class="{ show: isDropdownOpen }">
                <router-link
                  v-for="category in categories"
                  :key="category.value"
                  :to="{
                    name: 'FilteredCommunity',
                    params: { category: category.value },
                  }"
                  class="dropdown-item"
                  @click="selectCategory(category.label)"
                >
                  {{ category.label }}
                </router-link>
              </div>
            </div>

            <!-- 기존 카테고리 버튼들 (모바일에서는 숨김) -->
            <div class="desktop-category-buttons">
              <router-link
                v-for="category in categories"
                :key="category.value"
                :to="{
                  name: 'FilteredCommunity',
                  params: { category: category.value },
                }"
                custom
                v-slot="{ navigate, isActive }"
              >
                <div class="btn-container">
                  <button @click="navigate" :class="{ active: isActive }">
                    <div>
                      <span class="category-label">{{ category.label }}</span>
                    </div>
                  </button>
                </div>
              </router-link>
            </div>
          </div>

          <div class="list-container">
            <div class="list-Line">
              <div
                v-for="post in filteredPosts"
                :key="post.id"
                class="post-item"
              >
                <router-link
                  :to="{ name: 'CommunityDetail', params: { id: post.id } }"
                  class="post-item-wrapper"
                >
                  <span class="post-category">{{ post.category }}</span>

                  <div>
                    <h3 class="list-title">{{ post.title }}</h3>
                  </div>

                  <div class="list-ediNdelNcount">
                    <span class="post-view-count"
                      >조회수: {{ post.viewCount }}</span
                    >
                    <span class="post-author">{{ post.authorName }}</span>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/css/common_container.css";
import "@/assets/css/community_list.css";
import "@/assets/css/post_list.css";
import MainTop from "@/components/MainTop.vue";

import api from "@/services/api";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useCategoryStore } from '@/stores/categoryStore';

const route = useRoute();

const category = computed(() => route.params.category);
const categoryStore = useCategoryStore()
const categories = categoryStore.getAllCategories()

const posts = ref([]);

const isDropdownOpen = ref(false);
const selectedCategory = ref("");

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectCategory = (label) => {
  selectedCategory.value = label;
  isDropdownOpen.value = false;
};

const fetchPosts = async () => {
  try {
    const response = await api.getAllCommunityPosts();
    posts.value = response;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// const filteredPosts = computed(() => {
//     return posts.value.filter(post => post.category === category.value);
// });

const filteredPosts = computed(() => {
  const category = route.params.category;
  if (category) {
    return posts.value.filter((post) => post.category === category);
  }
  return posts.value;
});

// 화면 클릭시 드롭다운 닫기
onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".mobile-category-dropdown")) {
      isDropdownOpen.value = false;
    }
  });
});


onMounted(fetchPosts);
</script>

<style scoped>
/* 여기에 필요한 스타일을 추가하세요 */

/* 모바일 드롭다운 스타일 */
.mobile-category-dropdown {
  display: none; /* 기본적으로 숨김 */
  width: 100%;
  position: relative;
  margin: 10px 0;
}

.dropdown-toggle {
  width: 100%;
  padding: 10px 15px;
  background: #ffffff;
  border: 2px solid #c0ea6a;
  border-radius: 20px;
  font-family: "MangoDdobak-B", sans-serif;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-arrow {
  transition: transform 0.3s ease;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 2px solid #c0ea6a;
  border-radius: 10px;
  margin-top: 5px;
  z-index: 1000;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  font-family: "MangoDdobak-B", sans-serif;
  font-size: 14px;
}

.dropdown-item:hover {
  background: #f0f0f0;
}




.desktop-category-buttons {
    display: flex;
    flex-direction: row; /* 가로 정렬 */
    justify-content: center;
    align-items: center;
    gap: 10px; /* 버튼 사이 간격 */
}

.category-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
}

.category-buttons .btn-container {
    flex: 0 1 auto; /* 내용물 크기만큼만 차지 */
}

.category-buttons button {
    height: 40px;
    padding: 5px 15px; /* 좌우 여백 추가 */
    border: 2px #c0ea6a solid;
    border-radius: 20px;
    background-color: #ffffff;
    cursor: pointer;
    white-space: nowrap;
    font-family: "MangoDdobak-B", sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    width: 100%; /* 버튼이 컨테이너 전체 너비를 사용하도록 설정 */
    overflow: hidden;
    text-overflow: ellipsis; /* 텍스트가 넘칠 경우 ... 표시 */
}


/* 버튼 활성화 상태 */
.category-buttons button.active {
  background-color: #90ce2d;
  color: white;
  height: 40px; /* 버튼 높이 고정 */
  border-radius: 20px;
  border: 2px #c0ea6a solid;
}

/* 아이패드 12.9인치 */
@media (max-width: 2048px) {
  .category-buttons {
    flex-wrap: wrap;
    gap: 10px;
  }

  .category-buttons .btn-container {
    flex: 0 0 calc(33.33% - 77px);
  }

  .category-buttons button {
    font-size: 20px;
    height: 40px;
  }
}

/* 태블릿 */
@media (max-width: 1024px) {
  .category-buttons {
    gap: 7px;
  }

  .category-buttons .btn-container {
    flex: 0 0 calc(33% - 120px);
  }

  .category-buttons button {
    font-size: 17px;
  }
}

/* 모바일 */
@media (max-width: 768px) {
  .category-buttons {
    gap: 10px;
  }

  .category-buttons .btn-container {
    flex: 0 0 calc(33% - 120px);
    width: 100%;
  }

  .category-buttons button {
    font-size: 14px;
    height: 40px;
    margin-right: 0;
  }
}

/* 소형 모바일: 575px 이하 */
@media (max-width: 575px) {
  .desktop-category-buttons {
    display: none; /* 기존 카테고리 버튼 숨김 */
  }

  .mobile-category-dropdown {
    display: block; /* 모바일 드롭다운 표시 */
  }

  .category-buttons {
    flex-wrap: wrap;
    gap: 5px;
    width: 50%; /* 전체 너비 사용 */
    height: auto; /* 높이 자동 조정 */
  }
}
</style>
