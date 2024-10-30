import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 타입 정의 (TypeScript를 사용하는 경우)
/**
 * @typedef {Object} Category
 * @property {string} value - 카테고리 식별 값
 * @property {string} label - 간단한 표시 라벨
 * @property {string} fullLabel - 전체 카테고리명
 * @property {string} imagePath - 카테고리 이미지 경로
 */

// 이미지 import
import img0to2 from '@/assets/images/community/category-under-2.png'
import img3to5 from '@/assets/images/community/category-under-5.png'
import img6to7 from '@/assets/images/community/category-under-7.png'
import img8to9 from '@/assets/images/community/category-under-9.png'
import img10to11 from '@/assets/images/community/category-over-10.png'
import imgOver12 from '@/assets/images/community/category-over-12.png'

export const useCategoryStore = defineStore('category', () => {
  // ref를 사용하여 반응형 상태 정의
  const categories = ref([
    { 
      value: '영유아(0~2세)', 
      label: '0~2세',
      fullLabel: '영유아(0~2세)',
      imagePath: img0to2 
    },
    { 
      value: '유아(3~5세)', 
      label: '3~5세',
      fullLabel: '유아(3~5세)', 
      imagePath: img3to5 
    },
    { 
      value: '취학 전 아동(6~7세)', 
      label: '6~7세',
      fullLabel: '취학 전 아동(6~7세)',
      imagePath: img6to7 
    },
    { 
      value: '초등학교 저학년(8~9세)', 
      label: '8~9세',
      fullLabel: '초등학교 저학년(8~9세)',
      imagePath: img8to9 
    },
    { 
      value: '초등학교 중학년(10~11세)', 
      label: '10~11세',
      fullLabel: '초등학교 중학년(10~11세)',
      imagePath: img10to11 
    },
    { 
      value: '초등학교 고학년(12~13세)', 
      label: '12~13세',
      fullLabel: '초등학교 고학년(12~13세)',
      imagePath: imgOver12 
    }
  ])

  // computed를 사용하여 파생된 상태 정의
  const categoryValues = computed(() => 
    categories.value.map(cat => cat.value)
  )

  const categoryLabels = computed(() => 
    categories.value.map(cat => cat.label)
  )

  // 메서드 정의
  const getAllCategories = () => categories.value

  const getCategoryByValue = (value) => {
    return categories.value.find(cat => cat.value === value)
  }

  const getCategoryByLabel = (label) => {
    return categories.value.find(cat => cat.label === label)
  }

  // actions: 상태를 변경하는 메서드 (필요한 경우)
  const addCategory = (category) => {
    categories.value.push(category)
  }

  const removeCategory = (value) => {
    const index = categories.value.findIndex(cat => cat.value === value)
    if (index > -1) {
      categories.value.splice(index, 1)
    }
  }

  // 스토어에서 노출할 상태와 메서드들
  return {
    // state
    categories,
    // getters (computed)
    categoryValues,
    categoryLabels,
    // actions (methods)
    getAllCategories,
    getCategoryByValue,
    getCategoryByLabel,
    addCategory,
    removeCategory
  }
})