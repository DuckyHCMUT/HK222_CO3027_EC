import Header from "../../components/Header";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import './payment_style.css';
const paymentSucceded = () => {
  alert("I am an alert box!");
}

const Payment = () => {
  const handleClick = () => {
    alert("Successfully paid!. You will return to home page");
    window.location.href = "/";
  };
  return (
    <div>
      <Header user={sessionStorage["user"]} />
      {/* <!-- Payment form --> */}
      <div id="payment" className="wrapper">
        <h2>Payment Form </h2>
        <form action="" method="post">
          {/* <!--Account Information Start--> */}
          <h4>Account</h4>
          <div className="input_group">
            <div className="input_box">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="name"
              />
              <i className="fa fa-user icon"></i>
            </div>
            <div className="input_box">
              <input
                type="text"
                placeholder="Name on Card"
                required
                className="name"
              />
              <i className="fa fa-user icon"></i>
            </div>
          </div>
          <div className="input_group">
            <div className="input_box">
              <input
                type="email"
                placeholder="Email Address"
                required
                className="name"
              />
              <i className="fa fa-envelope icon"></i>
            </div>
          </div>
          <div className="input_group">
            <div className="input_box">
              <input
                type="text"
                placeholder="Address"
                required
                className="name"
              />
              <i className="fa fa-map-marker icon" aria-hidden="true"></i>
            </div>
          </div>
          <div className="input_group">
            <div className="input_box">
              <input type="text" placeholder="City" required className="name" />
              <i className="fa fa-institution icon"></i>
            </div>
          </div>
          {/* <!--Account Information End--> */}

          {/* <!--DOB & Gender Start--> */}
          <div className="input_group">
            <div className="input_box">
              <h4>Date Of Birth</h4>
              <input type="text" placeholder="DD" required className="dob" />
              <input type="text" placeholder="MM" required className="dob" />
              <input type="text" placeholder="YYYY" required className="dob" />
            </div>
            <div className="input_box">
              <h4>Gender</h4>
              <input type="radio" name="gender" className="radio" id="b1" checked/>
              <label  className="gen"for="b1">Male</label>
              <input type="radio" name="gender" className="radio" id="b2" />
              <label  className="gen"for="b2">Female</label>
            </div>
          </div>
          {/* <!--DOB & Gender End--> */}

          {/* <!--Payment Details Start--> */}
          <div className="input_group">
            <div className="input_box">
              <h4>Payment Details</h4>
              <input type="radio" name="pay"  className="radio" id="bc1" checked />
              <label for="bc1">
                <span>
                  <i className="fa fa-cc-visa"></i>Credit Card
                </span>
              </label>
              <input type="radio" name="pay" className="radio" id="bc2" />
              <label for="bc2">
                <span>
                  <i className="fa fa-cc-paypal"></i>Paypal
                </span>
              </label>
            </div>
          </div>
          <div className="input_group">
            <div className="input_box">
              <input
                type="tel"
                name=""
                className="name"
                placeholder="Card Number 1111-2222-3333-4444"
                required
              />
              <i className="fa fa-credit-card icon"></i>
            </div>
          </div>
          <div className="input_group">
            <div className="input_box">
              <input
                type="tel"
                name=""
                className="name"
                placeholder="Card CVC 632"
                required
              />
              <i className="fa fa-user icon"></i>
            </div>
          </div>
          <div className="input_group">
            <div className="input_box">
              <div className="input_box">
                <input
                  type="number"
                  placeholder="Exp Month"
                  required
                  className="name"
                />
                <i className="fa fa-calendar icon" aria-hidden="true"></i>
              </div>
            </div>
            <div className="input_box">
              <input
                type="number"
                placeholder="Exp Year"
                required
                className="name"
              />
              <i className="fa fa-calendar-o icon" aria-hidden="true"></i>
            </div>
          </div>
          <div className="input_box">
            <input
              name="amount"
              readonly
              type="number"
              placeholder="100"
              required
              className="name"
            />{" "}
            <i className="fa fa-dollar icon" aria-hidden="true"></i>
          </div>
          {/* <!--Payment Details End--> */}

          <div className="input_group">
            <div className="input_box">
            <button type="button" onClick={handleClick}>
                Pay Now
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
