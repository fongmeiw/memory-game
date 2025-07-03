import { useEffect, useState } from "react";
import { shuffle } from 'lodash';
import './MemoryGame.css'; 

type ImageCard = {
  src: string;
  id: number;
  flipped: boolean;
}
type MemoryGameProps = {
  images: ImageCard[];
}

const MemoryGame = ({ images }: MemoryGameProps) => {
  const [placeImages, setPlaceImages] = useState<ImageCard[]>([]);

  // Initialize the game by duplicating and shuffling the images
  // This will create a set of pairs for the memory game
  // The useEffect hook runs once when the component mounts
  // and sets the initial state of the game
  // The images are duplicated and shuffled to create a random order
  // The shuffled images are then set to the placeImages state

  useEffect(() => {
    const duplicateImages = [...images, ...images].map((image, index) => ({
      ...image,
      id: Math.random(), // Assign a unique ID based on the index
    }));
    const shuffledImages = shuffle(duplicateImages);
    setPlaceImages(shuffledImages);
  }, []);

  const handleClick = (id: number) => {
    console.log(id);
    const flipped = placeImages.find((image) => image.id === id);
    if (!flipped || flipped.flipped) return; // Ignore if already flipped

    // Update the flipped state of the clicked image
    const updatedImages = placeImages.map((image) =>
      image.id === id ? { ...image, flipped: true } : image
    );

    const matchedImages = updatedImages.filter((image) => image.flipped);
    if (matchedImages.length === 2) {
      // Check if the two flipped images match
      const [first, second] = matchedImages;
      if (first.src === second.src) {
        // If they match, keep them flipped and mark as matched
        matchedImages.forEach((image) => {
          image.flipped = true; // Keep them flipped
        });
      } else {
        // If they don't match, flip them back after a short delay
        setTimeout(() => {
          setPlaceImages((prevImages) =>
            prevImages.map((image) =>
              image.id === first.id || image.id === second.id
                ? { ...image, flipped: false }
                : image
            )
          );
        }, 1000);
      }
    }
    setPlaceImages(updatedImages);
  }
  return (
    <div>
      <h1>Memory Game</h1>
      <p>Build your memory game! </p>
      <p>Here are the sample images:</p>
      <div className="gallery">
      {placeImages.map((image) => (
        image.flipped ? <img
          key={image.id}
          src={image.src}
        /> : <img src="https://plus.unsplash.com/premium_photo-1680608155016-3faa9cbdc236?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXx2cFhoTGdHbm9qMHx8ZW58MHx8fHx8" key={image.id} onClick={() => handleClick(image.id)}/>
      ))}
      </div>
    </div>
  );
};

export default MemoryGame;
