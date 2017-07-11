const initialState = {
  team: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'TEST':
      return {
        ...state,
        test: action.data
      }
      break;

    default:
      return state
  }
}