import Header from "./components/Header"
import Footer from "./components/Footer"
import Card from "./components/Card"
import Button from "./components/Button"
import Form from "./components/Form"
import "./App.css"

function App() {

  const handleClick = () => {
    alert("Button clicked!")
  }

  return (
    <div className="app">

      <Header title="React Components Practice" />

      <main>

        <section className="hero">
          <h2>Reusable React Components</h2>

          <p>
            This project demonstrates reusable components,
            props and state in React.
          </p>

          <Button
            text="Click Me"
            onClick={handleClick}
          />
        </section>


        <section id="cards" className="cards-section">

          <h2>Reusable Cards</h2>

          <div className="cards-container">

            <Card
              title="HTML & CSS"
              description="Building responsive and modern web interfaces."
            />

            <Card
              title="React"
              description="Creating reusable components using React."
            />

            <Card
              title="JavaScript"
              description="Adding interactivity and dynamic functionality."
            />

          </div>

        </section>


        <Form />

      </main>

      <Footer name="Sonu Yadav" />

    </div>
  )
}

export default App