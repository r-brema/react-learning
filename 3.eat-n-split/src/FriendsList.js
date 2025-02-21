import Friend from "./Friend";

function FriendsList({
  friends,
  selectedFriend,
  handleSelectFriend,
  handleClose,
}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          selectedFriend={selectedFriend}
          handleSelectFriend={handleSelectFriend}
          handleClose={handleClose}
        />
      ))}
    </ul>
  );
}

export default FriendsList;
