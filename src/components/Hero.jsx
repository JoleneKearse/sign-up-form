import hero from "/hero.png"

const Hero = () => {
  return (
    <section className='hero-section'>
      <h1>Welcome to Web Awesome!</h1>
      <img src={hero} className="hero-img" alt="" />
      <p>Are you ready to reach the heights of a Career in Web Development?  Look no further than our classes.  Sign up now!</p>
    </section>
  )
}

export default Hero