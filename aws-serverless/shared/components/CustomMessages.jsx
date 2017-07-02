import * as React from "react";

export default class CustomMessages extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      newMessage: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }
  handleInputChange(event: any) {
    this.setState({ newMessage: event.target.value })
  }
  addMessage(event: any) {
    event.preventDefault();
    // send out ajax call
  }
  render() {
    return (
      <main>
        <h1>Create Custom Messages</h1>
        <form onSubmit={this.addMessage}>
          <label htmlFor="new-message">What would you like me to say</label>
          <input
            type="text"
            name="new-message"
            onChange={this.handleInputChange}
          />
          <button>Create Message</button>
        </form>
        <ul>
          {this.state.messages.map(message => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      </main>
    );
  }
}
