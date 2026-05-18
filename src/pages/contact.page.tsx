const ContactPage = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form>
        <input type="text" name="name" id="name" placeholder="Full Name" />
        <br />
        <input type="email" name="email" id="email" placeholder="Your Email" />
        <br />
        <textarea
          name="message"
          id="message"
          placeholder="Your Message"
        ></textarea>
        <br />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};
export default ContactPage;
