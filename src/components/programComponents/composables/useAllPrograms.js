// src/composables/useAllPrograms.js

import { ref } from 'vue';
import api from '@/services/api';

export function useAllPrograms() {
  const programs = ref([]);
  const initialPrograms = ref([]); // initialPrograms 추가
  const isLoading = ref(false)
  const error = ref(null)

  const fetchPrograms = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 지연

      // API 호출
      const response = await api.getAllPrograms();

      // 데이터가 있는지 확인 후 처리
      const culPrograms = response?.CulProgram?.map(event => ({
        ...event,
        type: 'program1',
        liked: false,
        imageUrl: event.imageUrl || '' // 이미지 URL이 없을 때 빈 문자열로 처리
      })) || [];
      
      const eduPrograms = response?.EduProgram?.map(event => ({
        ...event,
        type: 'program2',
        liked: false,
        imageUrl: event.imgurl || '' // 이미지 URL이 없을 때 빈 문자열로 처리
      })) || [];


      // 두 배열을 합쳐 programs에 저장
      programs.value = [...culPrograms, ...eduPrograms];
      initialPrograms.value = programs.value; // initialPrograms에 값 할당
    } catch (error) {
      console.error('프로그램을 불러오는 데 실패했습니다:', error);
      error.value = '프로그램을 불러오는 중 오류가 발생했습니다.'; // 에러 메시지 설정
    } finally {
      isLoading.value = false
    }
  };

  return { programs, initialPrograms, isLoading, error, fetchPrograms };
}