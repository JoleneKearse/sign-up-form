import hero from "/hero.png"

const Hero = () => {
  return (
    <section className='hero-section'>
      <h1>Welcome to <span className="gradient-text inline">Web Awesome!</span></h1>
      <img src={hero} className="hero-img" alt="" />
      <p>Are you ready to reach the heights of a career in <span className="gradient-text bold">Web Development</span>?  Look no further than our classes.</p>
      <p>Whether you have just caught the coding bug, or are looking to upskill, we've got you covered.</p>
    </section>
  )
}

export default Hero