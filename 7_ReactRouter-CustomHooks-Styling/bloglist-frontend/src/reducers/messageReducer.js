const messageReducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        content: action.payload.content,
        type: action.payload.class,
      }
    case 'CLEAR':
      return {
        content: '',
        type: '',
      }
    default:
      return {
        content: '',
        type: '',
      }
  }
}

export default messageReducer