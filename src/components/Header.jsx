import logo from "/icon.png"

const Header = () => {
  return (
    <header>
      <img src={logo} className="logo" alt="" />
      <h3 className="site-title">Web Awesome</h3>
    </header>
  )
}

export default Header