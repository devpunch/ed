import React, { useEffect, useRef, useState } from 'react'
import Card from '../Card';

import s from './style.module.scss';

interface boardProps {
  onChange: any,
  onFinish: (data: boolean) => void,
  cardIds: Array<{ value: number, src: string}>
}

const Board: React.FC<boardProps> = ({onChange, cardIds, onFinish}) => {
  const [openCards, setOpenCards] = useState<Array<number>>([]);
  const [clearedCards, setClearedCards] = useState<Array<number>>([]);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState<boolean>(false);
  const timeout = useRef<NodeJS.Timeout>(setTimeout(()=>{}));

  console.log("####: clearedCards", clearedCards);

  useEffect(() => {
    if (cardIds.length === clearedCards.length) {
      onFinish && onFinish(true);
      onChange && onChange(true)
    }
  }, [cardIds, clearedCards])

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    // check if first card is equal second card
    if ((first % 6 + 1) === (second % 6 + 1)) {
      setClearedCards((prev) => [...prev, first, second]);
      setOpenCards([]);
      return;
    }
    // flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  }

  const handleCardClick = (id: number) => {
    if (openCards.length === 1) {
      // in this case we have alredy selected one card
      // this means that we are finishing a move
      setOpenCards((prev) => [...prev, id]);
      // setMoves((moves) => moves + 1)
      disable();
    } else {
      // in this case this is the first card we select
      clearTimeout(timeout.current);
      setOpenCards([id]);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout = setTimeout(()=>{});
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    // checkCompletion();
  }, [clearedCards]);

  const checkIsFlipped = (id: number) => {
    return clearedCards.includes(id) || openCards.includes(id);
  };

  const checkIsInactive = (id: number) => {
    return clearedCards.includes(id)
  };

  return (
    <div className={s.board}>
      {cardIds.map((i) => {
        return <Card
          key={i.value}
          image={i.src}
          id={i.value}
          isDisabled={shouldDisableAllCards}
          isInactive={checkIsInactive(i.value)}
          isFlipped={checkIsFlipped(i.value)}
          onClick={handleCardClick}
        />
      })}
    </div>
  )
}

export default Board