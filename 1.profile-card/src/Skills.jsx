import Skill from "./Skill";

function Skills({ skills }) {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill key={skill.id} skill={skill} />
      ))}
    </div>
  );
}

export default Skills;
