import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    overflow: -moz-scrollbars-vertical;
    overflow-y: scroll;
  }
  
  html,
  body {
    height: 100%;
    width: 100%;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
  
  audio, canvas, iframe, img, svg, video {
    vertical-align: initial;
  }
  
  .ant-table-body {
    overflow-x: auto;
  }
`;

export default GlobalStyle;
