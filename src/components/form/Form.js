import React, { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import Spiner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import SuccessMessage from '../successMessage/SuccessMessage';

import './Form.scss';

const MyForm = () => {

    const {request,loading, error, status } = useHttp();

    const [counter, setCounter] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [vat, setVat] = useState('');
    const [netto, setNetto] = useState('');

    const [messCounter, setMessageCounter] = useState(false);
    const [messConfirm, setMessageConfirm] = useState(false)
    const [messVat, setMessageVat] = useState(false)
    const [messNetto, setMessageNetto] = useState(false)

    const calcBrutto = () => {
        if(vat && netto){
            const brutto = netto + netto / 100 * vat;
            return brutto.toFixed(2);
        }else{
            return '';
        }
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        let newForm = {
            description: counter,
            confirmation: confirmation,
            vat: vat,
            netto: netto,
            brutto: calcBrutto()
        };

        if(counter !== '' && confirmation !== '' && vat !== '' && netto !== '') {
            request('https://jsonplaceholder.typicode.com/posts', "POST", JSON.stringify(newForm))
        }else{
            counter === '' ? setMessageCounter(true) : setMessageCounter(false);
            confirmation === '' ? setMessageConfirm(true) : setMessageConfirm(false);
            vat === '' ? setMessageVat(true) : setMessageVat(false);
            netto === '' ? setMessageNetto(true) : setMessageNetto(false);
        }        
    }

    const onRenderForm = () => {
        return(
            <form onSubmit={onSubmitForm} required>
                <label className="modal__title">Description:</label>
                <textarea 
                    name="description"
                    type='text'
                    placeholder="Description"
                    maxLength={255} 
                    className="modal__form-description"
                    value={counter}
                    onChange= {(e) => setCounter(e.target.value)}>
                </textarea>

                <div className="modal__subtitle">{counter.length < 255 ? `You can enter ${255-counter.length} symbols` : "You can't enter more than 255 characters"} {messCounter === true ? <div style={{color: 'red', fontSize: '10px'}}>Text is required</div> : null}
                </div>

                <div className="modal__wrapper">
                    <div onChange={(e) => setConfirmation(e.target.value)}>
                        <div className="modal__title">Send confirmation:</div>            
                        <input type="radio" id="confirmyes"  name="confirmation" value="Yes"/>
                        <label htmlFor="confirmyes">Yes</label>
                        <input type="radio" id="confirmNo"  name="confirmation" value="No"/>
                        <label htmlFor="confirmNo">No</label>
                        <br/>{messConfirm === true ? <div style={{color: 'red', fontSize: '10px'}}>Text is required</div> : null}
                    </div>

                    <div>
                        <label className="modal__title">VAT</label>
                        <select placeholder="“Choose VAT" onChange={(e) => setVat(+e.target.value)}>
                            <option value=''>Choose VAT</option>
                            <option value='19'>19%</option>
                            <option value='21'>21%</option>
                            <option value='23'>23%</option>
                            <option value='25'>25%</option>
                        </select>
                        <br/>{messVat === true ? <label style={{color: 'red', fontSize: '10px'}}>Text is required</label> : null}
                    </div>
                    
                    <div >
                        <label className="modal__title">Price netto EUR</label>
                        <input 
                            name="netto" 
                            type="text" 
                            pattern="^[0-9]*[.,]?[0-9]+$"
                            disabled={vat === '' ? 'disabled' : null} 
                            onChange={(e) => setNetto(+e.target.value.replace(/,/g, '.'))}/>
                            <br/>{messNetto === true ? <label style={{color: 'red', fontSize: '10px'}}>Please, input number</label> : null}
                    </div>
                    
                    <div>
                        <label className="modal__title">Price brutto EUR</label>
                        <input 
                            name="brutto" 
                            type='text' 
                            value={calcBrutto()} 
                            readOnly></input>
                    </div>
                </div>
                <button className="modal__btn" type="submit">Submit</button>    
            </form>
        )
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const successMessage = status ? <SuccessMessage/> : null;
    const spinner = loading ? <Spiner/> : null;
    const renderForm = !error && !status ? onRenderForm() : null;

    return(
        <div className="modal">
            <div className="modal__form">
            {errorMessage}
            {successMessage}
            {spinner}
            {renderForm}
            </div>
        </div>        
    )
}

export default MyForm;