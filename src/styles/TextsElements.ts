import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface PrimaryTextType {
  color?: string;
  fontWeight?: 'bold' | 'normal' | number;
  fontStyle?: 'italic' | 'normal';
  fontSize?: '12px' | '16px' | '18px' | '20px' | '28px' | '32px' | '40px';
  lineHeight?: string;
  marginRight?: string;
  marginBottom?: string;
  textDecoration?: 'underline';
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase';
  whiteSpace?: 'nowrap' | 'pre' | 'normal';
  textAlign?: 'left' | 'center' | 'right';
  textOverflow?: 'ellipsis';
  overflow?: 'hidden';
  width?: string;
  maxWidth?: string;
  letterSpacing?: string;
}

export const PrimaryTextSpan = styled.span<PrimaryTextType>`
  font-style: ${(props) => props.fontStyle};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  font-size: ${(props) => props.fontSize || '16px'};
  line-height: ${(props) => props.lineHeight || '120%'};
  color: ${(props) => props.color || '#777C85'};
  margin-right: ${(props) => props.marginRight};
  margin-bottom: ${(props) => props.marginBottom};
  text-decoration: ${(props) => props.textDecoration};
  text-transform: ${(props) => props.textTransform};
  white-space: ${(props) => props.whiteSpace};
  text-align: ${(props) => props.textAlign};
  text-overflow: ${(props) => props.textOverflow};
  overflow: ${(props) => props.overflow};
  max-width: ${(props) => props.maxWidth};
  letter-spacing: ${(props) => props.letterSpacing};
`;

export const PrimaryTextParagraph = styled.p<PrimaryTextType>`
  font-style: ${(props) => props.fontStyle};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize || '16px'};
  line-height: ${(props) => props.lineHeight || '120%'};
  color: ${(props) => props.color || '#777C85'};
  margin-right: ${(props) => props.marginRight};
  margin-bottom: ${(props) => props.marginBottom || '0'};
  text-decoration: ${(props) => props.textDecoration};
  text-transform: ${(props) => props.textTransform};
  white-space: ${(props) => props.whiteSpace};
  text-align: ${(props) => props.textAlign};
  text-overflow: ${(props) => props.textOverflow};
  overflow: ${(props) => props.overflow};
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
`;

export const QuoteText = styled(PrimaryTextSpan)<
  PrimaryTextType & { isGrowth?: boolean }
>`
  font-style: ${(props) => props.fontStyle || 'normal'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  font-size: ${(props) => props.fontSize || '16px'};
  line-height: ${(props) => props.lineHeight || '120%'};
  color: ${(props) => (props.isGrowth ? '#3BFF8A' : '#FF557E')};
  margin-right: ${(props) => props.marginRight};
  margin-bottom: ${(props) => props.marginBottom};
  text-decoration: ${(props) => props.textDecoration};
  text-transform: ${(props) => props.textTransform};
  text-align: ${(props) => props.textAlign};
  text-overflow: ${(props) => props.textOverflow};
  overflow: ${(props) => props.overflow};
  max-width: ${(props) => props.maxWidth};
`;

export const TextLink = styled(Link)`
  color: #777c85;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.4s ease;

  &:hover {
    color: #000000;
    text-decoration: none;
  }
`;

interface TextAccentLinkProps {
  fontSize?: string;
}
export const TextAccentLink = styled(Link)<TextAccentLinkProps>`
  color: #374dfb;
  font-weight: 400;
  font-size: ${(props) => props.fontSize || '12px'};
  text-decoration: none;
  transition: all 0.4s ease;

  &:hover {
    text-decoration: none;
    color: #374dfb;
  }
`;

export const BorderLink = styled(Link)`
  color: #000000;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 12px;
  text-decoration: none;
  border: 2px solid #000000;
  transition: all 0.4s ease;

  &:hover {
    color: #fff;
    text-decoration: none;
    border-color: #000;
    background-color: #000;
  }
`;

export const PageTitle = styled(PrimaryTextSpan)`
  color: #000000;
  font-weight: 600;
  font-size: 40px;
  line-height: 48px;
`;