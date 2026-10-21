import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface ProgramTableProps {
  events: CampusEvent[];
}

function ProgramTable({ events }: ProgramTableProps) {
  return (
    <>
      <h2>Ayın Programı</h2>
      <div className="tablo-sarici">
        <table>
          <caption>Ayın Programı</caption>
          <thead>
            <tr>
              <th scope="col">Tarih</th>
              <th scope="col">Etkinlik</th>
              <th scope="col">Yer</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{formatDate(event.date)}</td>
                <td>{event.title}</td>
                <td>{event.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProgramTable;
