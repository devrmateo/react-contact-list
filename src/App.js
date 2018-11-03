import React from 'react';
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends React.Component {
  state = {
     screen: 'list',
     contacts: []
  }

  componentDidMount() {
     ContactsAPI.getAll().then((contacts) => {
          this.setState({
               contacts: contacts
          })
     })
  }

  removeContact = (contact) => {
     this.setState((state) => ({
          contacts: state.contacts.filter((c) => c.id !== contact.id)
          }))

     ContactsAPI.remove(contact);
     }

   navigate = () => {
     this.setState({
          screen: 'create',
     })
   }

  render() {
    return (
      <div className="app">
          {this.state.screen === 'list' && (
               <ListContacts
                    contacts={this.state.contacts}
                    onDeleteContact={this.removeContact}
                    onNavigate={this.navigate}
               />
          )}
          {this.state.screen === 'create' && (
               <CreateContact />
          )}
      </div>
    )
  }
}

export default App;
