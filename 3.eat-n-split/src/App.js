import { useState } from "react";
import AddFriend from "./AddFriend";
import Bill from "./Bill";
import FriendsList from "./FriendsList";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  const selectedFriend = friends.filter(
    (friend) => friend.id === selectedFriendId
  )[0];

  function toggleAddFriend() {
    setShowAddFriend((prev) => !prev);
  }

  function addNewFriend(newFriend) {
    setFriends((prev) => {
      return [...prev, newFriend];
    });
    setShowAddFriend(false);
  }

  function handleSelectFriend(friendId) {
    setSelectedFriendId(friendId);
  }

  function handleClose() {
    console.log("handle close");
    setSelectedFriendId(null);
  }

  function splitBill(bill) {
    let balance = selectedFriend.balance;

    if (bill.paidBy === "user") {
      balance += bill.friendExpense;
    } else {
      balance -= bill.userExpense;
    }
    const updatedFriends = friends.map((friend) => {
      if (friend.id === bill.friendId) return { ...friend, balance: balance };
      else return friend;
    });
    setFriends([...updatedFriends]);
    setSelectedFriendId(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          handleSelectFriend={handleSelectFriend}
          handleClose={handleClose}
        />

        {showAddFriend && <AddFriend addNewFriend={addNewFriend} />}
        <button class="button" onClick={toggleAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </button>
      </div>
      {selectedFriendId !== null && (
        <Bill
          id={selectedFriend.id}
          name={selectedFriend.name}
          splitBill={splitBill}
        />
      )}
    </div>
  );
}

export default App;
