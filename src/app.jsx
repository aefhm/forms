import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import "./app.css";

function App() {
  const [showPrayer, setShowPrayer] = createSignal(false);
  const [showAddress, setShowAddress] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    
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
      {!isSubmitted() ? (
        <form name="prayer-request-form" onSubmit={handleSubmit}>
          <h2>Hallo!</h2>

          <p><strong>What is on your heart?</strong></p>

          <label>
            <input
              type="checkbox"
              onInput={(e) => setShowPrayer(e.currentTarget.checked)}
            /> I'd like to share a prayer request 🥺
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              onInput={(e) => setShowAddress(e.currentTarget.checked)}
            /> I'd love a note or postcard 💌
          </label>
          <br />

          <br />
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

          {showPrayer() && (
            <>
              <label for="prayer">Prayer Request</label>
              <br />
              <textarea
                id="prayer"
                name="prayer"
                rows="4"
                placeholder="How can I petition on your behalf?"
              ></textarea>
              <br />
            </>
          )}

          {showAddress() && (
            <>
              <label for="address">Mailing Address</label>
              <br />
              <textarea
                id="address"
                name="address"
                rows="4"
                placeholder="Street, City, State, Zip (VERY IMPORTANT!), and Country"
              ></textarea>
              <br />
            </>
          )}

          <button type="submit">Send</button>
        </form>
      ) : (
        <form>
          <h2>Thank you! 🙏</h2>
          <p>Your submission has been received.</p>
          <button onClick={() => setIsSubmitted(false)}>Submit Another</button>
        </form>
      )}
    </>
  );
}

render(() => <App />, document.getElementById("root"));
