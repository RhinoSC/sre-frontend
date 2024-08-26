import type { MyEvent } from '@/types/event';
import { ref } from 'vue';

export function useEventStore() {
  const eventSelected = ref<MyEvent>();

  function setEvent(event: MyEvent) {
    eventSelected.value = event;
    console.log("aqui: ", eventSelected.value)
  }

  function clearEvent() {
    eventSelected.value = undefined;
  }

  return {
    eventSelected,
    setEvent,
    clearEvent,
  };
}
