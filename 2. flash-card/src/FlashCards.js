import { useState } from "react";
function FlashCards({ questions }) {
  const [selectedCard, setSelectedCard] = useState();
  function handleCardClick(id) {
    console.log("id:" + id);
    setSelectedCard(id !== selectedCard ? id : null);
  }
  return (
    <div className="flashcards">
      {questions.map((question) => (
        <div
          className={selectedCard === question.id ? "selected" : ""}
          key={question.id}
          onClick={() => handleCardClick(question.id)}
        >
          <p>
            {selectedCard === question.id ? question.answer : question.question}
          </p>
        </div>
      ))}
    </div>
  );
}

export default FlashCards;
