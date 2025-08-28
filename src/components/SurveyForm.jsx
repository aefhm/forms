import { createSignal } from "solid-js";
import { A } from "@solidjs/router";

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
      <A href="/">← Back to Forms</A>
      <br /><br />
      
      {!isSubmitted() ? (
        <form name="product-survey-form" onSubmit={handleSubmit}>
          <h2>Product Ideation Survey</h2>
          <p>Help us understand your daily challenges and workflow pain points.</p>

          <label for="name">Your Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="First and Last"
            required
          />
          <br /><br />

          <label for="role">1. What's your role, and how did you actually spend your time last week across work, personal life, and hobbies (rough percentages and key tools)?</label>
          <br />
          <textarea
            id="role"
            name="role"
            rows="4"
            placeholder="e.g., Software Engineer - 60% coding (VS Code, Git), 20% meetings (Zoom), 15% personal projects, 5% hobbies"
          ></textarea>
          <br />

          <label for="time_spikes">2. Walk me through last week day by day—where did time or mental energy spike more than it should have, what were you trying to do, and what got in the way?</label>
          <br />
          <textarea
            id="time_spikes"
            name="time_spikes"
            rows="4"
            placeholder="Describe specific days and situations where you felt drained or inefficient"
          ></textarea>
          <br />

          <label for="disruption">3. Tell me about the last time something slowed you down or disrupted plans—what was the first signal, what were your first three steps, how much time did it cost, and who else was affected?</label>
          <br />
          <textarea
            id="disruption"
            name="disruption"
            rows="4"
            placeholder="Describe the situation, your response, and the impact"
          ></textarea>
          <br />

          <label for="recurring_tasks">4. Which recurring tasks or responsibilities consistently take more effort than they should—name your top one to three and estimate time per week for each.</label>
          <br />
          <textarea
            id="recurring_tasks"
            name="recurring_tasks"
            rows="4"
            placeholder="e.g., Code reviews (3 hours), Weekly reports (2 hours), Email management (4 hours)"
          ></textarea>
          <br />

          <label for="replanning">5. Describe a situation where you had to replan mid-stream—what info or access was missing, where should it have lived, and what made the adjustment tricky?</label>
          <br />
          <textarea
            id="replanning"
            name="replanning"
            rows="4"
            placeholder="Tell us about a time you had to pivot or change plans unexpectedly"
          ></textarea>
          <br />

          <label for="coordination">6. When coordinating with others, describe the last handoff that took longer or felt more draining than the work itself—what specifically slowed it (approval latency, format/version mismatch, unclear ownership, tool boundaries, or time zones)?</label>
          <br />
          <textarea
            id="coordination"
            name="coordination"
            rows="4"
            placeholder="Describe a challenging handoff or coordination experience"
          ></textarea>
          <br />

          <label for="daily_annoyance">7. In daily life, what's a small but regular annoyance you've basically learned to live with, and how do you currently work around it?</label>
          <br />
          <textarea
            id="daily_annoyance"
            name="daily_annoyance"
            rows="4"
            placeholder="Something minor but persistent that bugs you regularly"
          ></textarea>
          <br />

          <label for="missing_tool">8. Have you ever thought, "Why hasn't anyone built X yet?"—what was X, what problem would it solve for you, and what have you already tried that didn't quite work?</label>
          <br />
          <textarea
            id="missing_tool"
            name="missing_tool"
            rows="4"
            placeholder="Describe a tool or solution you wish existed"
          ></textarea>
          <br />

          <label for="eliminate_drain">9. If you could eliminate one recurring drain, what would it be and why that over your number two, and next week how would you know it's solved (time saved, fewer back-and-forths, errors avoided, cycle time)?</label>
          <br />
          <textarea
            id="eliminate_drain"
            name="eliminate_drain"
            rows="4"
            placeholder="Your top priority pain point and how you'd measure success"
          ></textarea>
          <br />

          <button type="submit">Submit Survey</button>
        </form>
      ) : (
        <div>
          <h2>Thank you! 🎯</h2>
          <p>Your survey response has been recorded. We appreciate your insights!</p>
          <button onClick={() => setIsSubmitted(false)}>Submit Another Response</button>
        </div>
      )}
    </>
  );
}