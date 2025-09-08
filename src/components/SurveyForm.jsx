import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import Navbar from "./Navbar";

export default function SurveyForm() {
  const [isSubmitted, setIsSubmitted] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    data.formType = "survey";
    
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
        <form name="product-survey-form" onSubmit={handleSubmit}>
          <h2>What Makes You Go "Ugh"</h2>
          <p>Help me understand the disempowering things in your work and life </p>

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

          <label for="email">Your Email</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
          />
          <br /><br />

          <label for="role">1. What's your role, and how did you spend your time last week across work, personal life, and hobbies (rough percentages and key tools)?</label>
          <br />
          <textarea
            id="role"
            name="role"
            rows="4"
            placeholder="e.g., teacher, homemaker, consultant, software engineer - 20% emails, 15% meetings, 5% hobbies"
          ></textarea>
          <br />

          <label for="time_spikes">2. Through out your last week day—when did your mental energy drop, what were you trying to do, and what got in the way?</label>
          <br />
          <textarea
            id="time_spikes"
            name="time_spikes"
            rows="4"
            placeholder="My Monday was hard because..."
          ></textarea>
          <br />

          <label for="workflow_friction">3. Which recent situations that made you go "ugh"—disruptions, recurring time sinks, difficult handoffs, or times you had to replan. What happened and what made it frustrating?</label>
          <br />
          <textarea
            id="workflow_friction"
            name="workflow_friction"
            rows="6"
            placeholder="My babysitter got sick, and I had to..."
          ></textarea>
          <br />

          <label for="annoyances_priorities">4. What daily annoyances have you learned to live with?</label>
          <br />
          <textarea
            id="annoyances_priorities"
            name="annoyances_priorities"
            rows="5"
            placeholder="I get frustrated when..."
          ></textarea>
          <br />

          <label for="dream_solution">5. Have you ever thought "Why hasn't anyone built X yet?"—what would that solution look like, and what problem would it solve for you?</label>
          <br />
          <textarea
            id="dream_solution"
            name="dream_solution"
            rows="4"
            placeholder="What is a tool or solution that you would love to have?"
          ></textarea>
          <br />

          <button type="submit">Submit Survey</button>
        </form>
      ) : (
        <div class="form-container">
          <h2>Thank you! 🎯</h2>
          <p>Your survey response has been recorded. We appreciate your insights!</p>
          <button onClick={() => setIsSubmitted(false)}>Submit Another Response</button>
        </div>
      )}
    </>
  );
}
