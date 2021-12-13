import error from './error.gif';

const ErrorMessage = () => {
    return (
        <>
            <img style={{display: 'block',
                        position: 'absolute', 
                        width: '340px', 
                        height: '340px', 
                        objectFit: 'contain', 
                        margin: "0 auto", 
                        paddingLeft: '38px'}}src={error} alt="error" />
            <div style={{position: 'absolute', 
                        fontSize: '22px', 
                        paddingLeft: '100px' }}>
                Please try again later.
            </div>
        </>
    )
}

export default ErrorMessage;