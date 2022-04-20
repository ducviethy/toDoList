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
      localStorage.setItem('listToDo',JSON.stringify(state.listToDo))
      return { ...state }
    case "DELETE_TASK":
      let listToDoFilter = state.listToDo.filter((item, index) => {
        return item.id !== action.id
      })
      state.listToDo = [...listToDoFilter]
      localStorage.setItem('listToDo',JSON.stringify(state.listToDo))
      return { ...state }
    case "UPDATE_TASK":
      state.listToDo[action.index].name = action.taskEdit
      state.listToDo = [...state.listToDo]
      localStorage.setItem('listToDo',JSON.stringify(state.listToDo))
      return { ...state }
    case "SET_CHECK":
      state.listToDo[action.index].check = action.check;
      state.listToDo = [...state.listToDo]
      localStorage.setItem('listToDo',JSON.stringify(state.listToDo))
      return { ...state }
    case "SET_ACTIVE":
      state.listToDo.forEach((item,index) => {
        if (item.check !== true) {
          item.status = "Active"
        }
      })
      state.listToDo = [...state.listToDo]
      state.statusFilter = 'SET_ACTIVE'
      localStorage.setItem('listToDo',JSON.stringify(state.listToDo))
      return { ...state }
    case "SET_COMPLETED":
      state.listToDo.forEach((item,index) => {
        if (item.check === true) {
          item.status = "Completed"
        }
      })
      state.listToDo = [...state.listToDo]
      state.statusFilter = 'SET_COMPLETED'
      localStorage.setItem('listToDo',JSON.stringify(state.listToDo))
      return { ...state }
    case "CLEAR_COMPLETED":
      let newListToDo = state.listToDo.filter((item,index) => {
        return item.check !== true
      })
      state.listToDo = [...newListToDo]
      localStorage.setItem('listToDo',JSON.stringify(state.listToDo))
      return { ...state }
    case "SET_ALL":
      var temp = JSON.parse(localStorage.getItem('listToDo'));
      if (temp) {
        state.listToDo = temp
      }else{
        localStorage.setItem('listToDo',JSON.stringify([]))
      }
      state.statusFilter = 'SET_ALL'
      return { ...state }
    case "activeAll":
      console.log('active all');
      state.listToDo.forEach((item,index) => {
        item.check = true
      })
      state.listToDo = [...state.listToDo]
      return { ...state }
    case "deActiveAll":
      console.log('de active all');
      state.listToDo.forEach((item,index) => {
        item.check = false
      })
      state.listToDo = [...state.listToDo]
      return { ...state }
    default:
      return state
  }
}
export default toDoListReducer