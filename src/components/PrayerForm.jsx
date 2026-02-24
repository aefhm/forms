import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import Navbar from "./Navbar";

export default function PrayerForm() {
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const [error, setError] = createSignal(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    data.formType = "prayer";

    try {
      const res = await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");
      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar showBackLink={true} />
      
      {!isSubmitted() ? (
        <form name="prayer-request" onSubmit={handleSubmit}>
          <h2>Prayer Request 🙏</h2>

          <p><strong>What is on your heart?</strong></p>

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

          <label for="prayer">Prayer Request</label>
          <br />
          <textarea
            id="prayer"
            name="prayer"
            rows="4"
            placeholder="How can I petition on your behalf?"
            required
          ></textarea>
          <br />

          {error() && <p class="error-message">{error()}</p>}
          <button type="submit">Send Prayer Request</button>
        </form>
      ) : (
        <div class="form-container">
          <h2>Thank you! 🙏</h2>
          <p>Your prayer request has been received. I'll keep you in my prayers.</p>
          <button onClick={() => setIsSubmitted(false)}>Submit Another</button>
        </div>
      )}
    </>
  );
}