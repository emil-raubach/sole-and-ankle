import React from 'react';
import styled from 'styled-components';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  // let variantColor;
  // if (variant === 'on-sale') {
  //   variantColor = COLORS.primary;
  // } else if (variant === 'new-release') {
  //   variantColor = COLORS.secondary;
  // }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {/* {(variant === 'on-sale' || variant === 'new-relase') && (
            <Flag>{variant === 'on-sale' ? 'Sale' : 'Just Released'}</Flag>)} */}
            {variant === 'on-sale' && <SaleFlag>Sale</SaleFlag>}
            {variant === 'new-release' && <NewFlag>Just Released</NewFlag>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{
            '--color': variant === 'on-sale' ? COLORS.gray[700] : undefined,
            '--text-decoration': variant === 'on-sale' ? 'line-through' : undefined,
          }}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? 
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
            : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
  `;
  
  const ImageWrapper = styled.div`
  position: relative;
  width: 344px;
  `;
  
  const Image = styled.img`
  display: block;
  max-width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.div`
  position: absolute;
  z-index: 1;
  top: 12px;
  right: -4px;
  height: 32px;
  background-color: red;
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.bold};
  line-height: 32px;
  font-size: 0.875rem;
  padding: 0px 10px;
  border-radius: 2px;
`;

const SaleFlag = styled(Flag)`
  background-color: ${COLORS.primary};
`;

const NewFlag = styled(Flag)`
  background-color: ${COLORS.secondary};
`;



export default ShoeCard;
