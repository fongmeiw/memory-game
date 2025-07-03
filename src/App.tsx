import "./App.css";
import MemoryGame from "./components/MemoryGame";

const images = [
  {
    "src": "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
    "flipped": false,
    "matched": false
  },
  {
      "src": "https://images.unsplash.com/photo-1546842931-886c185b4c8c",
      "flipped": false,
      "matched": false
  },
  {
      "src": "https://images.unsplash.com/photo-1520763185298-1b434c919102",
      "flipped": false,
      "matched": false
  },
  // {
  //     "src": "https://images.unsplash.com/photo-1442458017215-285b83f65851",
  //     "id": 1,
  //     "flipped": false
  // },
  // {
  //     "src": "https://images.unsplash.com/photo-1496483648148-47c686dc86a8",
  //     "id": 1,
  //     "flipped": false
  // },
  // {
  //     "src": "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
  //     "id": 1,
  //     "flipped": false
  // }
]
function App() {
  return (
    <MemoryGame
      images={images}
    />
  );
}

export default App;
