import React, { useState } from 'react';
import jsonTokens from './tokens.json';



const TypescalesTokensDisplay = () => {

  // // Flatten the structure
  // const result = Object.values(jsonTokens.global).reduce((acc, tokens) => {
  //   Object.assign(acc, tokens);
  //   return acc;
  // }, {});

  // const colorTokens = result;

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTokens, setFilteredTokens] = useState(jsonTokens.global.typescales);


console.log(jsonTokens.global.typescales)

  const rows = Object.entries(jsonTokens.global.typescales).map(([fontName, fontData]) => (
    <tr key={fontName}>
      <td>{fontName}</td>
      <td>{fontData.value.fontFamily}</td>
      <td>{fontData.value.fontSize}</td>
      <td>{fontData.value.fontWeight}</td>
      <td>{fontData.value.lineHeight}</td>
      <td>{fontData.value.letterSpacing}</td>

    </tr>
  ));

  return (
    <div>
      <h2>Typescales Tokens</h2>    
      <table>
        <thead>
          <tr>
            <th>Font Name</th>
            <th>Font Family</th>
            <th>Size</th>
            <th>Weight</th>
            <th>Line Height</th>
            <th>Letter Spacing</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};


export default TypescalesTokensDisplay;