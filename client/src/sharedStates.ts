import { reactive } from 'vue'
import type {Module} from "@/interfaces/Module";

interface SharedStates {
    moduleList: Module[];
    formVisible: boolean;
}

export const sharedStates: SharedStates = reactive({
    moduleList: [],
    formVisible: false
})