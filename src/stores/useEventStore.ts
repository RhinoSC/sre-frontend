// import { ref, watch } from 'vue'
// import { apiGetEvents } from '@/api/event/event'
// import type { MyEvent } from '@/types/event'
// import type { APIResponse } from '@/types/api'

// export function useEventStore() {
//   // Estado global
//   const events = ref<MyEvent[]>([])
//   const selectedEvent = ref<MyEvent | null>(null)

//   // Cargar el evento seleccionado desde localStorage si existe
//   const loadSelectedEvent = () => {
//     const storedEvent = localStorage.getItem('selectedEvent')
//     if (storedEvent) {
//       selectedEvent.value = JSON.parse(storedEvent)
//     }
//   }

//   // Función para obtener eventos desde la API
//   const fetchEvents = async () => {
//     try {
//       const response: APIResponse<MyEvent[]> = await apiGetEvents()
//       events.value = response.data
//     } catch (error) {
//       console.error('Error fetching events:', error)
//     }
//   }

//   // Función para seleccionar un evento
//   const selectEvent = (event: MyEvent) => {
//     selectedEvent.value = event
//   }

//   // Watch para guardar el evento seleccionado en localStorage cuando cambie
//   watch(selectedEvent, (newEvent) => {
//     if (newEvent) {
//       localStorage.setItem('selectedEvent', JSON.stringify(newEvent))
//     } else {
//       localStorage.removeItem('selectedEvent')
//     }
//   })

//   // Llamar a la función de cargar el evento al inicio
//   loadSelectedEvent()

//   return {
//     events,
//     fetchEvents,
//     selectedEvent,
//     selectEvent
//   }
// }

import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { MyEvent } from '@/types/event'
import { apiGetEvents } from '@/api/event/event'

export const useEventStore = defineStore('event', () => {
  // Estado global
  const events = ref<MyEvent[]>([])
  const selectedEvent = ref<MyEvent>({} as MyEvent)

  // Cargar el evento seleccionado desde localStorage si existe
  const loadSelectedEvent = () => {
    const storedEvent = localStorage.getItem('selectedEvent')
    if (storedEvent) {
      selectedEvent.value = JSON.parse(storedEvent)
    }
  }

  // Función para obtener eventos desde la API
  const fetchEvents = async () => {
    try {
      const response = await apiGetEvents()
      events.value = response.data
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  // Función para seleccionar un evento
  const selectEvent = (event: MyEvent) => {
    selectedEvent.value = event
  }

  // Watch para guardar el evento seleccionado en localStorage cuando cambie
  watch(selectedEvent, (newEvent) => {
    if (newEvent) {
      localStorage.setItem('selectedEvent', JSON.stringify(newEvent))
    } else {
      localStorage.removeItem('selectedEvent')
    }
  })

  // Llamar a la función de cargar el evento al inicio
  loadSelectedEvent()

  return {
    events,
    fetchEvents,
    selectedEvent,
    selectEvent,
  }
})

