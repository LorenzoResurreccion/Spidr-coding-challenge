import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    guessCost: "",
    spidrPin: "",
  })


  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "spidrPin") {
      //adjust new value
      if (newValue.length <= formData.spidrPin.length || newValue.length > 19) {
        newValue = formData.spidrPin.slice(0, newValue.length)
      } else {
        newValue = formData.spidrPin + newValue.slice(formData.spidrPin.length, newValue.length)
      }
      
      // Remove non-digit characters
      newValue = newValue.replace(/[^\d]/g, "").slice(0, 16);

      // Add dashes
      newValue = newValue.replace(/(.{4})/g, "$1-").slice(0, 19);
      
      if (newValue.endsWith("-")) newValue = newValue.slice(0, -1);
      
    }

    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    //check pin, length = 19 cause of dashes
    if (formData.spidrPin.length !== 19) {
      alert("Spidr PIN must be exactly 16 digits long.");
      return;
    }

    //print info
    console.log("Form Submitted:", formData);

    //reset input fields
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      guessCost: "",
      spidrPin: "",
    })
  };


  //masks pin
  function hidePin(pin) {
    return pin.replace(/\d/g, '#');
  }

  return (
    <div className="form-container" >
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <h2>Guess the Air Fryer Cost</h2>
      
        <h5 className='input-header'>First Name</h5>
        <input
          className='input-field'
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <h5 className='input-header'>Last Name</h5>
        <input
          className='input-field'
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <h5 className='input-header'>Phone Number </h5>
        <input
          className='input-field'
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <h5 className='input-header'>Email</h5>
        <input
          className='input-field'
          name="email"
          placeholder="Email address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <h5 className='input-header'>Guess the Cost</h5>
        <input 
          className='input-field'
          name="guessCost"
          placeholder="Guess the air fryer’s cost ($)"
          type="number"
          value={formData.guessCost}
          onChange={handleChange}
          required
        />

        <h5 className='input-header'>Spidr Pin</h5>
        <input
          className='input-field'
          name="spidrPin"
          placeholder="####-####-####-####"
          value={hidePin(formData.spidrPin)}
          
          onChange={handleChange}
          required
        />

        <h5 className='input-header'></h5>
        <button
          type="submit"
          
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default App
