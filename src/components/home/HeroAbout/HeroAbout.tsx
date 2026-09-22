import './heroAbout.css';

export default function HeroAbout() {
  return (
    <section className="hero-about-section" aria-labelledby="hero-about-title">
      <div className="container">
        <h2 id="hero-about-title" className="hero-about-title">
          Muthoot <span className="hero-about-gold">Gold Point</span>
        </h2>

        <div className="hero-about-body">
          <p>
            Muthoot Gold Point is a unit of Muthoot Exim (P) Ltd., the precious metal vertical of the Muthoot Pappachan Group that specialises in innovative products and offerings in the precious metal space. The vertical gives customers access to quality products that meet the highest standards at an affordable price. Apart from Muthoot Gold Point, Muthoot Exim&rsquo;s flagship products include Swarnavarsham, Swethavarsham, and Corporate gifting.
          </p>
          <p>
            Visit the corporate website of Muthoot EXIM (P) Ltd to know more about the company:{' '}
            <a href="http://www.muthootexim.com" target="_blank" rel="noopener noreferrer">www.muthootexim.com</a>
          </p>
          <p>
            Muthoot Gold Point is the first national-level organised sector player to get into the recycling of gold that is in sync with the Vision laid down by the Government of India for the Indian Gold Industry.
          </p>
          <p>
            We enable customers to sell gold in a transparent and efficient manner. The unparalleled experience of selling old gold for instant cash is 100% fair and precise. Our customers enjoy a safe, transparent and scientifically tested way of selling gold.
          </p>
          <p>
            Mobile Muthoot Gold Point &ndash; India&rsquo;s First Mobile Gold Buying van buys gold at the customer&rsquo;s doorstep. Continuing with our Group values around trust, we take the XRF and ultrasonic machines to the customer&rsquo;s doorstep to ensure they are getting maximum value for their gold.
          </p>
        </div>
      </div>
    </section>
  );
}
