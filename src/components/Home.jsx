import { A } from "@solidjs/router";

export default function Home() {
  return (
    <form>
      <h2>Xi's Forms</h2>
      
      <A 
        href="/prayer" 
        style="
          display: block; 
          padding: 1rem; 
          margin-bottom: 1rem;
          border: 1px solid #e2e2e2; 
          border-radius: 8px; 
          text-decoration: none; 
          color: inherit;
          background: #fafafa;
          transition: background-color 0.2s;
        "
      >
        <div style="font-weight: 600; font-size: 1.2rem; margin-bottom: 0.5rem;">
          🙏 Prayer Request
        </div>
        <p style="margin: 0; font-size: 1rem; color: #666;">
          Share a prayer request
        </p>
      </A>
      
      <A 
        href="/survey" 
        style="
          display: block; 
          padding: 1rem; 
          border: 1px solid #e2e2e2; 
          border-radius: 8px; 
          text-decoration: none; 
          color: inherit;
          background: #fafafa;
          transition: background-color 0.2s;
        "
      >
        <div style="font-weight: 600; font-size: 1.2rem; margin-bottom: 0.5rem;">
          🎯 What Makes You Go "Ugh" Survey
        </div>
        <p style="margin: 0; font-size: 1rem; color: #666;">
          Tell us what frustrates you
        </p>
      </A>
    </form>
  );
}
