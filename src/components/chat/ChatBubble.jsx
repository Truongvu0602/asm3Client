import React from 'react';

import classes from './ChatBubble.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage  } from '@fortawesome/free-solid-svg-icons';

export default function ChatBubble({onShowChat}) {
  return (
    <div className={classes.chat_bubble} onClick={() => {onShowChat()}}>
      <FontAwesomeIcon icon={faMessage}/>
    </div>
  )
}
