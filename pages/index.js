import { useState } from "react";
 
function SourceTable({ numbers, onTransfer }) {
  return (
    <div className="flex">
      <table>
 
        <tbody>
          {numbers.map((number, index) => (
            <tr key={`source-${index}`}>
              <td>{number}</td>
              <td>
                <button className="Trnsfr" onClick={() => onTransfer(index)}>↶</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
function TargetTable({ numbers, onDelete }) {
  return (
    <div className="flex">
      <table>
 
        <tbody>
          {numbers.map((number, index) => (
            <tr key={`target-${index}`}>
              <td>{number}</td>
              <td>
                <button onClick={() => onDelete(index)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default function App() {
  const [sourceNumbers, setSourceNumbers] = useState([]);
  const [targetNumbers, setTargetNumbers] = useState([]);
 
  function handleAddNumber(newNumber) {
    // Add the new number to the sourceNumbers array
    const newSourceNumbers = [...sourceNumbers, newNumber];
    setSourceNumbers(newSourceNumbers);
  }
 
  function handleTransfer(index) {
    // Remove the number from sourceNumbers
    const newSourceNumbers = [...sourceNumbers];
    newSourceNumbers.splice(index, 1);
    setSourceNumbers(newSourceNumbers);
 
    // Add the number to targetNumbers
    const newTargetNumbers = [...targetNumbers, sourceNumbers[index]];
    setTargetNumbers(newTargetNumbers);
  }
 
  function handleDelete(index) {
    // Remove the number from targetNumbers
    const newTargetNumbers = [...targetNumbers];
    newTargetNumbers.splice(index, 1);
    setTargetNumbers(newTargetNumbers);
  }
 
  return (
    <div>
      <h2></h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const numberInput = event.target.elements.number;
          const newNumber = parseInt(numberInput.value, 10);
          numberInput.value = "";
          handleAddNumber(newNumber);
        }}
      >
        <label>
          <input type="number" name="number" />
        </label>
        <button className="btn"type="submit">Add</button>
      </form>
      <h2 className="nowServe">Now Serving...</h2>
      <SourceTable numbers={sourceNumbers} onTransfer={handleTransfer} />
      <h2 className="nowPrep">Now Preparing...</h2>
      <TargetTable numbers={targetNumbers} onDelete={handleDelete} />
    </div>
  );
}