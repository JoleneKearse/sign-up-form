import { useState } from "react"
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

  const schema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6).max(15),
    confirmPassword: z.string().min(6).max(15),
    wantsNewsletter: z.boolean()
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
    // TODO: Add on keyup check if password !== confirmPassword

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
    } catch (error) {
      console.log(error)
    }
    console.log(formData)
  }

  return (
    <form>
      <h2 className="form-title">Sign up here!</h2>
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
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        className="form-input"
        onChange={handleChange}
        value={formData.confirmPassword}
      />
      <label htmlFor="confirmPassword" className="sr-only">First Name</label>
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