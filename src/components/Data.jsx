import '../styles/data.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

function Data() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch data, save to posts state as json
  useEffect(() => {
    fetch('/api/posts')
    .then(response => response.json())
    .then(data => setPosts(data.posts));
  }, []);
  
  // Filter out repeating categories from posts state
  const uniqueCategories = posts.reduce((uniqueCategories, post) => {
    post.categories.forEach(eachCategory => { 
      if (!uniqueCategories.includes(eachCategory.name)) {
        uniqueCategories.push(eachCategory.name);
      }
    });
    return uniqueCategories;
  }, []);
  
  // Updated selectedCategory state when dropdown menu event is fired 
  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value || null);
  };
  
  // Filters out posts that matches the selectedCategory
  const filteredPosts = selectedCategory
    ? posts.filter(post => post.categories.some(category => category.name === selectedCategory))
    : posts;

  // Formatter for categories field. Returns an unordered list 
  const categoriesFormatter = (categories) => {
    const categoryNames = categories.map(category => category.name);
    return <ul>{categoryNames.map(name => <li key={name}>{name}</li>)}</ul>;
  };
  
  
  // Formatter for date field. Returns a prettified date string
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

  // Formatter for author field. Returns their profile picture and name
  const authorFormatter = (author) => (
    <div>
      <img src={author.avatar} alt={author.name} style={{ width: '20px', height: '20px', marginRight: '5px' }} />
      {author.name}
    </div>
  );
  
  // Pagination intervals - 5, 10, 25, 50 per page 
  const paginationOptions = {
    sizePerPageList: [
      { text: '5', value: 5 },
      { text: '10', value: 10 },
      { text: '25', value: 25 },
      { text: '50', value: 50 }
    ]
  };

  // Specify columns for the table 
  const columns = [{
    dataField: 'author',
    text: 'Author',
    formatter: authorFormatter,
    sort: true
  }, {
    dataField: 'publishDate',
    text: 'Publish Date',
    formatter: dateFormatter,
    sort: true
  }, {
    dataField: 'title',
    text: 'Title',
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
    <div id="main">
      <h2 id>List Of Posts</h2>
      <Form.Select aria-label="Default select example" onChange={handleCategorySelect}>
        <option selected disabled>Categories Filter</option>
        <option value="">All Categories</option>
        {uniqueCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>))
        }
      </Form.Select>

      <div id="table">
        <BootstrapTable 
          keyField="id" 
          data={filteredPosts} 
          columns={columns} 
          pagination={paginationFactory(paginationOptions)}
          striped 
          hover 
          condensed 
          responsive
        />
      </div>
    </div>
  );
}

export default Data;
