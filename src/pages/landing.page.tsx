import { useOutletContext } from "react-router-dom";

interface LayoutContext {
  setActiveMenu: (menu: "login" | "signup" | null) => void;
}

const LandingPage = () => {
  const { setActiveMenu } = useOutletContext<LayoutContext>();

  return (
    <div className="landing-page">
      <h1>Welcome to Study Spot</h1>
      <p>
        The easiest way to find and book study rooms on campus. Create an
        account today to view available rooms, and study in peace.
      </p>
      <button onClick={() => setActiveMenu("signup")}>Get Started</button>
    </div>
  );
};

export default LandingPage;
