const initialState = {
  team: {
    team_id: '',
    team_name: '',
    incoming_webhook: {
      channel: '',
      channel_id: '',
      config_url: '',
      url: '',
    },
  },
  sound: ''
}

export default function (state = initialState, action) {
  switch (action.type) {

    default:
      return state
  }
}