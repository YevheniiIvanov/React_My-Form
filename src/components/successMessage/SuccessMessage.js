import Checked from './checked.png';

const SuccessMessage = () => {
    return (
        <>
            <div style={{position: 'absolute',
                         fontSize: '22px', 
                         paddingLeft: '20px', 
                         background: '#fff' }}>
                Your form has been successfully sent
            </div>
            <img src={Checked} 
                alt='Checked' 
                style={{display: 'block', 
                        width: '170px', 
                        height: '170px', 
                        position: 'absolute', 
                        left: '50%', 
                        transform: 'translateX(-50%)', 
                        marginTop: '58px'}}/>
        </>
    )
}

export default SuccessMessage;