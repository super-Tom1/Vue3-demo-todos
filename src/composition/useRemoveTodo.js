

export default function (todosRef) {
    const remove = (todo) => {
        todosRef.value.splice(todosRef.value.indexOf(todo), 1)
    }

    const removeCompleted = () => {
        todosRef.value = todosRef.value.filter(item => {
            return !item.completed
        })
    }
    return {
        remove,
        removeCompleted
    }
}