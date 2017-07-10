const initialState = {
  test: ['test props'],
  clientId: process.env.SLACK_ID,
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