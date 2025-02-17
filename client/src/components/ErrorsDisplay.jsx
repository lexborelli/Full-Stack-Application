

const ErrorsDisplay = ({ errors }) => {
    
    //created errorsDisplay variable that will store the jsx to render on the page; set the variable to null 
    let errorsDisplay = null; 
    
    //created an if statement that checks if the errors array contains any errors 
    // if so i'll set errorsDisplay equal to the JSX
    if (errors.length) {
        errorsDisplay = (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
        );
    }

    return errorsDisplay; 
};

export default ErrorsDisplay; 