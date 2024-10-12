import styled from "styled-components";


export const WrapperCusant=styled.div`

  display:flex;
  padding: 0px;
  margin: 0px;
  background-color: #282c34;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: start;
  height: 100%;
  width:100%;
  font-size: 16px;
  color: beige;
  overflow-y: auto;
  scrollbar-width: thin;
  //position: relative;
  
  .csant{
    height: 14vh;
    display: flex;
    align-items: start;
    justify-content: space-between;
    padding-top: 10px;
    width:100%;
  }
 
  
  //div.card{
  //  height: 80vh;
  //}
  
  //height: 100%;
//.p_fld.p-component {
//  background-color: #d9d2d2 !important;
//  height: 30px !important;
//  width: 300px !important;
//}
//  .divfld.p-autocomplete.p-component.p-inputwrapper.p-inputwrapper-filled{
//  height: 30px !important;
//}
  .p-autocomplete-input.p-inputtext.p-component.p-filled{
    height:30px !important;    
    color: black !important;
    background-color: #f0f0f0 !important;
    font-size: 14px !important;
    width: 220px !important;

  }

  .divfld.p-autocomplete.p-component.p-inputwrapper.p-inputwrapper-filled{
    height:30px !important;
    width: 220px !important;

  }
  
  .input:focus {
    outline: none !important;
    border:1px solid red;
    box-shadow: 0 0 10px #719ECE;
  }
.cnp,input[type="text"]{
    height: 30px;
    border-radius: 3px;
    width: 130px;
    background-color: #f0f0f0 ;
    font-size: 14px;
    border: none;

  }
  
  .prenume,input[type="text"]{
    width: 180px;
  }

  .p_fld{
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background-color: inherit;
    margin: 3px;
  }

  .p_fld.divCIS.search.autocomp{
    overlay: none;
    z-index: 0 !important;
  }
  
  .lblpers label{
    margin: 3px auto;
  }
  
  
  .divCurs1{
    background-color: #ebbc74ff;
    //width: 100%;
    //width: 88%;
    height: 75px;
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0px;
    z-index: 101;
  }
  
  
  
  .divCurs1.search{
    margin: 0px 7px;
  }
  
  #pers_nume,#pers_cnp,#pers_pren,#pers_tata,#pers_mama,#pers_judn,#pers_locn,#pers_ci,#pers_cin{
    margin-top: 5px ;    
  }
  .p_fld.cnp{
    width:200px;
  }


  .divCurs2{
    background-color: #3a2f2dff;
    height: 75px;
    display: flex;
    justify-content: space-between;


  }

  .divCurs3{
    background-color: #ebbc74ff;
    height: 140px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    


  }

  .divCurs4{
    background-color: #1f1307ff;
    height: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;



  }
  
  .flex.itm.add div.divname{
    color: red !important;
    width:100px !important;
  }


  .search.autocomp .p-autocomplete.p-component.p-inputwrapper.p-inputwrapper-filled {
    width: 100px !important;
  }

  .search.autocomp .p-autocomplete.p-component.p-inputwrapper.p-inputwrapper-filled {
    width: 100px !important;
  
  
  }

  
  .smalltext{
    width: 50px !important;
  }

  .mediumtext{
    width: 120px !important;
  }

  .mediumtext2{
    width: 280px !important;
  }
  .smalltext1{
    width: 70px !important;  
  }
  
  .search.autocomp .p-autocomplete-input.p-inputtext.p-component.p-filled{
    width: 120px !important;
    
  }
  .search.autocomp .p-autocomplete-input.p-inputtext.p-component{
    width: 120px !important;
    height: 30px !important;    
  }

  .search.autocomp .divfld.p-autocomplete.p-component.p-inputwrapper{
    width: 100px !important;
    height: 30px !important;
  }

  //.divTipLoca .p-dropdown.p-component.p-inputwrapper.p-inputwrapper-filled{
  //  height: 30px !important;
  //}
 //
 // .divTipLoca .sdrp.p-dropdown.p-component.p-inputwrapper{
 //   height: 30px !important;
 //   //background-color: #B38EC4 !important;
 //   border: none !important;
 // }
 // .divTipLoca div.p-dropdown-trigger{
 // height: 33px !important;
 //   text-align: center !important;
 //   border: none !important;
 //}
 //
 //
 // div.p-dropdown-trigger svg{
 //   height: 100% !important;
 // }

  .dvsimple input.p-dropdown-label.p-inputtext{
    //border: none !important;
    height: 30px !important;
    //height: 100% !important;
    //width: 110px !important;
    width: 70px !important; 
  }
  //
  //
  //
  .dvsimple .p-dropdown.p-component.p-inputwrapper.p-inputwrapper-filled{
    //height: 100% !important;
    width: 70px !important;  
    
    height: 30px !important;
    border: none !important;
  }
  //
  .dvsimple .sdrp.p-dropdown.p-component.p-inputwrapper{
    height: 30px !important;
    border: none !important;
    width: 190px !important;
  }
  //
  
 
  
  
  
`