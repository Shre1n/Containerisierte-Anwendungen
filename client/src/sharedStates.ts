import { reactive } from 'vue'
import type {Module} from "@/interfaces/Module";

interface SharedStates {
    moduleList: Module[];
    formVisible: boolean;
    showList: boolean | undefined;
}

export const sharedStates: SharedStates = reactive({
    moduleList: [],
    formVisible: false,
    showList: undefined
})


export const editInputs = reactive({
    moduleId: 0,
    moduleName: "",
    moduleCrp: 0,
    moduleGrade: 0,
    moduleWeight: 0
});