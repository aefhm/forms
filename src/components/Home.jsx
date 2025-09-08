import { A } from "@solidjs/router";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
      <Navbar showBackLink={false} />
      <form class="home-form">
        <h2>Xi's Forms</h2>
      
      <A 
        href="/prayer" 
        class="form-link"
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
        class="form-link"
      >
        <div style="font-weight: 600; font-size: 1.2rem; margin-bottom: 0.5rem;">
          🎯 What Makes You Go "Ugh" Survey
        </div>
        <p style="margin: 0; font-size: 1rem; color: #666;">
          Let's talk about it
        </p>
      </A>
    </form>
    </>
  );
}
