import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange , onSubmit}) => {
    return(
     <div>
         <p className ='.athelas texd f3'>
             {'This magic brain will detect faces in your pictures. Give it a try'}
         </p>
         <div className = 'center'>
             <div className = 'form center pa4 br3 shadow-5'> {/*creating small box shap for button and input*/}
              <input className = 'f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
              <button id = 'detect' className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
             </div>
         </div>
     </div>

    );
}

export default ImageLinkForm;