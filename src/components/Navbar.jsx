import { A } from "@solidjs/router";

export default function Navbar({ showBackLink = false }) {
  return (
    <nav class="navbar">
      {showBackLink ? (
        <A href="/" class="back-link">← Back to Forms</A>
      ) : (
        <div class="navbar-spacer"></div>
      )}
    </nav>
  );
}