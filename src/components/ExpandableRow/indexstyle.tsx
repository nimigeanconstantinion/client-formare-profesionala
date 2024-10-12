import styled from "styled-components";

interface ExpandProps{
    top:number,
    left: number
}
export const WrapperExpand = styled.div<ExpandProps>`

  position: relative;
  display: block;
  
  .row{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100vw;
    padding: 10px;
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
    width: 100vw;

  }

  .detail{
    display:flex;
    flex-direction: row;
  }



`