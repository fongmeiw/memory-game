import { useEffect, useState, useRef } from "react";
import { matches, shuffle } from 'lodash';
import './MemoryGame.css'; 

type ImageCard = {
  src: string;
  match: boolean;
  flipped: boolean;
  id?: string; // ID for each image card
}
type MemoryGameProps = {
  images: ImageCard[];
}

const MemoryGame = ({ images }: MemoryGameProps) => {
  const [placeImages, setPlaceImages] = useState<ImageCard[]>([]);
  const [ timer, setTimer ] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);
  // const [ duration, setDuration ] = useState<number>(0)
  const [ isRunning, setRunning ] = useState<boolean>(false);
  const [ isBlocked, setBlock ] = useState<boolean>(false);

  // Initialize the game by duplicating and shuffling the images
  // This will create a set of pairs for the memory game
  // The useEffect hook runs once when the component mounts
  // and sets the initial state of the game
  // The images are duplicated and shuffled to create a random order
  // The shuffled images are then set to the placeImages state

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    };
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1)
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isRunning]);

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
      setPlaceImages((prevImages) => {
        const matchedImages = prevImages.map((image) =>
          image.id === first.id || image.id === second.id
            ? { ...image, match: true } // Mark as matched
            : image)
        if (matchedImages.filter(img => !img.match).length === 0) {
          setRunning(false);
        }
        return matchedImages;
    });
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
      }, 300);
    }
  };

  const handleClick = (id: string) => {
    if (!isBlocked) {
      if (placeImages.filter(img => img.flipped).length === 0) {
        setRunning(true)
      }
      const card = placeImages.find((image) => image.id === id);
      if (card?.flipped) return; // Ignore if already flipped

      // Update the flipped state of the clicked image
      const updatedImages = placeImages.map((image) =>
        image.id === id ? { ...image, flipped: true } : image
      );

      setPlaceImages(updatedImages);

      const justFlipped = updatedImages.filter(img => img.flipped && !img.match);
      if (justFlipped.length === 2) {
        // Check if the two flipped images match, blocking mouse click
        setBlock(true);
        const [first, second] = justFlipped;
        

        setTimeout(() => {
          checkMatch(first, second);
          setBlock(false);
        }, 600); // Delay to allow user to see the flipped images
      }
    }
  };

  const startTheGame = () => {
    setRunning(true);
  }

  const handleReset = () => {
    setPlaceImages((prevImages) => {
      const resetImages = prevImages.map(image => {
        return {...image, match: false, flipped: false} 
      });

      return shuffle(resetImages);
    });
    setTimer(0); // ← this resets the counter
    setRunning(false);
  }

  return (
    <div className={isBlocked ? "block" : ""}>
      <div style={{ textAlign: "center" }}>
        <h1>Memory Game</h1>
        <div style={{display: "flex", justifyContent: "center", gap: "8px"}}>
          <button onClick={handleReset}>Reset</button><button onClick={startTheGame}>Start</button>
        </div>
        <div style={{marginBottom: "8px"}}><label>Timer: {timer} s</label></div>
      </div>
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
