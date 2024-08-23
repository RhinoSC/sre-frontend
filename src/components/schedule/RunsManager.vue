<template>
  <div v-if="schedule" class="flex flex-col items-center w-full">
    <div>
      <button
        class="px-4 py-2 text-sm text-white border rounded bg-violet-600 border-violet-600 hover:bg-violet-700 active:bg-violet-900"
        @click="saveStatus">
        Save Runs
      </button>
    </div>
    <div class="flex flex-row flex-wrap w-full gap-6 justify-evenly">
      <div class="flex flex-row items-start justify-between w-full gap-6">
        <div class="flex flex-col items-center justify-center w-full">
          <h1 class="text-xl font-bold">
            Available Runs
          </h1>
          <table class="w-full text-left table-auto rtl:text-right">
            <thead class="dark:bg-gray-dark-300 bg-gray-light-300">
              <tr>
                <th class="px-6 py-3">
                  Runner
                </th>
                <th class="px-6 py-3">
                  Game
                </th>
                <th class="px-6 py-3">
                  Estimate
                </th>
                <th class="px-6 py-3">
                  Setup
                </th>
                <th class="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="run in availableRuns"
                :key="run.id">
                <td class="px-6 py-4">{{ getRunnerString(run) }}</td>
                <td class="px-6 py-4">{{ run.name }}</td>
                <td class="px-6 py-4">{{ MStoStringTime(run.estimate_mili) }}</td>
                <td class="px-6 py-4">{{ MStoStringTime(run.setup_time_mili) }}</td>
                <td class="flex flex-row gap-2 px-6 py-4 w-fit flex-shrink-1">
                  <div class="relative group">
                    <button class="flex flex-col items-center justify-center rounded-full bg-violet-600 w-7 h-7"
                      @click="addRun(run, false)">
                      <svg class="w-6 h-6 text-white-smoke" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M5 12h14m-7 7V5" />
                      </svg>
                    </button>
                    <span
                      class="absolute px-2 py-1 mb-2 text-sm text-white transition-opacity duration-300 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 left-1/2 bottom-full group-hover:opacity-100">Schedule</span>
                  </div>
                  <div class="relative group">
                    <button class="flex flex-col items-center justify-center rounded-full bg-violet-600 w-7 h-7"
                      @click="addRunAsBackup(run)">
                      <svg class="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M4 4a2 2 0 1 0 0 4h16a2 2 0 1 0 0-4H4Zm0 6h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Zm10.707 5.707a1 1 0 0 0-1.414-1.414l-.293.293V12a1 1 0 1 0-2 0v2.586l-.293-.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l2-2Z"
                          clip-rule="evenodd" />
                      </svg>

                    </button>
                    <span
                      class="absolute px-2 py-1 mb-2 text-sm text-white transition-opacity duration-300 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 left-1/2 bottom-full group-hover:opacity-100">
                      Backup</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-col items-center justify-center w-full">
          <h1 class="text-xl font-bold">
            Backup Runs
          </h1>
          <table class="w-full text-left table-auto rtl:text-right">
            <thead class="dark:bg-gray-dark-300 bg-gray-light-300">
              <tr>
                <th class="px-6 py-3">
                  Runner
                </th>
                <th class="px-6 py-3">
                  Game
                </th>
                <th class="px-6 py-3">
                  Estimate
                </th>
                <th class="px-6 py-3">
                  Setup
                </th>
                <th class="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="run in backupRuns"
                :key="run.id">
                <td class="px-6 py-4">{{ getRunnerString(run) }}</td>
                <td class="px-6 py-4">{{ run.name }}</td>
                <td class="px-6 py-4">{{ MStoStringTime(run.estimate_mili) }}</td>
                <td class="px-6 py-4">{{ MStoStringTime(run.setup_time_mili) }}</td>
                <td class="flex flex-row gap-2 px-6 py-4 w-fit">
                  <div class="relative group">
                    <button class="flex flex-col items-center justify-center rounded-full bg-violet-600 w-7 h-7"
                      @click="addRunFromBackup(run)">
                      <svg class="w-6 h-6 text-white-smoke" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M5 12h14m-7 7V5" />
                      </svg>
                    </button>
                    <span
                      class="absolute px-2 py-1 mb-2 text-sm text-white transition-opacity duration-300 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 left-1/2 bottom-full group-hover:opacity-100">Schedule</span>
                  </div>
                  <div class="relative group">
                    <button class="flex flex-col items-center justify-center rounded-full bg-violet-600 w-7 h-7"
                      @click="removeRunFromBackup(run)">
                      <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M5 12h14" />
                      </svg>
                    </button>
                    <span
                      class="absolute px-2 py-1 mb-2 text-sm transition-opacity duration-300 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 text-white-smoke left-1/2 bottom-full group-hover:opacity-100">
                      Remove</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center w-full" v-if="drag">
        <h1 class="text-xl font-bold">
          Schedule overview
        </h1>
        <div>
          <table class="w-full text-left table-auto rtl:text-right">
            <thead class="dark:bg-gray-dark-300 bg-gray-light-300">
              <tr>
                <th class="px-6 py-3">
                  Start time
                </th>
                <th class="px-6 py-3">
                  Runner
                </th>
                <th class="px-6 py-3">
                  Game
                </th>
                <th class="px-6 py-3">
                  Estimate
                </th>
                <th class="px-6 py-3">
                  Setup
                </th>
                <th class="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <draggable v-model="scheduleRows" tag="tbody" item-key="index" @change="sortRows"
              draggable=".item-draggable">
              <template #item="{ element, index }">
                <tr v-if="isRowDay(element)">
                  <td colspan="6" class="font-bold text-center bg-violet-600 text-white-smoke"
                    :draggable="!isRowDay(element)">
                    {{ element.dayText }} {{ index }}</td>
                </tr>
                <tr v-else class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 item-draggable">
                  <td class="flex flex-row items-center justify-start gap-2 px-6 py-4">
                    <svg viewBox="0 0 100 80" width="24" height="24" class="w-4 h-4 fill-current text-white-smoke">
                      <rect width="100" height="20"></rect>
                      <rect y="30" width="100" height="20"></rect>
                      <rect y="60" width="100" height="20"></rect>
                    </svg>
                    {{ element.time }}
                  </td>
                  <td class="px-6 py-4">{{ getRunnerString(element.row) }}</td>
                  <td class="px-6 py-4">{{ element.row.name }}</td>
                  <td class="px-6 py-4">{{ MStoStringTime(element.row.estimate_mili) }}</td>
                  <td class="px-6 py-4">{{ MStoStringTime(element.row.setup_time_mili) }}</td>
                  <td class="flex flex-row justify-between gap-2 px-6 py-4">
                    <div class="relative group">
                      <button class="flex flex-col items-center justify-center rounded-full bg-violet-600 w-7 h-7"
                        @click="removeRun(element)">
                        <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 12h14" />
                        </svg>
                      </button>
                      <span
                        class="absolute px-2 py-1 mb-2 text-sm text-white transition-opacity duration-300 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 left-1/2 bottom-full group-hover:opacity-100">Available</span>
                    </div>
                    <div class="relative group">
                      <button class="flex flex-col items-center justify-center rounded-full bg-violet-600 w-7 h-7"
                        @click="addRunAsBackupFromSchedule(element)">
                        <svg class="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd"
                            d="M4 4a2 2 0 1 0 0 4h16a2 2 0 1 0 0-4H4Zm0 6h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Zm10.707 5.707a1 1 0 0 0-1.414-1.414l-.293.293V12a1 1 0 1 0-2 0v2.586l-.293-.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l2-2Z"
                            clip-rule="evenodd" />
                        </svg>

                      </button>
                      <span
                        class="absolute px-2 py-1 mb-2 text-sm text-white transition-opacity duration-300 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 left-1/2 bottom-full group-hover:opacity-100">
                        Backup</span>
                    </div>
                  </td>
                </tr>
              </template>
            </draggable>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, type PropType, nextTick } from 'vue';
import draggable from 'vuedraggable'
import { uuid } from 'vue-uuid';

import { getRunnerString, MStoStringTime } from '@/utils/strings'
import moment from 'moment-timezone'
import type { Schedule, ManageScheduleRow, ManageSchedule } from '@/types/schedule';
import type { Run } from '@/types/run';

interface Props {
  schedule: ManageSchedule
}

const list = ref([
  { id: 1, name: "Abby", sport: "basket" },
  { id: 2, name: "Brooke", sport: "foot" },
  { id: 3, name: "Courtenay", sport: "volley" },
  { id: 4, name: "David", sport: "rugby" }
])

const props = defineProps<Props>()
let startDate: Date
let startTimeMS: number
let startTime: string
const availableRuns = ref<Run[]>([])
const backupRuns = ref<Run[]>([])
const orderedRuns = ref<Run[]>([])
let scheduleRows = ref<ManageScheduleRow[]>([])
let actualTimeMS: number
const drag = ref(true)

function onEnd(event: Event) {
  event.preventDefault()
}

function addRunAsBackup(run: Run) {
  const indexAvailable = availableRuns.value.findIndex((row: Run) => row.id === run.id)
  availableRuns.value.splice(indexAvailable, 1)
  run.status = "backup"
  backupRuns.value.push(run)
}

function removeRunFromBackup(run: Run) {
  const indexBackup = backupRuns.value.findIndex((row: Run) => row.id === run.id)
  backupRuns.value.splice(indexBackup, 1)
  run.status = "default"
  availableRuns.value.push(run)
}

function addRunFromBackup(run: Run) {
  removeRunFromBackup(run)
  addRun(run, false)
}

function addRunAsBackupFromSchedule(element: ManageScheduleRow) {
  removeRun(element)
  addRunAsBackup(element.row)
}

function isRowDay(item: ManageScheduleRow) {
  if (item.dayRow) {
    return true
  }
  return false
}

function getDay(item: ManageScheduleRow, firstDay: boolean) {
  let newDate;
  if (firstDay) {
    newDate = new Date(startTimeMS)
  }
  else {
    newDate = new Date(item.row.start_time_mili)
  }
  return newDate.toLocaleDateString('en-US', { dateStyle: 'medium' })
}

function setFirstRow(item: ManageScheduleRow, firstTime: boolean) {
  actualTimeMS = startTimeMS + item.row.estimate_mili + item.row.setup_time_mili

  item.row.start_time_mili = startDate.getTime()
  item.time = startDate.toLocaleString('en-US', { hour12: false, timeStyle: 'short' })

  if (!firstTime) {
    item.newDay = true
    item.dayText = getDay(item, true)
  } else {
    item.newDay = true
    item.dayText = getDay(item, true)
    scheduleRows.value.push({ _id: uuid.v4(), dayRow: true, start: MStoStringTime(item.row.start_time_mili), dayText: item.dayText, } as ManageScheduleRow)
    scheduleRows.value.push(item)
  }
}

function setNextFirstRows(itemBefore: ManageScheduleRow, item: ManageScheduleRow) {
  const oldStartDate = new Date(actualTimeMS - (itemBefore.row.estimate_mili + itemBefore.row.setup_time_mili))
  const oldEndDate = new Date(actualTimeMS)

  actualTimeMS += item.row.estimate_mili + item.row.setup_time_mili

  item.row.start_time_mili = oldEndDate.getTime()
  item.time = oldEndDate.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })
  item.newDay = false

  if (oldStartDate.getDate() != oldEndDate.getDate()) {
    item.newDay = true
  }
  item.dayText = getDay(item, false)
}

function setNextRows(itemBefore: ManageScheduleRow, item: ManageScheduleRow) {
  const oldStartDate = new Date(itemBefore.row.start_time_mili)
  const oldEndDate = new Date(itemBefore.row.start_time_mili + itemBefore.row.estimate_mili + itemBefore.row.setup_time_mili)

  item.row.start_time_mili = oldEndDate.getTime()
  item.time = oldEndDate.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })
  item.newDay = false

  if (oldStartDate.getDate() != oldEndDate.getDate()) {
    item.newDay = true
    item.dayText = getDay(item, false)
  }
  item.dayText = getDay(item, false)
}

function setTitles(testArr: ManageScheduleRow[], creating: boolean) {
  if (creating) {
    testArr.splice(0, 0, { _id: uuid.v4(), dayRow: true, start: startTime, dayText: startDate.toLocaleDateString('en-US', { dateStyle: 'medium' }) } as ManageScheduleRow)
  }
  const localArray: ManageScheduleRow[] = JSON.parse(JSON.stringify(testArr))
  let firstDate = new Date(localArray[1].row.start_time_mili)
  for (let j = 2; j < localArray.length; j++) {
    const item = localArray[j]
    const newDate = new Date(item.row.start_time_mili)

    if (firstDate.getDate() != newDate.getDate()) {
      firstDate = newDate
      item.newDay = true
      localArray.splice(j, 0, { _id: uuid.v4(), index_mine: j, newDay: true, time: MStoStringTime(item.row.estimate_mili), dayRow: true, start: MStoStringTime(item.row.start_time_mili), dayText: item.dayText } as ManageScheduleRow)
      j++
    }
  }
  return localArray
}

async function sortRows(event: any) {
  let titleCount = 0
  let testArr = scheduleRows.value.filter((row: ManageScheduleRow) => { if (row.dayRow) { titleCount++ } return row.dayRow === false })

  if (testArr.length === 0) {
    scheduleRows.value = testArr
    return
  }
  testArr.splice(0, 0, { _id: uuid.v4(), dayRow: true, start: startTime, dayText: startDate.toLocaleDateString('en-US', { dateStyle: 'medium' }) } as ManageScheduleRow)

  if (event.moved.newIndex < event.moved.oldIndex) {
    let i = 1
    event.moved.newIndex === 1 ? i = event.moved.newIndex : i = event.moved.newIndex - titleCount
    for (i; i < testArr.length; i++) {
      const item = testArr[i]

      // case when we move to the start of the schedule
      if (event.moved.newIndex == 1) {
        if (i == 1) {
          setFirstRow(item, false)
        }
        else {
          setNextFirstRows(testArr[i - 1], item)
        }
      } else {
        // case when moving backwards in schedule
        if (i > 1) {
          setNextRows(testArr[i - 1], item)
        }
      }
    }
  }
  // case when going forward on schedule
  else {
    let i = 1
    event.moved.oldIndex === 1 ? i = event.moved.oldIndex : i = event.moved.oldIndex - titleCount
    for (i; i < testArr.length; i++) {
      const item = testArr[i]
      if (event.moved.oldIndex == 1) {
        if (i == 1) {
          setFirstRow(item, false)
        } else {
          setNextFirstRows(testArr[i - 1], item)
        }
      } else {
        if (i > 1) {
          setNextRows(testArr[i - 1], item)
        }
      }
    }
  }

  testArr = setTitles(testArr, false)
  scheduleRows.value = testArr

  // Esto es porque no se renderiza bien la fila de la fecha
  drag.value = false
  await nextTick();
  drag.value = true
}

function removeRun(item: ManageScheduleRow) {
  const index = scheduleRows.value.findIndex((row: ManageScheduleRow) => row === item)
  const removedRow = scheduleRows.value.splice(index, 1)

  removedRow[0].row.status = "default"
  availableRuns.value.push(removedRow[0].row)
  // console.log(scheduleRows.value.length - 1, index)
  actualTimeMS -= removedRow[0].row.estimate_mili + removedRow[0].row.setup_time_mili
  sortRows({ moved: { newIndex: scheduleRows.value.length - 1, oldIndex: index } })
}

function addRun(item: Run, fetching: boolean) {
  item.status = "active"
  const run: ManageScheduleRow = { _id: item.id, start: MStoStringTime(item.start_time_mili), dayRow: false, newDay: false, dayText: "", time: "", row: item }

  if (!fetching) {
    const indexAvailable = availableRuns.value.findIndex((row: Run) => row.id === item.id)
    availableRuns.value.splice(indexAvailable, 1)
  }

  if (scheduleRows.value.length === 0) {
    setFirstRow(run, true)
  } else {
    const runTime = scheduleRows.value[scheduleRows.value.length - 1].row.estimate_mili + scheduleRows.value[scheduleRows.value.length - 1].row.setup_time_mili
    const oldStartDate = new Date(actualTimeMS - runTime)
    const oldEndDate = new Date(actualTimeMS)

    actualTimeMS += run.row.estimate_mili + run.row.setup_time_mili


    run.row.start_time_mili = oldEndDate.getTime()
    run.time = oldEndDate.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })

    if (oldStartDate.getDate() != oldEndDate.getDate()) {
      run.newDay = true
      run.dayText = getDay(run, false)
      scheduleRows.value.push({
        _id: item.id,
        dayRow: true, start: MStoStringTime(run.row.start_time_mili), dayText: run.dayText,
        newDay: false,
        time: MStoStringTime(run.row.estimate_mili),
        row: {} as Run
      })
    }

    run.dayText = getDay(run, false)


    scheduleRows.value.push(run)
  }
}

const emit = defineEmits(['saveRuns'])

function saveStatus() {
  orderedRuns.value = []
  scheduleRows.value.forEach(row => {
    if (row.dayRow === false) {
      orderedRuns.value.push(row.row)
    }
  });
  const editedArrays = { runs: availableRuns.value, backup: backupRuns.value, ordered: orderedRuns.value }
  emit('saveRuns', editedArrays)
}

const disableDrag = ref(false)
onMounted(() => {
  const date = new Date(props.schedule.start_time_mili)
  startDate = date
  startTimeMS = date.getTime()
  startTime = date.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })

  if (props.schedule.runs) {
    availableRuns.value = props.schedule.runs
  }
  if (props.schedule.backup_runs) {
    backupRuns.value = props.schedule.backup_runs
  }
  if (props.schedule.ordered_runs) {
    orderedRuns.value = props.schedule.ordered_runs

    if (props.schedule.ordered_runs.length > 0) {

      const sortedRuns = [...props.schedule.ordered_runs].sort((a, b) => {
        return a.start_time_mili - b.start_time_mili;
      });
      sortedRuns.forEach((run: Run) => {
        addRun(run, true)
      });
    }
  }
})
</script>

<style scoped>
.default-row {
  cursor: auto;
}
</style>