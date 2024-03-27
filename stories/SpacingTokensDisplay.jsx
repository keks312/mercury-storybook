import React, { useState } from 'react';
import jsonTokens from './tokens.json';



const SpacingTokensDisplay = () => {

  // // Flatten the structure
  // const result = Object.values(jsonTokens.global).reduce((acc, tokens) => {
  //   Object.assign(acc, tokens);
  //   return acc;
  // }, {});

  // const colorTokens = result;

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTokens, setFilteredTokens] = useState(jsonTokens.global.spacings);


console.log(jsonTokens.global.spacings)
  // const handleMouseEnter = (e) => {
  //   setIsHovered(true);
  //   setTooltipPosition({ x: e.pageX, y: e.pageY });
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  //   setTooltipText('Copy to clipboard!')
  // };

  // const renderTooltip = (text) => {
  //   return (
  //     <div className="tooltip" style={{ position: 'absolute', top: tooltipPosition.y-20, left: tooltipPosition.x, transform: 'translate(-50%, -100%)' }}>{text}
  //     </div>
  //   );
  // };


  // const handleSearch = (e) => {
  //     const { value } = e.target;
  //     setSearchQuery(value);

  //     // Filter tokens based on the search query
  //     const filtered = Object.keys(colorTokens['color']).reduce((acc, tokenName ) => {
  //       if (tokenName.toLowerCase().includes(value.toLowerCase())) {
  //         acc[tokenName] = colorTokens['color'][tokenName];
  //       }
  //       return acc;
  //     }, {});

  //     setFilteredTokens(filtered);
  // };

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