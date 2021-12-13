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

        request('https://jsonplaceholder.typicode.com/posts', "POST", JSON.stringify(newForm))
    }

    const onRenderForm = () => {
        return(
            <form onSubmit={onSubmitForm}>
                <div className="modal__title">Description:</div>
                <textarea required 
                    type='text'
                    placeholder="Description"
                    maxLength={255} 
                    className="modal__form-description"
                    value={counter}
                    onChange= {(e) => setCounter(e.target.value)}></textarea>
                <div className="modal__subtitle">{counter.length < 255 ? `You can enter ${255-counter.length} symbols` : "You can't enter more than 255 characters"}</div>

                <div className="modal__wrapper">
                    <div onChange={(e) => setConfirmation(e.target.value)}>
                        <div className="modal__title">Send confirmation:</div>            
                        <input type="radio" required name="confirmation" value='Yes' />
                        <label>Yes</label>
                        <input type="radio" required name="confirmation" value="No"/>
                        <label>No</label>
                    </div>

                    <div >
                        <div className="modal__title">VAT</div>
                        <select required placeholder="“Choose VAT" onChange={(e) => setVat(+e.target.value)}>
                            <option value=''>Choose VAT</option>
                            <option value='19'>19%</option>
                            <option value='21'>21%</option>
                            <option value='23'>23%</option>
                            <option value='25'>25%</option>
                        </select>
                    </div>
                    
                    <div >
                        <div className="modal__title">Price netto EUR</div>
                        <input type="number" step="any" min='0' required disabled={vat === '' ? 'disabled' : null} onChange={(e) => setNetto(+e.target.value)}/>
                    </div>

                    <div>
                        <div className="modal__title">Price brutto EUR</div>
                        <input type='text' value={calcBrutto()} readOnly disabled></input>
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