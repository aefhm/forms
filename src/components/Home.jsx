import { A } from "@solidjs/router";

export default function Home() {
  return (
    <form>
      <h2>Forms</h2>
      <p style="text-align: center; margin-bottom: 2rem;">Choose a form to fill out:</p>
      
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
          🙏 Prayer Request Form
        </div>
        <p style="margin: 0; font-size: 1rem; color: #666;">
          Share prayer requests and connect for encouragement
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
          🎯 Product Ideation Survey
        </div>
        <p style="margin: 0; font-size: 1rem; color: #666;">
          Help us understand your workflow challenges and pain points
        </p>
      </A>
    </form>
  );
}
