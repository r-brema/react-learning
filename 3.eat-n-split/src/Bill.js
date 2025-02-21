import { useState } from "react";

function Bill({ id, name, splitBill }) {
  const [bill, setBill] = useState({
    amount: "",
    userExpense: "",
    paidBy: "user",
  });
  function handleAmountChange(e) {
    setBill({ ...bill, amount: e.target.value });
  }
  function handleUserExpenseChange(e) {
    setBill({ ...bill, userExpense: e.target.value });
  }

  function handlePaidByChange(e) {
    setBill({ ...bill, paidBy: e.target.value });
  }
  function handleSplitBill(e) {
    e.preventDefault();
    splitBill({
      ...bill,
      friendId: id,
      friendExpense: bill.amount - bill.userExpense,
    });
    setBill({
      amount: "",
      userExpense: "",
      paidBy: "user",
    });
    return;
  }
  return (
    <form class="form-split-bill">
      <h2>Split a bill with {name}</h2>
      <label HTMLfor="billAmount">💰 Bill value</label>
      <input
        type="text"
        name="billAmount"
        value={bill.amount}
        onChange={handleAmountChange}
      />

      <label HTMLfor="userExpense">🧍‍♀️ Your expense</label>
      <input
        type="text"
        name="userExpense"
        value={bill.userExpense}
        onChange={handleUserExpenseChange}
      />

      <label HTMLfor="friendExpense">👫 Anthony's expense</label>

      <input
        type="text"
        name="friendExpense"
        disabled="disabled"
        value={bill.amount - bill.userExpense}
      />
      <label>🤑 Who is paying the bill</label>
      <select name="paidBy" onChange={handlePaidByChange}>
        <option
          value="user"
          selected={bill.paidBy === "user" ? "selected" : ""}
        >
          You
        </option>
        <option
          value="friend"
          selected={bill.paidBy === "friend" ? "selected" : ""}
        >
          {name}
        </option>
      </select>
      <button class="button" onClick={handleSplitBill}>
        Split bill
      </button>
    </form>
  );
}

export default Bill;
