import React from "react";
import { saveMessage } from "../services/contact.service";

const ContactPage = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [isSending, setIsSending] = React.useState(false);
  const [status, setStatus] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus(null);

    const response = await saveMessage(name, email, message);

    if (response.success) {
      setStatus({ type: "success", text: response.message });
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus({ type: "error", text: response.message });
    }
    setIsSending(false);
  };
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      {status && (
        <div className={`status-message ${status.type}`}>{status.text}</div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <textarea
          name="message"
          id="message"
          value={message}
          placeholder="Your Message"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <br />
        <button type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};
export default ContactPage;
