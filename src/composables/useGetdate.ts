// useCurrentWeekRange.ts

import { ref } from 'vue';

interface WeekRange {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export default function useCurrentWeekRange() {
  const currentWeek = ref<WeekRange>({
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
  });

  const getCurrentWeekRange = () => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Calculate the date for Monday (first day of the week)
    const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const mondayDate = new Date(currentDate);
    mondayDate.setDate(currentDate.getDate() + distanceToMonday);

    // Create a helper function to format the date as MM-DD
    const formatDate = (date: Date) => {
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}-${day}`;
    };

    // Calculate all days of the week based on Monday
    currentWeek.value = {
      monday: formatDate(mondayDate),
      tuesday: formatDate(new Date(mondayDate.setDate(mondayDate.getDate() + 1))),
      wednesday: formatDate(new Date(mondayDate.setDate(mondayDate.getDate() + 1))),
      thursday: formatDate(new Date(mondayDate.setDate(mondayDate.getDate() + 1))),
      friday: formatDate(new Date(mondayDate.setDate(mondayDate.getDate() + 1))),
      saturday: formatDate(new Date(mondayDate.setDate(mondayDate.getDate() + 1))),
      sunday: formatDate(new Date(mondayDate.setDate(mondayDate.getDate() + 1))),
    };
  };

  // On mounted, get the current week range
  getCurrentWeekRange();

  return {
    currentWeek,
    getCurrentWeekRange,
  };
}
