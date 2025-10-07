import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import Navbar from "./Navbar";

export default function IntroForm() {
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const [isSelfReferral, setIsSelfReferral] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    data.formType = "intro";
    
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
        <form name="intro-form" onSubmit={handleSubmit}>
          <h2>Whom Should I Meet? 🤝</h2>
          <p>Know someone Xi should meet?</p>

          <label>
            <input
              type="checkbox"
              checked={isSelfReferral()}
              onChange={(e) => setIsSelfReferral(e.target.checked)}
              name="self_referral"
            />
            {' '}I'm introducing myself
          </label>
          <br /><br />

          <label for="person_name">{isSelfReferral() ? "Your name" : "Their name"}</label>
          <br />
          <input
            type="text"
            id="person_name"
            name="person_name"
            placeholder="First and last name"
            required
          />
          <br />

          <label for="person_contact">{isSelfReferral() ? "Your contact" : "Their contact"}</label>
          <br />
          <input
            type="text"
            id="person_contact"
            name="person_contact"
            placeholder="Email, phone, or social"
          />
          <br />

          {!isSelfReferral() && (
            <>
              <label for="name">Your name</label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="First and last name"
                required
              />
              <br />

              <label for="email">Your email</label>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
              />
              <br />
            </>
          )}

          <label for="connection_type">What kind of connection?</label>
          <br />
          <div>
            <label>
              <input type="radio" name="connection_type" value="friend" required />
              {' '}Friends
            </label>
            <br />
            <label>
              <input type="radio" name="connection_type" value="work" required />
              {' '}Work/Professional
            </label>
            <br />
            <label>
              <input type="radio" name="connection_type" value="date" required />
              {' '}Dating/Romance
            </label>
          </div>
          <br />

          <label for="description">{isSelfReferral() ? "Tell Xi about yourself" : "Tell Xi about them"}</label>
          <br />
          <textarea
            id="description"
            name="description"
            rows="8"
            placeholder={isSelfReferral() ? "What's your background? Interests? Why would you two connect well?" : "What's their background? Interests? How do you know them? Why would they connect well?"}
            required
          ></textarea>
          <br />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div class="form-container">
          <h2>Thanks! 🎉</h2>
          <p>Your referral has been submitted. Xi will review and decide if it's a good match!</p>
          <button onClick={() => setIsSubmitted(false)}>Submit Another Referral</button>
        </div>
      )}
    </>
  );
}