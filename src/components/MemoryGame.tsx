import { useEffect, useState } from "react";
import { shuffle } from 'lodash';
import './MemoryGame.css'; 

type ImageCard = {
  src: string;
  match: Boolean;
  flipped: Boolean;
  id?: string; // ID for each image card
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
      id: image.src + index, // Assign a unique ID based on the index
    }));
    const shuffledImages = shuffle(duplicateImages);
    setPlaceImages(shuffledImages);
  }, []);

  const checkMatch = (first: ImageCard, second: ImageCard) => {
    // Check if the two flipped images match
    if (first.src === second.src) {
      // If they match, keep them flipped and mark as matched
      setPlaceImages((prevImages) =>
        prevImages.map((image) =>
          image.id === first.id || image.id === second.id
            ? { ...image, match: true } // Mark as matched
            : image)
      );
    } else {
      // If they don't match, flip them back after a short delay
      console.log("Images do not match, flipping back after delay");
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
  };

  const handleClick = (id: string) => {
    const card = placeImages.find((image) => image.id === id);
    if (card?.flipped) return; // Ignore if already flipped

    // Update the flipped state of the clicked image
    const updatedImages = placeImages.map((image) =>
      image.id === id ? { ...image, flipped: true } : image
    );

    setPlaceImages(updatedImages);

    const justFlipped = updatedImages.filter(img => img.flipped && !img.match);
    if (justFlipped.length === 2) {
      // Check if the two flipped images match
      const [first, second] = justFlipped;
      

      setTimeout(() => {
        checkMatch(first, second);
      }, 500); // Delay to allow user to see the flipped images
    }
  };

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
