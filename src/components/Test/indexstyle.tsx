import styled from "styled-components";

interface ChldProp{
    top:number,
    left: number
}
export const WrapperTest = styled.div<ChldProp>`

display: block;
position: relative;  
  .row{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100vw;
    padding: 5px;
    background-color: grey;
    
  }
  
  .icon{
    margin-left: auto;
  }
  
  .extend{
    position: absolute;
    background-color: aqua;
    top: ${({ top }) => top}px;
    left: ${({ left }) => left}px;
    height: auto;
    
  }
  
  
  

`