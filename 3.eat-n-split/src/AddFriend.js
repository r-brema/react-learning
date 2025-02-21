import { useRef } from "react";
function AddFriend({ addNewFriend }) {
  const nameRef = useRef(null);
  const imgRef = useRef(null);
  function handleAddFriend(e) {
    console.log("ad friend");
    e.preventDefault();
    if (nameRef.current.value === "") {
      alert("name should not be left blank");
      return;
    }
    if (imgRef.current.value === "") {
      alert("Image URL should not be left blank");
      return;
    }
    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name: nameRef.current.value,
      image: `${imgRef.current.value}?u=${id}`,
      balance: 0,
    };

    addNewFriend(newFriend);
    nameRef.current.value = "";
  }

  return (
    <>
      <form className="form-add-friend">
        <label htmlFor="name">👫 Friend name</label>
        <input type="text" id="name" ref={nameRef} />
        <label htmlFor="url">🌄 Image URL</label>
        <input
          type="text"
          id="url"
          ref={imgRef}
          value="https://i.pravatar.cc/48"
        />
        <button
          className="button"
          type="button"
          name="add"
          onClick={handleAddFriend}
        >
          Add
        </button>
      </form>
    </>
  );
}

export default AddFriend;
