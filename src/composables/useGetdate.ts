import { ref } from 'vue'

interface WeekRange {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
}

interface MonthRange {
  days: string[]
}

interface YearRange {
  months: string[]
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
  })

  const currentMonthRange = ref<MonthRange>({ days: [] })
  const currentYearRange = ref<YearRange>({ months: [] })

  const getCurrentWeekRange = () => {
    const currentDate = new Date()
    const dayOfWeek = currentDate.getDay() // 0 (Sunday) to 6 (Saturday)

    const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    const mondayDate = new Date(currentDate)
    mondayDate.setDate(currentDate.getDate() + distanceToMonday)

    const formatDate = (date: Date) => {
      const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, '0')
      return `${date.getFullYear()}-${month}-${day}`
    }

    currentWeek.value = {
      monday: formatDate(mondayDate),
      tuesday: formatDate(new Date(mondayDate.setDate(mondayDate.getDate() + 1))),
      wednesday: formatDate(new Date(mondayDate.setDate(mondayDate.getDate() + 1))),
      thursday: formatDate(new Date(mondayDate.setDate(mondayDate.getDate() + 1))),
      friday: formatDate(new Date(mondayDate.setDate(mondayDate.getDate() + 1))),
      saturday: formatDate(new Date(mondayDate.setDate(mondayDate.getDate() + 1))),
      sunday: formatDate(new Date(mondayDate.setDate(mondayDate.getDate() + 1))),
    }
  }

  const getCurrentMonthRange = () => {
    const currentDate = new Date()
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()

    const days = Array.from({ length: daysInMonth }, (_, i) => String(i + 1).padStart(2, '0'))
    currentMonthRange.value = { days }
  }

  const getCurrentYearRange = () => {
    const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
    currentYearRange.value = { months }
  }

  getCurrentWeekRange()
  getCurrentMonthRange()
  getCurrentYearRange()

  return {
    currentWeek,
    currentMonthRange,
    currentYearRange,
  }
}
