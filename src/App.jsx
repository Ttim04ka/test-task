import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addId, deleteCards, filterCards, getData, getPhoto, setLikes } from './app-reducer';
import { useEffect, useState } from 'react';


function App() {

  
  let dispatch=useDispatch();
  let text=useSelector(state=>state.appReducer.users);
  let loop=false;
  let filter=useSelector(state=>state.appReducer.filter);





  useEffect(()=>{
    dispatch(getData())
    dispatch(getPhoto())
    
  },[loop]);

  

  let setLike=(e)=>{
    let id=e.target.name;
    dispatch(setLikes(id))
  }


  let deleteCard=(e)=>{
    dispatch(deleteCards(e.target.id))
  }

  let filterCard=()=>{
    dispatch(filterCards(true))
  }

  
  let cards= text.map((item,i)=>{
      return(
        <Card style={{ width: '18rem' }} className="card-item">
        <Card.Img variant="top"  id='img' src={text[i]?.url} className='img' />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text id='text' style={{ marginBottom: '80px' }}>
          {text[i]?.text.split('').slice(0,40).join('')}
          </Card.Text>
          <div>
            <button className={item.like ? 'active' : 'btn-item'}  onClick={setLike} name={text[i]?.id}>Like</button>
          </div>
          <div>
            <button className='btn-item2' id={text[i]?.id} onClick={deleteCard}>Delete</button>
          </div>
          
        </Card.Body>
      </Card>
      )
    })
    
    let filteredCards=text.filter(elem=>elem.like===true);
    filteredCards=filteredCards.map((item,i)=>{
    return(
      
      <Card style={{ width: '18rem' }} className="card-item">
      <Card.Img variant="top"  id='img' src={item.url} className='img' />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text id='text' style={{ marginBottom: '80px' }}>
        {item.text.split('').slice(0,40).join('')}
        </Card.Text>
        <div>
          <button className={item.like ? 'active' : 'btn-item'}  onClick={setLike} name={item.id}>Like</button>
        </div>
        <div>
          <button className='btn-item2' id={item.id} onClick={deleteCard}>Delete</button>
        </div>
        
      </Card.Body>
    </Card>
    )
  })
  console.log(filteredCards)








  return (
    <div className="App">
      <div>
      <button className='filter' onClick={filterCard}>Фильрация</button>
      </div>
      {filter?filteredCards:cards}
    </div>
  );
}

export default App;
