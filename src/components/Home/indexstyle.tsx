import styled from "styled-components";

export const WrapperHome = styled.div`


  --field-drab: #68532bff;
  --earth-yellow: #ebbc74ff;
  --butterscotch: #dd912fff;
  --van-dyke: #3a2f2dff;
  --seal-brown: #592f1aff;
  --licorice: #1f1307ff;
  --rust: #b74323ff;
  --white: #f5f5f5;
  --black: black;
  
  display: grid;
  grid-template-rows: 5vh 84vh 5vh;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    'header header header header header header'
    'aside main main main main main'
    'footer footer footer footer footer footer';
  gap: 5px;
  background-color: #f5f5f5;
  padding: 10px;
  width: 100vw;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; !important;
  font-size: 1em;
  
  .footer, .header {
    background-color: #1f1307ff;
    grid-area: footer;
    padding-left: 10px;
    text-align: left;
    padding: 0px;
    color: #ebbc74ff;
    height: 100%;
  }
  .header span,.footer span{
    margin-left: 10px;
  }

  .footer div {
    padding-left: 5px;
  }

  .header {
    grid-area: header;
  }

  .main {
    grid-area: main;
    padding: 0px;
    height: 84vh ;
    overflow: hidden;
  }

  .aside {
    grid-area: aside;
  }

  // header
  .headCurs {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    height: 11%;
    width: 100%;
    background-color: #ebbc74ff;
    padding-bottom: 10px;
    font-size: .7em;
  }
  
  div.card{
    height: 70vh;
  }
  
  .camp{
    //height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 5px;
  }
  
  .camp label{
    width: auto;
    margin: auto;
    color: #1f1307ff;
    font-size: .9em;
    
  }
  .divnrcurs input[type="text"]{
    height: 1.7em;
    border-radius: 4px;
    width: 100px;
    font-size: .9em;
    border: none;
    
  }
  

  .srch {
    color: #ebbc74ff;
    width: 1.8em;
    height: 1.8em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: #1f1307ff;
    text-align: center;
    font-size: .9em;
    margin-left: 5px;
  }

  .search.denCurs,.tipCurs,.tipFurniz{  
      height: 1.7em;
      border-radius: 4px;
      width: 300px;
      background-color: ;
      font-size: .9em;
      border: none;
    
}
  .search.tipCurs,.tipFurniz{
    width: auto;
    text-align: center;
  }
  
  .divTipLoca div.p-dropdown-trigger,.p-icon{
    height: 1.7em !important;
    border: none;

  }
  
  .divDst input[type="date"]{
    height: 1.7em;
    border-radius: 4px;
    width: 100px;
    font-family: inherit;
    font-size: .9em;
    border: none;
  }


  .divDsf input[type="date"]{
    height: 1.7em;
    font-family: inherit;

    border-radius: 4px;
    width: 100px;
    font-size: .9em;
    border: none;
  }

  .divDex input[type="date"]{
    height: 1.7em;
    border-radius: 4px;
    width: 100px;
    font-size: .9em;
    border: none;
  }
  .divfld.p-inputwrapper{
    height: 1.3em !important;
    border-radius: 4px;
    width: 200px;
    font-size: .9em;
    border: none;
  }

  .divdetcurs{
    background-color:#68532bff;
    height: 300px;
  }

  .expcurs{
    height: 3em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    width: 2em;

  }
  
  .expcrs{
    height: 3em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
    width: 2em;
  }
  
    .showdet{
      margin-left: auto;
      margin-right: 0px;
    }
  
  .text-center{
    background-color: #1f1307ff ;
    line-height: .8em;
    padding: 0px;
    margin: 0px;
  }
  .main.card{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100% !important;
  }

  .text-center{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 66vh;
  }

  
  div.p-3.text-center{
    width: 100%;
  }
  div.camp.divDet{
    width: 100%;
    margin: 0px;
    padding: 0px;
  }

  .react-date-picker{
    border-radius: 4px;
    border: none;    
  }

  .react-date-picker__wrapper{
    //width: 200px;
    width:auto;
    border-radius: 4px;
    border: none;
    font-size: .9em;
    height: 1.7em;
    background-color: #f5f5f5;
    color: initial;
  }

  .react-date-picker__inputGroup{
    width: auto;

  }
  
 
  
  div.p-paginator.p-component{
    background-color: black !important;
    color: white;
  }
  //  .headCurs .nrCurs, .dataStart {
//    font-size: .7em;
//    color: #2E1C36;
//
//    margin-left: 10px;
//    height: 60%;
//    text-align: center;
//
//  }
//
//
//  
//  //
//  //label span{
//  //  padding-top: 15px;
//  //  text-align: center;
//  //  
//  //}
//  //.headCurs label {
//  //  height: 70%;
//  //  display: flex;
//  //  align-items: center;
//  //  width: 7%;
//  //}
//
//  .headCurs .nrCurs {
//    border: none;
//    border-radius: 4px;
//    height: 50%;
//    width: 120px;
//
//  }
//
//  
//
//  .divDenCurs {
//    margin-left: 5px;
//  }
//
//  .nrCurs {
//    width: 5vh;
//    border-radius: 4px;
//  }
//
//  .denCurs {
//    width: 99%;
//    margin-right: 1px;
//    
//
//  }
//
//.card{
//  color: #2E1C36;
//  
//}
//  .p-paginator,p-component{
//    color: #2E1C36;
//    
//  }
//  
//  .p-icon{
//    color: #2E1C36;
//    
//  }
//
//  span.p-paginator-current{
//
//    color: #2E1C36;
//    
//  }
//
//  #search_denCurs{
//    display: flex;
//    border-radius: 4px;
//    align-items: center;
//    justify-content: flex-start;
//    text-align: left;
//    width: 50vh !important;
//    margin-right: 2px;
//    
//  }
//  .showdet{
//    margin-left: auto;
//    margin-right: 0px;
//  }
//  
//  
//  main.card{
//    visibility: hidden;
//  }
//
//  .dataStart{
//    border-radius: 4px;
//    width: 100px;
//    font-size: .7em;
//    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
//    
//  }
//
//  label {
//    display: block;
//    margin-bottom: 5px; /* Adjust spacing as needed */
//  }
  
  
  
  
  

`