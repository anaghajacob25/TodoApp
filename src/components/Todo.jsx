import React, {  useState } from 'react'
import './Todo.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';





function Todo() {

    const [data,setData]=useState("")
    const [items,setItems]=useState([])
    const [editItems,setEditItem]=useState(null)
    const [filter, setFilter] = useState('all');
    const [message,setMessage]=useState('')
    const [isListCleared, setIsListCleared] = useState(false);


  

    const getData=(e)=>{
      console.log(e.target.value)
      setData(e.target.value)
    }


    const submit = (e) => {
      e.preventDefault();
      if (editItems !== null && editItems >= 0 && editItems < items.length) {
        const updatedItems = items.map((item, index) =>
          index === editItems ? { ...item, text: data } : item
        );
        setItems(updatedItems);
        setEditItem(null);
        setData('');
      } else {
        setItems([...items, { text: data, completed: false }]);
        setData('');
      }
    };

    const handleEdit = (index) => {
      const edit = items.find((todo, id) => id === index);
      if (edit) {
        setData(edit.text);
        setEditItem(index);
      } 
    };

   const getDelete=(index)=>{
          console.log(index);
          const deleteItems=[...items]
          deleteItems.splice(index,1)
          setItems(deleteItems)
          
   }

   const handleComplete = (index) => {
    const updatedItems = items.map((todo, id) =>
      id === index ? { ...todo, completed: !todo.completed } : todo
    );
    setItems(updatedItems);
  };

  const filteredItems = () => {
    if (filter === 'completed') {
      return items.filter((item) => item.completed);
    } else if (filter === 'pending') {
      return items.filter((item) => !item.completed);
    } else {
      return items;
    }
  };

  const handleClear = () => {
    setItems([]);
    setIsListCleared(true);
    setMessage('Your list is clear!');
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
   <>
  
    <div className='d-flex align-items-center justify-content-center flex-column'>
      
        <h2 className='mt-2 text-light' style={{fontFamily:'Times New Roman, Times, serif'}}>Todo App</h2>
         <div className='  rounded  p-5 m-5 ' style={{backgroundColor:'#004d71',width:'50%'}}>
          <h6 className='text-center mb-4 fs-4'  style={{fontFamily:'Times New Roman, Times, serif',color:'lightblue'}}>Wohoo!! Make plans for Today🎉</h6>
         <Form onSubmit={submit}>
          <Form.Control
            required
            type="text"
            value={data}
            placeholder="Enter Your Task"
            className='w-50 d-flex align-items-center justify-content-center mx-auto' style={{backgroundColor:"#5fabc0"}}
            onChange={getData}
          />
    </Form>

    <div className='d-flex align-items-center justify-content-center mx-auto mt-4 '>
    <Button variant="primary" className="me-2 w-25" onClick={() => setFilter('all')} >All</Button>{' '}
    <Button variant="success"  className=" me-2  w-25" onClick={() => setFilter('completed')} >Completed</Button>{' '}
    <Button variant="danger" className=" me-2  w-25" onClick={() => setFilter('pending')}>Pending</Button>{' '}
    </div>

     <div  >
        <ul>
        {filteredItems().map((item,index)=>(
            <li key={index} className= {`w-75 d-flex align-items-center  mx-auto border border-light rounded p-2 text-light mt-4  ${
              item.completed ? 'list-item' : ''}`}>{item.text}
               <div className='d-flex ms-auto'>
                  <button onClick={()=>handleComplete(index)} className='bg-transparent' style={{border:'2px solid transparent'}}> <input type="checkbox" className='text-dark' checked={item.completed}   /></button>
                  <button className='bg-transparent ' style={{border:'1px solid transparent'}} onClick={()=>handleEdit(index)}> <FontAwesomeIcon icon={faPenToSquare} className='text-light' /> </button>
                  <button className='bg-transparent' style={{border:'1px solid transparent'}} onClick={()=>getDelete(index)}>  <FontAwesomeIcon icon={faTrash} className='text-light'  /> </button>
  
               </div>
   
            </li>
        ))}
        </ul>

        {isListCleared && message && <p className='text-center text-light fs-4 mt-5'>{message}</p>}

     
         {filteredItems().length >3 ?
          <div className='text-center'>
            <button className='btn btn-danger' onClick={handleClear}>Clear All</button>
          </div>
          :''}
      

      
     </div>

    
  </div>
 
</div>

   </>
  )
}

export default Todo