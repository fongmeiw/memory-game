import "./App.css";
import MemoryGame from "./components/MemoryGame";

const images = [
  {
    "src": "https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?q=80&w=794&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "flipped": false,
    "match": false
  },
  {
      "src": "https://images.unsplash.com/photo-1669707355372-b2d1e31dc083?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "flipped": false,
      "match": false
  },
  {
      "src": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "flipped": false,
      "match": false
  },
  {
      "src": "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=830&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "flipped": false,
      "match": false
  },
  {
      "src": "https://images.unsplash.com/photo-1585533530535-2f4236949d08?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "flipped": false,
      "match": false
  },
  {
      "src": "https://images.unsplash.com/photo-1615824996195-f780bba7cfab?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "flipped": false,
      "match": false
  },
  {
      "src": "https://plus.unsplash.com/premium_photo-1661890071978-6c80f92c7fdf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "flipped": false,
      "match": false
  },
  {
      "src": "https://images.unsplash.com/photo-1574870111867-089730e5a72b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "flipped": false,
      "match": false
  },
  {
      "src": "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "flipped": false,
      "match": false
  }

  
]
function App() {
  return (
    <MemoryGame
      images={images}
    />
  );
}

export default App;
