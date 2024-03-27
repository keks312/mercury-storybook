import React, { useState } from 'react';
import jsonTokens from './tokens.json';



const SpacingTokensDisplay = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTokens, setFilteredTokens] = useState(jsonTokens.global.spacings);


console.log(jsonTokens.global.spacings)
 

  // const data = JSON.parse(jsonTokens);
  const rows = Object.entries(jsonTokens.global.spacings).map(([fontName, fontData]) => (
    <tr key={fontName}>
      <td>{fontName}</td>
      <td>{fontData.value}</td>
      <td><div className={"spacing_preview"} style={{width: fontData.value+'px', height: fontData.value+'px'}}></div></td>
    </tr>
  ));

  return (
    <div>
      <h2>Spacing Tokens</h2>
      <table>
        <thead>
          <tr>
            <th>Spacing Name</th>
            <th>Value (in pt)</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};


export default SpacingTokensDisplay;