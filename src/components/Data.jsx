import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import BootstrapTable from 'react-bootstrap-table-next';

function Data() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data from the mock API
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data.posts));
  }, []);

  const columns = [{
    dataField: 'title',
    text: 'Title'
  }, {
    dataField: 'publishDate',
    text: 'Publish Date'
  }, {
    dataField: 'author',
    text: 'Author'
  }, {
    dataField: 'summary',
    text: 'Summary'
  }, {
    dataField: 'categories',
    text: 'Categories'
  }];
  
  return (
    <div style={{ padding: '20px '}}>
      <h2>List Of Posts</h2>
      <Table>
        <thead style={{ fontSize: '12px'}}>
          <tr>
            {/* <th>#</th> */}
            <th>Title</th>
            <th>Publish Date</th>
            <th>Author</th>
            <th>Summary</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: '10px'}}>
          { 
          posts.map(each => 
            <tr>
              <td>{ each.title }</td>
              <td>{ each.publishDate }</td>
              <td>{ each.author.name }</td>
              <td>{ each.summary }</td>
              <td>
                { each.categories.map(eachcategory => <li>{eachcategory.name}</li>)}
              </td>
            </tr>
          ) 
          }
        </tbody>
      </Table>
    </div>
  );
}

export default Data;
