import { ref, computed } from "vue";


export default function (todosRef) {
    const editingTodoRef = ref(null); // 当前修改的todo
    let originTitle = null;//缓存之前title

    // 双击进行编辑
    const editTodo = (todo) => {
        editingTodoRef.value = todo
        originTitle = todo.title
    }

    //完成编辑
    const doneEdit = (todo , e) => {
        editingTodoRef.value = null;
        console.log(e)  
        const title = todo.title.trim();
        if (title) {
            todo.title = title;
        } else {
            //若没值，删除todo
            todosRef.value.splice(todosRef.value.indexOf(todo), 1)
        }
    }

    //取消编辑
    const cancelEdit = (todo) => {
        editingTodoRef.value = null;
        console.log(originTitle)
        todo.title = originTitle
    }

    const allDoneRef = computed({
        get() {
            return todosRef.value.filter((item) => !item.completed).length === 0;
        },
        set(checked) {
            todosRef.value.forEach(item => {
                item.completed = checked
            })
        }
    })

    return {
        editingTodoRef,
        editTodo,
        doneEdit,
        cancelEdit,
        allDoneRef
    }
}