const Features = () => {
    return (
        
        <section className="offer_section layout_padding-bottom">
    <div className="offer_container">
      <div className="container ">
        <div className="row">
          <div className="col-md-6  ">
            <div className="box ">
              <div className="img-box">
                <img src="images/o1.jpg" alt=""/>
              </div>
              <div className="detail-box">
                <h5>
                  Tasty Thursdays
                </h5>
                <h6>
                  <span>20%</span> Off
                </h6>
                <a href="">
                  Order Now  <i className="bi bi-cart3" style={{fontSize: 20}} aria-hidden="true"></i>
                    
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6  ">
            <div className="box ">
              <div className="img-box">
                <img src="images/o2.jpg" alt=""/>
              </div>
              <div className="detail-box">
                <h5>
                  Pizza Days
                </h5>
                <h6>
                  <span>15%</span> Off
                </h6>
                <a href="">
                Order Now  <i className="bi bi-cart3" style={{fontSize: 20}} aria-hidden="true"></i>
                    
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    )
}

export default Features;