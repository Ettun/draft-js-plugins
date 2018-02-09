import React from 'react';
import unionClassNames from 'union-class-names';
import emojione from 'emojione';
import { LifesizeUnicode, default as lifesizeEmojis } from '../../emojis'

const getLifesizeEmoji = (shortNameForImage) => (lifesizeEmojis[shortNameForImage.toLowerCase()]);

const Emoji = ({ theme = {}, cacheBustParam, imagePath, imageType, className, decoratedText, useNativeArt, ...props }) => {
  const shortName = emojione.toShort(decoratedText);

  let emojiDisplay = null;
  if (useNativeArt === true) {
    emojiDisplay = (
      <span
        title={emojione.toShort(decoratedText)}
      >
        {props.children}
      </span>
    );
  } else {
    // short name to image url code steal from emojione source code
    let shortNameForImage = '';
    try {
      shortNameForImage = emojione.emojioneList[shortName].unicode[emojione.emojioneList[shortName].unicode.length - 1];
    } catch(e) {
      shortNameForImage = LifesizeUnicode[this.props.emoji]
    }
    let backgroundImage = `url(${imagePath}${shortNameForImage}.${imageType}${cacheBustParam})`;
    const lifesizeEmoji = getLifesizeEmoji(shortNameForImage);
    let styleObject = { backgroundImage };

    if (lifesizeEmoji) {
      const background = `url('${lifesizeEmoji}')`;
      styleObject = { background, minWidth: 40, minHeight: 40 };
    }
    const combinedClassName = unionClassNames(theme.emoji, className);

    emojiDisplay = (
      <span
        className={combinedClassName}
        title={emojione.toShort(decoratedText)}
        style={styleObject}
      >
        {props.children}
      </span>
    );
  }

  return emojiDisplay;
};

export default Emoji;
