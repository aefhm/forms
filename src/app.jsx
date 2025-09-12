import { Router, Route } from "@solidjs/router";
import { render } from "solid-js/web";
import "./app.css";
import Home from "./components/Home";
import PrayerForm from "./components/PrayerForm";
import PostcardForm from "./components/PostcardForm";
import SurveyForm from "./components/SurveyForm";
import IntroForm from "./components/IntroForm";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/prayer" component={PrayerForm} />
      <Route path="/postcard" component={PostcardForm} />
      <Route path="/survey" component={SurveyForm} />
      <Route path="/intro" component={IntroForm} />
    </Router>
  );
}

render(() => <App />, document.getElementById("root"));
