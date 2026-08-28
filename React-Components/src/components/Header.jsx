function Header({ title }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <nav>
        <a href="#cards">Cards</a>
        <a href="#form">Form</a>
      </nav>
    </header>
  )
}

export default Header