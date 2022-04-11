import { ref, onMounted, onUnmounted, computed } from "vue"
import { filter } from "../util/todoStorage"
const validHash = ['all', 'active', 'completed']


export default function (todosRef) {
    const visibilityRef = ref("all");

    const onHashChange = function () {
        const hash = location.hash.replace(/#\//, "")

        if (validHash.includes(hash)) {
            //有效hash
            visibilityRef.value = hash;
        } else {
            location.hash = "";
            visibilityRef.value = "all";
        }
    }

    onMounted(() => {
        window.addEventListener("hashchange", onHashChange)
    })
    onUnmounted(() => {
    })


    const filteredTodosRef = computed(() => {
        return filter(todosRef.value, visibilityRef.value)
    })

    const remainingRef = computed(() => {

        return filter(todosRef.value, "active").length
    })
    const completedRef = computed(() => {

        return filter(todosRef.value, "completed").length
    })

    return {
        visibilityRef,
        filteredTodosRef,
        remainingRef,
        completedRef
    }
}