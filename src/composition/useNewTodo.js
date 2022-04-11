import { ref } from "vue";
import { generateId } from "../util/todoStorage";

export default function useNewTodo(todosRef) {
  //新任务标题
  const newTodoRef = ref("")

  const addTodo = () => {
    //新增任务
    const value = newTodoRef.value.trim();
    if (!value) {
      return;
    }
    //生成任务对象，将其加入人物列表
    const todo = {
      id: generateId(),
      title: value,
      completed: false,//任务是否完成
      
    }

    todosRef.value.push(todo)
    newTodoRef.value = ""
  }

  return {
    newTodoRef,
    addTodo
  }
}
