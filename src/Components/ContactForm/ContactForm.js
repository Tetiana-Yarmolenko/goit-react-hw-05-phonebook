import { Component } from 'react'
import {CSSTransition} from 'react-transition-group'
import { v4 as uuid } from 'uuid';

import s from "./ContactForm.module.css"
import Alert from '../Alert/Alert'
import alertTransition from '../Transition/alertTransition.module.css'

 const INITIAL_STATE = {
     name: '',
     phone: '',
     massage: '',
    showAlert: false,
        
}
    
class ContactForm extends Component {
   
    state = INITIAL_STATE;

    handleChangeForm = ({ target }) => {
        const { name, value } = target
        this.setState({[name]: value})
    } 

    handleFormSubmit = (event) => {
        event.preventDefault()
        const { name, phone } = this.state;
        
        const { onAdd } = this.props;
        
        const isValidateForm = this.validateForm();
         

        if (!isValidateForm) return;
        onAdd({ id: uuid(), name, phone })
        this.resetForm();
    }


    validateForm = () => {
        const { name, phone } = this.state;
        const { onCheckUnique} = this.props;
        if (!name || !phone) {
       this.setState({ showAlert: true, massage: 'Some field is empty'});
            setTimeout(() => this.setState({ showAlert: false }), 1500);
            return;
          
        }
        
        return onCheckUnique(name);
    
    }

    resetForm = () => this.setState(INITIAL_STATE);

    render() {
        const {name, phone, massage, showAlert} = this.state
        return (<>
            <CSSTransition
          in={showAlert}
          timeout={250}
          classNames={alertTransition}
          unmountOnExit
        >
          <Alert massage={massage}/>
        </CSSTransition>
            <form className={s.form}
            onSubmit={this.handleFormSubmit}>
            <label className={s.label}>
                Name
            <input
                    className={s.input}
                    text='text' name='name'
                    placeholder="Enter name"
                    value={name}
                    onChange={this.handleChangeForm} />
            </label>
            <label className={s.label}>
                Phone
            <input
                    className={s.input}
                    text='tel' name='phone'
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={this.handleChangeForm} />
                </label>
            <button className={s.button} type="submit">Add contact</button>
            </form>
        </>)
    }
}

export default  ContactForm