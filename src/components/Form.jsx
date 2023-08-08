import { useState, useEffect } from "react"
import { z } from "zod"

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    wantsNewsletter: false,
  })

  const [showEmailAlert, setShowEmailAlert] = useState(false)
  const [errors, setErrors] = useState([])

  const schema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6).max(15),
    confirmPassword: z.string().min(6).max(15),
    wantsNewsletter: z.boolean()
  }).refine(
    (data) => data.password !== data.confirmPassword,
    {
      message: "Passwords do not match"
    }
  )

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  function handleKeyUp(e) {
    const { name, value } = e.target
    if (name === "confirmPassword") {
      setShowEmailAlert(formData.password !== value)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (formData.wantsNewsletter) {
      console.log("Thanks for signing up for our newsletter!")
    }
    try {
      schema.parse(formData)
      console.log(formData)
      console.log("Success!")
      setErrors([])
    } catch (error) {
      console.log(error.format())
      setErrors(error.format())

    }
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <form>
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First Name"
        className="form-input"
        onChange={handleChange}
        value={formData.firstName}
      />
      <label htmlFor="firstName" className="sr-only">First Name</label>
      {errors.firstName && (
        <div className="error-container">
          {errors.firstName._errors.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Last Name"
        className="form-input"
        onChange={handleChange}
        value={formData.lastName}
      />
      <label htmlFor="lastName" className="sr-only">Last Name</label>
      {errors.lastName && (
        <div className="error-container">
          {errors.lastName._errors.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className="form-input"
        onChange={handleChange}
        value={formData.email}
      />
      <label htmlFor="email" className="sr-only">Email</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className="form-input"
        onChange={handleChange}
        value={formData.password}
      /><label htmlFor="password" className="sr-only">Password</label>
      {errors.password && (
        <div className="error-container">
          {errors.password._errors.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        className="form-input"
        onChange={handleChange}
        value={formData.confirmPassword}
        onBlur={handleKeyUp}
      // onKeyUp={handleKeyUp}
      />
      <label htmlFor="confirmPassword" className="sr-only">First Name</label>
      {showEmailAlert && (
        <div className="error-container">
          <p>Passwords do not match</p>
        </div>
      )}
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
        <label htmlFor="wantsNewsletter" className="newsletter-label">Check here to receive our newsletter.</label>
      </div>
      <button
        type="submit"
        className="submitBtn"
        onClick={handleSubmit}
      >Sign up</button>
    </form>
  )
}

export default Form