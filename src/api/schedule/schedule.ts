import type { ScheduleDTO } from "@/types/schedule";
import { apiClient } from "../axios";
import type { APIResponse } from "@/types/api";


export const apiCreateSchedule = async <T>(scheduleDTO: ScheduleDTO): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.post("/schedules", scheduleDTO)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create schedule");
  }
}