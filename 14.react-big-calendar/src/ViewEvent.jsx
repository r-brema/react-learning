import moment from "moment";

const ViewEvent = ({ event, onClose, onDelete }) => {
  console.log("view event");
  console.log(event);
  return (
    <table className="event">
      <caption>Event Details</caption>
      <tbody>
        <tr>
          <th>Name: </th>
          <td>{event.title}</td>
        </tr>
        <tr>
          <th>Start Time: </th>
          <td>{moment(event.start).format("DD-MM-YYYY h:mm A")}</td>
        </tr>
        <tr>
          <th>End Time: </th>
          <td>{moment(event.end).format("DD-MM-YYYY h:mm A")}</td>
        </tr>
        <tr>
          <td>
            <button className="btn secondary" onClick={onClose}>
              Close
            </button>
          </td>

          <td>
            <button className="btn danger" onClick={() => onDelete(event.id)}>
              Delete Event
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ViewEvent;
