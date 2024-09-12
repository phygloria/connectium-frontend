// src/composables/useAllPrograms.js

import { ref } from 'vue';
import api from '@/services/api';

export function useAllPrograms() {
  const programs = ref([]);
  const isLoading = ref(false)
  const error = ref(null)

  const fetchPrograms = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await api.getAllPrograms();
      const culPrograms = response.CulProgram.map(event => ({ 
        ...event, 
        type: 'program1', 
        liked: false,
        imageUrl: event.imageUrl // Program1의 이미지 URL 필드명에 맞게 조정
      }));
      const eduPrograms = response.EduProgram.map(event => ({ 
        ...event, 
        type: 'program2', 
        liked: false,
        imageUrl: event.imgurl // Program2의 이미지 URL 필드명에 맞게 조정
      }));
      programs.value = [...culPrograms, ...eduPrograms];
    } catch (error) {
      console.error('프로그램을 불러오는 데 실패했습니다:', error);
    } finally {
      isLoading.value = false
    }
  };

  return { programs, isLoading, error, fetchPrograms };
}