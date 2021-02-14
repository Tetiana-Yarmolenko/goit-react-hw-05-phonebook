import { Component } from 'react';
import {CSSTransition} from 'react-transition-group'

import './App.css';
import { v4 as uuid } from 'uuid';
import s from "./App.module.css"
import Alert from './Alert/Alert'
import Container from './Container/Container'
import ContactForm from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'

import titleTransition from './Transition/titleAppear.module.css'
import fadeTransition from './Transition/fadeTransition.module.css'
import alertTransition from './Transition/alertTransition.module.css'

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', phone: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', phone: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', phone: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', phone: '227-91-26' },
    ],
    filter: '',
    name: '',
    phone: '',
    showAlert: false,
    massage: '',
  }

   toggleAlert = message => {
    this.setState({ showAlert: true, massage: message });
    setTimeout(() => this.setState({showAlert: false}), 1500);
  };
    

// контакти, якщо такі є, зчитуються з локального сховища і записуються в стан.
 
  componentDidMount() {
    const contact = localStorage.getItem('contacts');
    const parsedContact = JSON.parse(contact);

    if (parsedContact) {
      this.setState({ contacts: parsedContact })
    }
  }

  // При додаванні і видаленні контакту, контакти зберігаються в локальне сховище.
 
  componentDidUpdate(prevProps, prevState,) {
    const contact = JSON.stringify(this.state.contacts);
    
    if (this.state.contacts !== prevState.contacts ) {
      localStorage.setItem('contact', contact);
    }
  }

  handleAddContact = (newContact) => this.setState(({ contacts }) => ({
    contacts: [...contacts, newContact],
  })) 



  handleCheckUnique = (name) => {
    const { contacts } = this.state;
    const isExistContacts = !!contacts.find((contact) => contact.name === name)
    isExistContacts && this.toggleAlert('Contacts is already exist')
    return !isExistContacts
  }

  handleRemoveContact = (id) =>
    this.setState(({ contacts }) =>({ contacts: contacts.filter((contact) => contact.id !== id) }))
  
  handleFilterChange = (filter) => this.setState({filter})
  
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()) )
  }

 

  render() {
    const { contacts, filter, showAlert, massage } = this.state
    const visibleContacts = this.getVisibleContacts()
    return (
      <Container>
        <CSSTransition
          in={showAlert}
          timeout={250}
          classNames={alertTransition}
          unmountOnExit
        >
          <Alert massage={massage}/>
        </CSSTransition>
      <CSSTransition
        in
        timeout={500}
        classNames={titleTransition}
         appear
         unmountOnExit>
        <h1 className={s.title}>Phonebook</h1>
      </CSSTransition>
      
      <ContactForm contacts={contacts}  onAdd={this.handleAddContact} onCheckUnique={this.handleCheckUnique} />
      <h2 className={s.contacts}>Contacts</h2>
      <CSSTransition
        in={contacts.length > 1}
        timeout={250}
        classNames={fadeTransition}
        unmountOnExit
      >
       { < Filter filter={filter} onChange={this.handleFilterChange} />}
      </CSSTransition>
     
      {contacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
           onRemove={this.handleRemoveContact}
          />
        )}
    </Container>)
  }
}

export default App;
