import React from 'react';

class TextFormatter {
  constructor() {
    throw new Error('TextFormatter should be treated as an abstract class.');
  }

  static formatText(text: string): React.ReactElement {
    const chunks: React.ReactElement[] = text
      .split('\n')
      .map((c, i) => <p key={i}>{c}</p>);

    return <>{chunks}</>;
  }
}

export default TextFormatter;
