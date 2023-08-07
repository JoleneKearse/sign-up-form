import { useState } from "react"


const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    wantsNewsletter: false,
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      console.log("passwords do not match")
    }
    if (formData.wantsNewsletter) {
      console.log("Thanks for signing up for our newsletter!")
    }
    console.log(formData)
  }

  return (
    <form>
      <h2 className="form-title">Sign up here!</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        className="form-input"
        onChange={handleChange}
        value={formData.firstName}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        className="form-input"
        onChange={handleChange}
        value={formData.lastName}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="form-input"
        onChange={handleChange}
        value={formData.email}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="form-input"
        onChange={handleChange}
        value={formData.password}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="form-input"
        onChange={handleChange}
        value={formData.confirmPassword}
      />
      <div className="newsletter">
        <input
          type="checkbox"
          name="wantsNewsletter"
          id="wantsNewsletter"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={formData.wantsNewsletter}
          style={{ boxShadow: formData.wantsNewsletter ? "none" : "inset 1.15em 1.15em var(--clr-neutral-200) !important" }}
        />
        <label htmlFor="wantsNewsletter">Check here to receive our newsletter.</label>
      </div>
      <button
        type="submit"
        className="submitBtn"
        onClick={handleSubmit}
      >Sign Up</button>
    </form>
  )
}

export default Form