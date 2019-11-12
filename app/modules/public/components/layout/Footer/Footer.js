import React from 'react';
import styled from 'styled-components';
import Container from '@/modules/public/components/layout/Container';
import { Layout } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { theme } from '@/modules/shared/helpers/utils';

const Wrapper = styled(Layout.Footer)`
  background-color: ${theme.TOP_MENU_COLOR};
  color: rgba(255, 255, 255, 0.85);
  height: 55px;
  margin-top: 70px;
  padding: 0;
`;

const Content = styled.div`
  line-height: 55px;
`;

const Links = styled.div`
  float: right;
`;

const PrimaryText = styled.div`
  display: inline-block;
  font-size: 17px;
  margin-right: 25px;
`;

const SecondaryText = styled.div`
  display: inline-block;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  color: rgba(255, 255, 255, 0.85);
  margin-left: 30px;
  font-size: 14px;

  &:hover {
    color: white !important;
  }
`;

const StyledLinkA = styled.a`
  color: rgba(255, 255, 255, 0.85);
  margin-left: 30px;
  font-size: 14px;

  &:hover {
    color: white !important;
  }
`;

const Footer = () => (
  <Wrapper>
    <Container marginTop={0}>
      <Content>
        <PrimaryText>
          <FormattedMessage id="app.public.footer.primaryText" />
        </PrimaryText>
        <SecondaryText>
          <FormattedMessage id="app.public.footer.secondaryText" />
        </SecondaryText>
        <Links>
          <StyledLink to="/faq">
            <FormattedMessage id="app.public.footer.faq" />
          </StyledLink>
          <StyledLink to="/about">
            <FormattedMessage id="app.public.footer.about" />
          </StyledLink>
          <StyledLinkA href="https://github.com/opcaic" target="_blank">
            <FormattedMessage id="app.public.footer.github" />
          </StyledLinkA>
        </Links>
      </Content>
    </Container>
  </Wrapper>
);

export default Footer;
