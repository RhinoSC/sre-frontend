
import type { Run, RunDTO } from "@/types/run";
import { apiClient } from "../axios";
import type { APIResponse } from "@/types/api";


export const apiGetRuns = async <T>(): Promise<APIResponse<Run[]>> => {
  try {
    const response = await apiClient.get(`/runs`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get runs`);
  }
}

export const apiGetRunByID = async <T>(id: string): Promise<APIResponse<Run>> => {
  try {
    const response = await apiClient.get(`/runs/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get run by id: ${id}`);
  }
}

export const apiCreateRun = async <T>(runDTO: RunDTO): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.post("/runs", runDTO)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create run");
  }
}

export const apiUpdateScheduleRuns = async <T>(runs: Run[]): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.post("/runs/order", runs)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to update schedule runs");
  }
}