import { useState } from "react"

function Form() {
  const [name, setName] = useState("")
  const [submittedName, setSubmittedName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmittedName(name)
  }

  return (
    <div className="form-box" id="form">
      <h2>Contact Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      {submittedName && (
        <p>Hello, {submittedName}! 👋</p>
      )}
    </div>
  )
}

export default Form