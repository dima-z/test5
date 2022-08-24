import React, { useEffect, useState, useCallback } from 'react';
import Pagination from './Pagination'

const Table = () => {
  const [state, setState] = useState({
    codeValuesList: [],
    loading: true,
    totalItems: 0,
    page: 1,
    filter: '',
    error: false
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`data?filter=${state.filter}&page=${state.page}`);
      const tableData = await response.json();
      setState({
        ...state,
        codeValuesList: tableData.data ? tableData.data : [],
        loading: false,
        totalItems: tableData.total,
      });
    } catch (e) {
      setState({
        ...state,
        loading: false, error: true
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onPageChange = useCallback(page => {
    setState({ ...state, page }, fetchData);
  }, []);

  return (
    <div>
      <h1 id="tabelLabel">Table</h1>
      {
        state.loading
          ? <p><em>Loading...</em></p>
          :
          <>
            <input
              name='filter'
              className="form-control"
              placeholder='filter'
              onChange={event => {
                setState({ ...state, filter: event.target.value });
              }}
              onKeyDown={event => {
                // enter
                if (event.keyCode === 13) {
                  fetchData();
                }
              }}
              value={state.filter}
            />
            {
              state.error
                ? (<p><em>Some error occured </em></p>)
                : (
                  <>
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Code</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.codeValuesList.map(codeValue =>
                          <tr key={codeValue.id}>
                            <td>{codeValue.id}</td>
                            <td>{codeValue.code}</td>
                            <td>{codeValue.value}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <Pagination
                      total={state.totalItems}
                      currentPage={state.page}
                      onPageChange={onPageChange}
                    />
                  </>
                )
            }
          </>
      }
    </div>);
}


export default Table;
