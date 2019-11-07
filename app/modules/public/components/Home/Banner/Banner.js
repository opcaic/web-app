import React from 'react';
import styled from 'styled-components';
import Container from '@/modules/public/components/layout/Container';
import { Button, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { theme } from '@/modules/shared/helpers/utils';

const Wrapper = styled.div`
  background-color: ${theme.BANNER_COLOR};
  min-height: 400px;
  height: calc(100vh - 60px);
  position: relative;
`;

const StyledContainer = styled(Container)`
  margin-top: 0 !important;
  text-align: center;
  position: relative;
`;

const PrimaryText = styled.div`
  color: white;
  font-size: 90px;
  margin-top: calc(50vh - 200px);
  display: inline-block;
`;

const SecondaryText = styled.div`
  color: white;
  font-size: 26px;
  margin-top: -10px;
`;

const StyledButton = styled(Button)`
  margin-top: 50px;

  &:hover {
    color: #3d518c !important;
    border-color: #d9d9d9 !important;
  }
`;

const Background = styled.div`
  color: white;
  position: absolute;
  left: 0;
  top: 0;
  min-height: calc(100vh - 60px);
  opacity: 0.1;
  width: 100%;

  & > * {
    position: absolute;
  }
`;

const Banner = () => (
  <Wrapper>
    <Background>
      <Icon
        type="trophy"
        style={{ top: '10%', left: '10%', fontSize: 40 }}
        rotate={-15}
      />

      <Icon
        type="crown"
        style={{ top: '8%', right: '13%', fontSize: 35 }}
        rotate={15}
      />

      <Icon
        type="border"
        style={{ top: '25%', right: '35%', fontSize: 35 }}
        rotate={-25}
      />

      <Icon
        type="usb"
        style={{ top: '43%', right: '15%', fontSize: 35 }}
        rotate={-25}
      />

      <Icon
        type="star"
        style={{ top: '35%', left: '35%', fontSize: 20 }}
        rotate={-5}
      />

      <Icon
        type="rocket"
        style={{ top: '50%', left: '17%', fontSize: 35 }}
        rotate={5}
      />

      <Icon
        type="star"
        style={{ right: '40%', top: '70%', fontSize: 50 }}
        rotate={15}
      />

      <Icon
        type="trophy"
        style={{ bottom: '13%', right: '8%', fontSize: 30 }}
        rotate={15}
      />

      <Icon
        type="crown"
        style={{ bottom: '8%', left: '13%', fontSize: 45 }}
        rotate={25}
      />

      <Icon
        type="border"
        style={{ bottom: '13%', left: '35%', fontSize: 30 }}
        rotate={-5}
      />
    </Background>

    <StyledContainer>
      <PrimaryText>
        <FormattedMessage id="app.public.banner.primaryTest" />
      </PrimaryText>
      <SecondaryText>
        <FormattedMessage id="app.public.banner.secondaryText" />
      </SecondaryText>
      <StyledButton type="default" size="large">
        <Link to="/tournaments">
          <FormattedMessage id="app.public.banner.button" />
        </Link>
      </StyledButton>
    </StyledContainer>
  </Wrapper>
);

export default Banner;
