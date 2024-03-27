import React, { useState } from 'react';
import jsonTokens from './tokens.json';



const FontsTokensDisplay = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTokens, setFilteredTokens] = useState(jsonTokens.global.fonts);


console.log(jsonTokens.global.fonts)

  const rows = Object.entries(jsonTokens.global.fonts).map(([fontName, fontData]) => (
    <tr key={fontName}>
      <td>{fontName}</td>
      <td>{fontData.value}</td>
      <td>{fontData.type}</td>
    </tr>
  ));

  return (
    <div>
      <h2>Fonts Tokens</h2>
      <table>
        <thead>
          <tr>
            <th>Font Name</th>
            <th>Value</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};


export default FontsTokensDisplay;