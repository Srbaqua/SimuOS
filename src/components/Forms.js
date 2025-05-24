import React, { useDebugValue } from 'react'

const Forms = () => {
  return (
    <div className="forms">
        <form className="row gy-2 gx-3 align-items-center">
  <div className="col-auto">
    <label className="visually-hidden" for="autoSizingInput">Name</label>
    <input type="text" className="form-control" id="processName" placeholder='Process Name'/>
  </div>
  <div className="col-auto">
    <label className="visually-hidden" for="autoSizingInputGroup">Username</label>
    <div className="input-group">
      <div className="input-group-text"></div>
      <input type="text" className="form-control" id="autoSizingInputGroup"/>
    </div>
  </div>
  <div className="col-auto">
    <label className="visually-hidden" for="autoSizingSelect">Preference</label>
    <select className="form-select" id="autoSizingSelect">
      <option selected>Choose...</option>
      <option value="1">FCFS</option>
      <option value="2">SJF</option>
      <option value="3">ROUND ROBIN</option>
    </select>
  </div>
  <div className="col-auto">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="autoSizingCheck"/>
      <label className="form-check-label" for="autoSizingCheck">
        Remember me
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
