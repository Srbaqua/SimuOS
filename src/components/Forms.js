import React, { useDebugValue } from 'react'

const Forms = () => {
  return (
    <div className="forms">
        <form className="row gy-2 gx-3 align-items-center">
  <div className="col-auto">
    <label for="autoSizingInput">Process</label>
    <input type="text" className="form-control" id="processName" placeholder='Process Name'/>
  </div>

  <div className="col-auto">
    <label for="autoSizingInputGroup">Arrival Time</label>
    <div className="input-group">
      <div className="input-group-text"></div>
      <input type="number" className="form-control" id="autoSizingInputGroup"/>
    </div>
  </div>
  <div className="col-auto">
    <label for="autoSizingInputGroup">Burst Time</label>
    <div className="input-group">
      <div className="input-group-text"></div>
      <input type="number" className="form-control" id="autoSizingInputGroup"/>
    </div>
  </div>
  <div className="col-auto">
    <label  for="autoSizingSelect">Scheduling Method</label>
    <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
    <option selected>Choose method</option>
    <option value="1">FCFS</option>
    <option value="2">SJF</option>
    <option value="3">Round Robin</option>
  </select>
  </div>
  <div className="col-auto">
    <label  for="autoSizingSelect">Priority</label>
    <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
    <option selected>Choose Priority order</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
  </div>
  <div className="col-auto">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="autoSizingCheck"/>
      <label className="form-check-label" for="autoSizingCheck">
        Priority
      </label>
    </div>
  </div>
  <div className="col-auto">
    <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>
    </div>
  )
}

export default Forms
