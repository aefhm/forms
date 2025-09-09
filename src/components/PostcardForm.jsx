import { createSignal } from "solid-js";
import Navbar from "./Navbar";

export default function PostcardForm() {
  const [isSubmitted, setIsSubmitted] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    data.formType = "postcard";
    
    try {
      const res = await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar showBackLink={true} />
      
      {!isSubmitted() ? (
        <form name="postcard-request" onSubmit={handleSubmit}>
          <h2>Postcard Request 💌</h2>

          <p><strong>I'd love to send you a note or postcard!</strong></p>

          <label for="name">Your Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="First and Last"
            required
          />
          <br />

          <label for="content">What would you like me to write?</label>
          <br />
          <textarea
            id="content"
            name="content"
            rows="3"
            placeholder="Any specific message, encouragement, or just surprise me!"
          ></textarea>
          <br />

          <label for="address">Mailing Address</label>
          <br />
          <textarea
            id="address"
            name="address"
            rows="4"
            placeholder="Street, City, State, Zip (VERY IMPORTANT!), and Country"
            required
          ></textarea>
          <br />

          <button type="submit">Send Request</button>
        </form>
      ) : (
        <div class="form-container">
          <h2>Thank you! 💌</h2>
          <p>Your postcard request has been received. I'll send something lovely your way!</p>
          <button onClick={() => setIsSubmitted(false)}>Submit Another</button>
        </div>
      )}
    </>
  );
}