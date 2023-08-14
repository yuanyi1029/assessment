import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

function Data() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data from the mock API
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data.posts));
  }, []);

  const categoriesFormatter = (categories) => {
    const categoryNames = categories.map(category => category.name);
    return <ul>{categoryNames.map(name => <li key={name}>{name}</li>)}</ul>;
  };

  const dateFormatter = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };

  const authorFormatter = (author) => (
    <div>
      <img src={author.avatar} alt={author.name} style={{ width: '20px', height: '20px', marginRight: '5px' }} />
      {author.name}
    </div>
  );

  const columns = [{
    dataField: 'title',
    text: 'Title',
    sort: true
  }, {
    dataField: 'publishDate',
    text: 'Publish Date',
    formatter: dateFormatter,
    sort: true
  }, {
    dataField: 'author',
    text: 'Author',
    formatter: authorFormatter,
    sort: true
  }, {
    dataField: 'summary',
    text: 'Summary',
    sort: true
  }, {
    dataField: 'categories',
    text: 'Categories',
    formatter: categoriesFormatter,
    sort: true
  }];
  
  return (
    <div style={{ padding: '20px '}}>
      <h2>List Of Posts</h2>
      <div style={{ fontSize: '10px'}}>
        <BootstrapTable keyField="id" data={posts} columns={columns} striped hover condensed pagination={paginationFactory()}/>
      </div>
    </div>
  );
}

export default Data;
