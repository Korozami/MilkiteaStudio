import React from "react";
import './contactpage.css';

function ContactPage() {

    function handleContact () {
        alert("Message Sent! We will get back to you shortly!!!")
    }

    return (
        <div className='address-form-container'>
            <div className='address-form-heading-container'>
                <div className='address-form-header'>Contact Us</div>
            </div>
            <form className='address-form' onSubmit={handleContact} >
                <div className='address-section'>
                    <div className='form-label'>Name</div>
                    <input className='form-input'
                        type='text'
                        placeholder='Name'
                        required
                    />
                    <div className='form-label'>Your email address</div>
                    <input className='form-input'
                        type='text'
                        placeholder='Email'
                        required
                        />
                    <div className='form-label'>Your message</div>
                    <textarea className='form-input-textarea'
                        type='textarea'
                        required
                        />
                    <button id='address-submit-btn' type='submit'>Send Message</button>
                </div>
            </form>
        </div>
    )
}

export default ContactPage;
