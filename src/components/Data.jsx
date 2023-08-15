import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

function Data() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch data from the mock API
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data.posts));
  }, []);
  
  // Identify Unique Categories into an array
  const uniqueCategories = posts.reduce((uniqueCategories, post) => {
    post.categories.forEach(eachCategory => { 
      if (!uniqueCategories.includes(eachCategory.name)) {
        uniqueCategories.push(eachCategory.name);
      }
    });
    return uniqueCategories;
  }, []);


  // uniqueCategories.map((each) => console.log(each))

  const categoriesFormatter = (categories) => {
    const categoryNames = categories.map(category => category.name);
    return <ul>{categoryNames.map(name => <li key={name}>{name}</li>)}</ul>;
  };

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value || null);
  };

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.categories.some(category => category.name === selectedCategory))
    : posts;

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

  const paginationOptions = {
    sizePerPageList: [
      { text: '5', value: 5 },
      { text: '10', value: 10 },
      { text: '25', value: 25 },
      { text: '50', value: 50 }
    ]
  };

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

      <Form.Select aria-label="Default select example" onChange={handleCategorySelect}>
        <option selected>Categories Filter</option>
        {uniqueCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>))
        }
      </Form.Select>

      <div style={{ fontSize: '10px'}}>
        <BootstrapTable 
          keyField="id" 
          data={filteredPosts} 
          columns={columns} 
          pagination={paginationFactory(paginationOptions)}
          striped 
          hover 
          condensed 
        />
      </div>
    </div>
  );
}

export default Data;
