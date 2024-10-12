import styled from "styled-components";

export const WrapperSearch = styled.div`
  scrollbar-width: thin !important; /* Or 'thin', 'none' */

  p {
    color: #d9d2d2;
  }

  .p-component {
    background-color: #d9d2d2 !important;
    height: 4.5vh !important;
    width: 300px !important;
  }


  .p-autocomplete-items {
    width: 600px !important;
  }

  li.p-autocomplete-item {
    background-color: aqua !important;

  }

  div.p-autocomplete-pannel {
    background-color: #aab0b0 !important;
  }

  .flex.align-items-center {
    display: flex;
    flex-direction: row !important;
    justify-content: flex-start !important;
    align-items: center !important;
    width: auto;
  }


  .p-autocomplete-items-wrapper {
    background-color: #020902 !important;
  }


  .p-autocomplete-panel .p-autocomplete-items {
    padding: 0.5rem 0 !important;
    background-color: #06100c !important;
  }


  .flex.itm {
    display: flex !important;
    flex-direction: row !important;
    justify-content: center;
    align-items: center;
  }

  div.divcode {
    width: 30px !important;
  }

  div.divname {
    width:300px !important;
    box-sizing: border-box;
    border: none;
    background-color: ;
  }

  
  .p-disabled, .p-component:disabled {
    opacity: 0.8;
    color: #020902;
  }

  .flex.itm.divsup{
    background-color: #B38EC4 !important;
  }
  
`