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