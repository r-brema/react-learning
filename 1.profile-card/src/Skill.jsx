function Skill({ skill }) {
  const emojiIcon = [" ", "👶", "👍", "💪"];
  return (
    <div className="skill" style={{ backgroundColor: skill.color }}>
      <span>{skill.skill}</span>
      <span>{emojiIcon[skill.level]}</span>
    </div>
  );
}

export default Skill;
