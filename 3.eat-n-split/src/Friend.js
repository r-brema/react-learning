function Friend({ friend, selectedFriend, handleSelectFriend, handleClose }) {
  const isSelected = selectedFriend?.id === friend.id;
  let moneySummary;
  if (friend.balance > 0)
    moneySummary = (
      <p className="green">
        {friend.name} owes you {friend.balance}$
      </p>
    );
  else if (friend.balance < 0)
    moneySummary = (
      <p className="red">
        You owe {friend.name} {Math.abs(friend.balance)}$
      </p>
    );
  else moneySummary = <p>You and {friend.name} are even</p>;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={`${friend.name}'s photo `} />
      <h3>{friend.name}</h3>
      {moneySummary}
      {selectedFriend?.id !== friend.id && (
        <button
          className="button"
          type="button"
          name="select"
          onClick={() => handleSelectFriend(friend.id)}
        >
          Select
        </button>
      )}
      {selectedFriend?.id === friend.id && (
        <button
          className="button"
          type="button"
          name="close"
          onClick={handleClose}
        >
          Close
        </button>
      )}
    </li>
  );
}

export default Friend;
