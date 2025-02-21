import Avatar from "./Avatar";
import Skills from "./Skills";

function App() {
  const profileCard = {
    name: "Bremavathi",
    picture: "brema.jpeg",
    intro:
      "A skilled and motivated full stack developer with over 9 yrs of professional experience. I bring a wealth of expertise in team leadership and project management.  Committed to delivering high-quality results and working collaboratively in a friendly and dynamic environment.",
    skills: [
      { id: 1, skill: "HTMLS + CSS", level: 3, color: "blue" },
      { id: 2, skill: "Javascript", level: 3, color: "orange" },
      { id: 3, skill: "Typescript", level: 1, color: "yellow" },
      { id: 4, skill: "React", level: 3, color: "green" },
      { id: 5, skill: "PHP", level: 3, color: "red" },
      { id: 6, skill: "SQL", level: 3, color: "tan" },
      { id: 7, skill: "Next.js", level: 1, color: "purple" },
    ],
  };

  return (
    <div className="card">
      <Avatar
        picture={profileCard.picture}
        alt={`${profileCard.name} picture`}
      />
      <div className="data">
        <h1>{profileCard.name}</h1>
        <p>{profileCard.intro}</p>
        <Skills skills={profileCard.skills} />
      </div>
    </div>
  );
}

export default App;
