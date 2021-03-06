export default `
  p, li {
    letter-spacing: 0.3px;
    line-height: 24px;
  }

  h1 {
    font-size: 38px;
    line-height: 48px;
    font-weight: 600;
  }

  h2 {
    font-size: 34px;
    line-height: 44px;
    font-weight: 600;
  }

  h3 {
    font-size: 30px;
    line-height: 40px;
    font-weight: 600;
  }

  h4 {
    font-size: 26px;
    line-height: 36px;
    font-weight: 600;
  }

  h5 {
    font-size: 22px;
    line-height: 32px;
    font-weight: 600;
  }

  h6 {
    font-size: 18px;
    line-height: 30px;
    font-weight: 600;
  }

  ul { 
   list-style-type: disc; 
   list-style-position: inside; 
  }

  ol { 
     list-style-type: decimal; 
     list-style-position: inside; 
  }

  ul ul, ol ul { 
     list-style-type: circle; 
     list-style-position: inside; 
     margin-left: 15px; 
  }

  ol ol, ul ol { 
     list-style-type: lower-latin; 
     list-style-position: inside; 
     margin-left: 15px; 
  }

  table {
    td, th {
      padding: 5px 10px;
    }
  }

  @media only screen and (max-width: 576px) {
    h1 {
      font-size: 28px;
      line-height: 30px;
    }
  
    h2 {
      font-size: 26px;
      line-height: 28px;
    }
  
    h3 {
      font-size: 24px;
      line-height: 36px;
    }
  
    h4 {
      font-size: 22px;
      line-height: 24px;
    }
  
    h5 {
      font-size: 20px;
      line-height: 22px;
    }
  
    h6 {
      font-size: 18px;
      line-height: 20px;
    }

    p {
      font-size: 16px;
      line-height: 18px;
    }
  }
`;
