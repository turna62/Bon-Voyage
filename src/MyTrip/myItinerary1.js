import React from 'react';
import jsPDF from 'jspdf';
import './mytrip.css';

class MyItinerary1 extends React.Component {

    render() {
        return (
          
     <div class="icolumn">
     <div class="irow">
       <div class="icard">
         <h3>Day 1</h3>
         <p>Spot:</p>
         <p>Activities: </p>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Paragliding</span>
         </label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Hiking</span></label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Boating</span></label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Cycling</span></label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Horse Riding</span></label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Wildlife Safari</span></label>
         <p class="descripfix">Description: <input class="accinputt" type="text" id="fname" name="description" placeholder="Description.."/></p>
       </div>
     </div>
   
     <div class="irow">
       <div class="icard">
         <h3>Day 1</h3>
         <p>Spot:</p>
         <p>Activities: </p>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Paragliding</span>
         </label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Hiking</span></label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Boating</span></label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Cycling</span></label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Horse Riding</span></label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Wildlife Safari</span></label>
         <p class="descripfix">Description: <input class="accinputt" type="text" id="fname" name="description" placeholder="Description.."/></p>
       </div>
     </div>
   
     <div class="irow">
       <div class="icard">
         <h3>Day 1</h3>
         <p>Spot:</p>
         <p>Activities: </p>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Paragliding</span>
         </label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Hiking</span></label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Boating</span></label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Cycling</span></label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Horse Riding</span></label>
         <label class="aclabel">
               <input class="accinput" type="checkbox" name="checkbox4"/>
               <span class="activitiespan">Wildlife Safari</span></label>
         <p class="descripfix">Description: <input class="accinputt" type="text" id="fname" name="description" placeholder="Description.."/></p>
       </div>
     </div>
   
     
   </div>
   
   
        );
      }
    }
     
    export default MyItinerary1;
    