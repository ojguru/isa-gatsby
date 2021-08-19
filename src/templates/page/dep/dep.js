import React from "react";
import styled from "@emotion/styled";
import DEPCover from "./dep-cover";
import DEPActivities from "./dep-activities";
import DEPDevelopment from "./dep-development";
import DEPServices  from "./dep-services";
import DEPLaboratory from "./dep-laboratory";
import DEPVeterinary from "./dep-veterinary";
import DEPCede from "./dep-cede";
// import DEPPymes from "./dep-pymes";
// import DEPIdentity from "./dep-identity";
// import DEPAsesory from "./dep-asesory";
import DEPServicesMenu from "./dep-services-menu";


const DEPPage = ({ page }) => {

  // Get information about the current URL.


  // Load the post, but only if the data is ready.
    return  (
      <Container>
        <DEPCover {...{page}}/>
         <DEPActivities {...{page}}/>
        <DEPDevelopment {...{page}}/>
        <DEPServices  {...{page}}/>
        <DEPServicesMenu {...{page}}/>
        <DEPLaboratory {...{page}}/>
        {/* <DEPPymes  {...{page}}/>
        <DEPIdentity  {...{page}}/>
        <DEPAsesory  {...{page}}/> */}
        <DEPVeterinary  {...{page}}/>
        
        <DEPCede  {...{page}}/>
      </Container>
    )
};

export default DEPPage;

const Container = styled.div`
    width: 100%;
    margin: 0;
    overflow: hidden;
`;