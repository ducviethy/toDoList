const initialState = {
  listToDo: [],
  statusFilter:"SET_ALL"
}
const toDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      let task = {
        id:Date.now(),
        name: action.taskName
      }
      state.listToDo.push(task);
      return { ...state }
    case "DELETE_TASK":
      let listToDoFilter = state.listToDo.filter((item, index) => {
        return item.id !== action.id
      })
      console.log(listToDoFilter);
      state.listToDo = [...listToDoFilter]
      return { ...state }
    case "UPDATE_TASK":
      state.listToDo[action.index].name = action.taskEdit
      state.listToDo = [...state.listToDo]
      return { ...state }
    case "SET_CHECK":
      state.listToDo[action.index].check = action.check;
      state.listToDo = [...state.listToDo]
      return { ...state }
    case "SET_ACTIVE":
      state.listToDo.forEach((item,index) => {
        if (item.check === true) {
          item.status = "Active"
        }
      })
      state.listToDo = [...state.listToDo]
      console.log(state.listToDo);
      state.statusFilter = 'SET_ACTIVE'
      return { ...state }
    case "SET_COMPLETED":
      state.listToDo.forEach((item,index) => {
        if (item.check === true) {
          item.status = "Completed"
        }
      })
      state.listToDo = [...state.listToDo]
      console.log(state.listToDo);
      state.statusFilter = 'SET_COMPLETED'
      return { ...state }
    case "CLEAR_COMPLETED":
      let newListToDo = state.listToDo.filter((item,index) => {
        return item.status !== "Completed"
      })
      state.listToDo = [...newListToDo]
      return { ...state }
    case "SET_ALL":
      state.listToDo = [...state.listToDo]
      state.statusFilter = 'SET_ALL'
      return { ...state }
    default:
      return state
  }
}
export default toDoListReducer