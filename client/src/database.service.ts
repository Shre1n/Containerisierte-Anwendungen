import type { Module } from "@/interfaces/Module";
import { sharedStates } from "@/sharedStates";
import type { PutModule } from "@/interfaces/PutModule";

/**
 * Gets the Module List from the backend and returns it
 */
export const getModuleList = async () => {
  try {
    const res = await fetch("/api/modules");
    const data = await res.json();
    console.log("WOWW:", data.message)
    return data.moduleList as Module[]
  } catch (e) {
    console.error("Error:", e)
  }
}

/**
 * Gets the Module List from the backend and updates the local array
 */
export const renderModuleList = async () => {
  const moduleList = await getModuleList();
  if (moduleList) {
    sharedStates.moduleList = moduleList;
  }
}


export const putModule = async (id: number, updateData: PutModule) => {
  try {
    const res = await fetch(`/api/module/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    const data = await res.json();
    console.log("WOWW:", data.message)
  } catch (e) {
    console.error("Error:", e)
  }
}

export const deleteModule = async (id: number) => {
  try {
    const res = await fetch(`/api/module/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    console.log("WOWW:", data.message)
  } catch (e) {
    console.error("Error:", e)
  }
}

export const postModule = async (postData: PutModule) => {
  try {
    const res = await fetch(`/api/module`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    const data = await res.json();
    console.log("WOWW:", data.message)
  } catch (e) {
    console.error("Error:", e)
  }
}


export const getModule = async (id: number) => {
  try {
    const res = await fetch(`/api/module/${id}`);
    const data = await res.json();
    console.log("WOWW:", data.message)
    return data.module as Module
  } catch (e) {
    console.error("Error:", e)
  }
}


export const setAndGetNewAccessId = async () => {
  try {
    const res = await fetch(`/api/getAccessId`);
    const data = await res.json();
    console.log("WOWW:", data.message)
    return data.accessId as string
  } catch (e) {
    console.error("Error:", e)
  }
}

export const setAccessId = async (accessId: string) => {
  try {
    const res = await fetch(`/api/setAccessId`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accessId),
    });
    const data = await res.json();
    console.log("WOWW:", data.message)
    return data.accessId as string
  } catch (e) {
    console.error("Error:", e)
  }
}

export const checkAccessId = async () => {
  try {
    const res = await fetch(`/api/checkAccessId`);
    return res.status === 200;
  } catch (e) {
    console.error("Error:", e)
  }
}
