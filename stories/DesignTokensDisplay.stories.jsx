import React from 'react';
import DesignTokensDisplay from './DesignTokensDisplay';
import FontsTokensDisplay from './FontsTokensDisplay';
import TypescalesTokensDisplay from './TypescalesTokensDisplay';
import SpacingTokensDisplay from './SpacingTokensDisplay';

import './designTokensDisplay.css';

export default {
  title: 'Design Tokens',
  component: DesignTokensDisplay,
};


export const DisplayTokens = () => <DesignTokensDisplay />;
export const FontsTokens = () => <FontsTokensDisplay />;
export const TypescalesTokens = () => <TypescalesTokensDisplay />;
export const SpacingTokens = () => <SpacingTokensDisplay />;