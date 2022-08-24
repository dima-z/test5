import React from 'react';
import { useState } from 'react';

export default function Form() {
  const [formFields, setFormFields] = useState([
    { code: '', value: '' },
  ]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  let submit = async (e) => {
    e.preventDefault();
    // todo: handle errors
    const response = await fetch('data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify(
          formFields.map(d => {
            let item = {};
            item[d.code] = d.value;
            return item;
          })
        ),
    });

    setFormFields([{ code: '', value: '' }]);
  };

  const addFields = () => {
    let object = {
      code: '',
      value: ''
    };

    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  return (
    <div>
      <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return (
            <div class="row justify-content-between" key={index}>
              <div class="col-sm">
                <div class="form-group">
                  <label for="code">Code:</label>
                  <input
                    id="code"
                    className="form-control"
                    name='code'
                    placeholder='type here...'
                    onChange={event => handleFormChange(event, index)}
                    value={form.code}
                  />
                </div>
              </div>
              <div class="col-sm">
                <div class="form-group">
                  <label for="value">Value:</label>
                  <input
                    id="value"
                    className="form-control"
                    name='value'
                    placeholder='type here...'
                    onChange={event => handleFormChange(event, index)}
                    value={form.value}
                  />
                </div>
              </div>
              <div class="col-sm align-self-end">
                <button type="button" className="btn btn-danger" onClick={() => removeFields(index)}>
                  Remove
                </button>
              </div>
            </div>
          )
        })}
        <div class="row justify-content-between">
          <div class="col-4">
            <button type="button" className="btn btn-primary" onClick={addFields}>Add More..</button>
          </div>
          <div class="col-4">
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
