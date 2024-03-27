import React, { useState } from 'react';
import jsonTokens from './tokens.json';



const FontsTokensDisplay = () => {

  // // Flatten the structure
  // const result = Object.values(jsonTokens.global).reduce((acc, tokens) => {
  //   Object.assign(acc, tokens);
  //   return acc;
  // }, {});

  // const colorTokens = result;

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTokens, setFilteredTokens] = useState(jsonTokens.global.fonts);


console.log(jsonTokens.global.fonts)
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