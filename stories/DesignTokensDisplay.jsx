import React, { useState } from 'react';
import jsonTokens from './merged-colors.json';

//const jsonTokens = colorTokens.color;

// Flatten the structure
const result = Object.values(jsonTokens.color).reduce((acc, tokens) => {
  Object.assign(acc, tokens);
  return acc;
}, {});

const colorTokens = { "color": result };

//const tokens = jsonTokens.t1

console.log('colorTokens : '+JSON.stringify(colorTokens))


const DesignTokensDisplay = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTokens, setFilteredTokens] = useState(colorTokens.color);
  const [activeTab, setActiveTab] = useState('rgba-8'); // Default active tab
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipText, setTooltipText] = useState('Copy to clipboard');

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    setTooltipPosition({ x: e.pageX, y: e.pageY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTooltipText('Copy to clipboard!')
  };

  const renderTooltip = (text) => {
    return (
      <div className="tooltip" style={{ position: 'absolute', top: tooltipPosition.y-20, left: tooltipPosition.x, transform: 'translate(-50%, -100%)' }}>{text}
      </div>
    );
  };


  const handleSearch = (e) => {
      const { value } = e.target;
      setSearchQuery(value);

      // Filter tokens based on the search query
      const filtered = Object.keys(colorTokens['color']).reduce((acc, tokenName ) => {
        if (tokenName.toLowerCase().includes(value.toLowerCase())) {
          acc[tokenName] = colorTokens['color'][tokenName];
        }
        return acc;
      }, {});

      setFilteredTokens(filtered);
  };


  const copyToClipboard = (value) => {
    // Create a temporary textarea element to copy the value to the clipboard
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = value;

    // Append the textarea to the DOM
    document.body.appendChild(tempTextArea);

    // Select the textarea and copy the value to the clipboard
    tempTextArea.select();
    document.execCommand('copy');

    // Remove the textarea from the DOM
    document.body.removeChild(tempTextArea);

    setTooltipText('Copied!')

    setTimeout(() => {
      setTooltipText('Copy to clipboard')
    }, 2000);

    // Optionally, provide visual feedback to the user
    //alert(`Copied: ${value}`);

  };

  // convert #RRGGBBAA to #AARRGGBB
  const toArgb = (value) => {
    
  const lastTwoCharacters = value.slice(-2);

  const modifiedString = `#${lastTwoCharacters}${value.slice(1, -2)}`;


    return `${modifiedString}`;
  };

  // convert #RRGGBBAA to red: x, green: x, blue: x, alpha: x 
  const toSrgba = (hex) => {
    console.log('hex1 :' +hex)
    hex = hex.slice(1)
    console.log('hex2 :' +hex)

    const hasAlpha = hex.length === 8;
    const red = parseInt(hex.substring(0, 2), 16) / 255;
    const green = parseInt(hex.substring(2, 4), 16) / 255;
    const blue = parseInt(hex.substring(4, 6), 16) / 255;
    const alpha = hasAlpha ? parseInt(hex.substring(6, 8), 16) / 255 : 1.0;


    // Normalize values to the range [0, 1]
    const srgbRed = parseFloat(red).toFixed(3);
    const srgbGreen = parseFloat(green).toFixed(3);
    const srgbBlue = parseFloat(blue).toFixed(3);
    const srgbAlpha = parseFloat(alpha).toFixed(1);

    //console.log('R: '+srgbRed+' - G:'+srgbGreen+' - B: '+srgbBlue+' - A:'+srgbAlpha);

    return 'red: '+srgbRed+', green: '+srgbGreen+', blue: '+srgbBlue+', alpha: '+srgbAlpha+''
  
  }


  const changeTab = (tab) => {
    setActiveTab(tab);
    // Depending on the structure of your colorTokens, you may need to update filteredTokens here
  };

  return (
    <div>
      <h2>Color Tokens</h2>
      <input
        type="text"
        placeholder="Search tokens..."
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '10px' }}
      />

      <div className="tabsContainer">
        <button onClick={() => changeTab('rgba-8')} className={activeTab === 'rgba-8' ? 'tab active' : 'tab'}>
          iOS (RGBA)
        </button>
        <button onClick={() => changeTab('argb-8')} className={activeTab === 'argb-8' ? 'tab active' : 'tab'}>
          Android (ARGB)
        </button>
        <button onClick={() => changeTab('srgba')} className={activeTab === 'srgba' ? 'tab active' : 'tab'}>
          iOS (sRGBA)
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Token Name</th>
            <th>Light Value</th>
            <th>Dark Value</th>
          </tr>
        </thead>
        {isHovered && renderTooltip(tooltipText)}
        <tbody>
          {Object.entries(filteredTokens).map(([tokenName, tokenData]) => (
            <tr key={tokenName}>
                  <td>
                <div className="textColor">
                  {tokenName} 
                  <span
                    className="copy_icon"
                    onClick={() => copyToClipboard(tokenName)} 
                    onMouseEnter={(e) => handleMouseEnter(e)} 
                    onMouseLeave={() => handleMouseLeave()}
                  >
                    <svg viewBox="0 0 20 20" className="Icon_Icon__Dm3QW" style={{width:'14px',height: '14px'}}><path fill-rule="evenodd" d="M6.515 4.75a2 2 0 0 1 1.985-1.75h3a2 2 0 0 1 1.985 1.75h.265a2.25 2.25 0 0 1 2.25 2.25v7.75a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-7.75a2.25 2.25 0 0 1 2.25-2.25h.265Zm1.985-.25h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm-1.987 1.73.002.02h-.265a.75.75 0 0 0-.75.75v7.75c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-7.75a.75.75 0 0 0-.75-.75h-.265a2 2 0 0 1-1.985 1.75h-3a2 2 0 0 1-1.987-1.77Z"></path></svg>
                  </span>
                </div>
              </td>

              {activeTab === 'rgba-8' && (
                <>
                  <td>
                    <div className="previewContainer">
                      <div className="preview light" style={{ backgroundColor: tokenData.value }}><div className="grid"></div></div>
                      <div className="textColor light" onClick={() => copyToClipboard(tokenData.value)}>
                        {tokenData.value}
                        <span
                          className="copy_icon"
                          onClick={() => copyToClipboard(tokenData.value)} 
                          onMouseEnter={(e) => handleMouseEnter(e)} 
                          onMouseLeave={() => handleMouseLeave()}
                        >
                          <svg viewBox="0 0 20 20" className="Icon_Icon__Dm3QW" style={{width:'14px',height: '14px'}}><path fill-rule="evenodd" d="M6.515 4.75a2 2 0 0 1 1.985-1.75h3a2 2 0 0 1 1.985 1.75h.265a2.25 2.25 0 0 1 2.25 2.25v7.75a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-7.75a2.25 2.25 0 0 1 2.25-2.25h.265Zm1.985-.25h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm-1.987 1.73.002.02h-.265a.75.75 0 0 0-.75.75v7.75c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-7.75a.75.75 0 0 0-.75-.75h-.265a2 2 0 0 1-1.985 1.75h-3a2 2 0 0 1-1.987-1.77Z"></path></svg>
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  <td>
                    <div className="previewContainer">
                      <div className="preview dark" style={{ backgroundColor: tokenData.darkValue }}><div className="grid"></div></div>
                      <div className="textColor dark" onClick={() => copyToClipboard(tokenData.darkValue)}> 
                      {tokenData.darkValue}
                        <span
                          className="copy_icon"
                          onClick={() => copyToClipboard(tokenData.darkValue)} 
                          onMouseEnter={(e) => handleMouseEnter(e)} 
                          onMouseLeave={() => handleMouseLeave()}
                        >
                          <svg viewBox="0 0 20 20" className="Icon_Icon__Dm3QW" style={{width:'14px',height: '14px'}}><path fill-rule="evenodd" d="M6.515 4.75a2 2 0 0 1 1.985-1.75h3a2 2 0 0 1 1.985 1.75h.265a2.25 2.25 0 0 1 2.25 2.25v7.75a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-7.75a2.25 2.25 0 0 1 2.25-2.25h.265Zm1.985-.25h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm-1.987 1.73.002.02h-.265a.75.75 0 0 0-.75.75v7.75c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-7.75a.75.75 0 0 0-.75-.75h-.265a2 2 0 0 1-1.985 1.75h-3a2 2 0 0 1-1.987-1.77Z"></path></svg>
                        </span>
                      </div>
                    </div>
                    </td>
                </>
              )}

              {activeTab === 'argb-8' && (
                <>
                  <td>
                    <div className="previewContainer">
                      <div className="preview light" style={{ backgroundColor: tokenData.value }}><div className="grid"></div></div>
                      <div className="textColor light" onClick={() => copyToClipboard(toArgb(tokenData.value))}>
                        {toArgb(tokenData.value)}
                        <span
                          className="copy_icon"
                          onClick={() => copyToClipboard(toArgb(tokenData.value))} 
                          onMouseEnter={(e) => handleMouseEnter(e)} 
                          onMouseLeave={() => handleMouseLeave()}
                        >
                          <svg viewBox="0 0 20 20" className="Icon_Icon__Dm3QW" style={{width:'14px',height: '14px'}}><path fill-rule="evenodd" d="M6.515 4.75a2 2 0 0 1 1.985-1.75h3a2 2 0 0 1 1.985 1.75h.265a2.25 2.25 0 0 1 2.25 2.25v7.75a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-7.75a2.25 2.25 0 0 1 2.25-2.25h.265Zm1.985-.25h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm-1.987 1.73.002.02h-.265a.75.75 0 0 0-.75.75v7.75c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-7.75a.75.75 0 0 0-.75-.75h-.265a2 2 0 0 1-1.985 1.75h-3a2 2 0 0 1-1.987-1.77Z"></path></svg>
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  <td>
                    <div className="previewContainer">
                      <div className="preview dark" style={{ backgroundColor: tokenData.darkValue }}><div className="grid"></div></div>
                      <div className="textColor dark" onClick={() => copyToClipboard(toArgb(tokenData.darkValue))}> 
                      {toArgb(tokenData.darkValue)}
                        <span
                          className="copy_icon"
                          onClick={() => copyToClipboard(toArgb(tokenData.darkValue))} 
                          onMouseEnter={(e) => handleMouseEnter(e)} 
                          onMouseLeave={() => handleMouseLeave()}
                        >
                          <svg viewBox="0 0 20 20" className="Icon_Icon__Dm3QW" style={{width:'14px',height: '14px'}}><path fill-rule="evenodd" d="M6.515 4.75a2 2 0 0 1 1.985-1.75h3a2 2 0 0 1 1.985 1.75h.265a2.25 2.25 0 0 1 2.25 2.25v7.75a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-7.75a2.25 2.25 0 0 1 2.25-2.25h.265Zm1.985-.25h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm-1.987 1.73.002.02h-.265a.75.75 0 0 0-.75.75v7.75c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-7.75a.75.75 0 0 0-.75-.75h-.265a2 2 0 0 1-1.985 1.75h-3a2 2 0 0 1-1.987-1.77Z"></path></svg>
                        </span>
                      </div>
                    </div>
                    </td>
                </>
              )}

              {activeTab === 'srgba' && (
                <>
                  <td>
                    <div className="previewContainer">
                      <div className="preview light" style={{ backgroundColor: tokenData.value }}></div>
                      <div className="textColor light" onClick={() => copyToClipboard(toSrgba(tokenData.value))}>
                        {toSrgba(tokenData.value)} 
                        <span
                          className="copy_icon"
                          onClick={() => copyToClipboard(toSrgba(tokenData.value))} 
                          onMouseEnter={(e) => handleMouseEnter(e)} 
                          onMouseLeave={() => handleMouseLeave()}
                        >
                          <svg viewBox="0 0 20 20" className="Icon_Icon__Dm3QW" style={{width:'14px',height: '14px'}}><path fill-rule="evenodd" d="M6.515 4.75a2 2 0 0 1 1.985-1.75h3a2 2 0 0 1 1.985 1.75h.265a2.25 2.25 0 0 1 2.25 2.25v7.75a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-7.75a2.25 2.25 0 0 1 2.25-2.25h.265Zm1.985-.25h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm-1.987 1.73.002.02h-.265a.75.75 0 0 0-.75.75v7.75c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-7.75a.75.75 0 0 0-.75-.75h-.265a2 2 0 0 1-1.985 1.75h-3a2 2 0 0 1-1.987-1.77Z"></path></svg>
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  <td>
                    <div className="previewContainer">
                      <div className="preview dark" style={{ backgroundColor: tokenData.darkValue }}></div>
                      <div className="textColor dark" onClick={() => copyToClipboard(toSrgba(tokenData.darkValue))}> 
                      {toSrgba(tokenData.darkValue)}
                        <span
                          className="copy_icon"
                          onClick={() => copyToClipboard(toSrgba(tokenData.darkValue))} 
                          onMouseEnter={(e) => handleMouseEnter(e)} 
                          onMouseLeave={() => handleMouseLeave()}
                        >
                          <svg viewBox="0 0 20 20" className="Icon_Icon__Dm3QW" style={{width:'14px',height: '14px'}}><path fill-rule="evenodd" d="M6.515 4.75a2 2 0 0 1 1.985-1.75h3a2 2 0 0 1 1.985 1.75h.265a2.25 2.25 0 0 1 2.25 2.25v7.75a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-7.75a2.25 2.25 0 0 1 2.25-2.25h.265Zm1.985-.25h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm-1.987 1.73.002.02h-.265a.75.75 0 0 0-.75.75v7.75c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-7.75a.75.75 0 0 0-.75-.75h-.265a2 2 0 0 1-1.985 1.75h-3a2 2 0 0 1-1.987-1.77Z"></path></svg>
                        </span>
                      </div>
                    </div>
                    </td>
                </>
              )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default DesignTokensDisplay;